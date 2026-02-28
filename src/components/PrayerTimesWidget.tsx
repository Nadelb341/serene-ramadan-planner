import { useState, useEffect, useMemo } from "react";
import { MapPin, ChevronDown, Navigation } from "lucide-react";

interface PrayerTime {
  name: string;
  nameFr: string;
  nameAr: string;
  time: string;
}

const CITIES = [
  { name: "Paris", country: "France" },
  { name: "Lyon", country: "France" },
  { name: "Marseille", country: "France" },
  { name: "Montpellier", country: "France" },
  { name: "Toulouse", country: "France" },
  { name: "Lille", country: "France" },
  { name: "Strasbourg", country: "France" },
  { name: "Bordeaux", country: "France" },
  { name: "Nice", country: "France" },
  { name: "Nantes", country: "France" },
  { name: "Rennes", country: "France" },
  { name: "Grenoble", country: "France" },
  { name: "Casablanca", country: "Morocco" },
  { name: "Alger", country: "Algeria" },
  { name: "Tunis", country: "Tunisia" },
  { name: "Bruxelles", country: "Belgium" },
  { name: "Genève", country: "Switzerland" },
  { name: "Londres", country: "United Kingdom" },
];

const PrayerTimesWidget = () => {
  const [city, setCity] = useState(() => localStorage.getItem("prayer_city") || "Montpellier");
  const [country, setCountry] = useState(() => localStorage.getItem("prayer_country") || "France");
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [sunrise, setSunrise] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [now, setNow] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("prayer_city", city);
    localStorage.setItem("prayer_country", country);
  }, [city, country]);

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=12`
    )
      .then((r) => r.json())
      .then((data) => {
        const t = data.data.timings;
        setPrayers([
          { name: "Fajr", nameFr: "Sobh", nameAr: "الفجر", time: t.Fajr },
          { name: "Dhuhr", nameFr: "Dohr", nameAr: "الظهر", time: t.Dhuhr },
          { name: "Asr", nameFr: "Asr", nameAr: "العصر", time: t.Asr },
          { name: "Maghrib", nameFr: "Maghreb", nameAr: "المغرب", time: t.Maghrib },
          { name: "Isha", nameFr: "Icha", nameAr: "العشاء", time: t.Isha },
        ]);
        setSunrise(t.Sunrise);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [city, country]);

  // Parse time string "HH:MM" to minutes since midnight
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Determine next prayer
  const nextPrayer = useMemo(() => {
    if (!prayers.length) return null;
    for (const p of prayers) {
      if (toMinutes(p.time) > currentMinutes) return p;
    }
    return prayers[0]; // wrap to Fajr next day
  }, [prayers, currentMinutes]);

  // Is it night? (after Isha or before Fajr)
  const isNight = useMemo(() => {
    if (!prayers.length) return false;
    const fajr = toMinutes(prayers[0].time);
    const isha = toMinutes(prayers[4].time);
    return currentMinutes >= isha || currentMinutes < fajr;
  }, [prayers, currentMinutes]);

  // Sun arc progress (from Fajr to Isha)
  const sunProgress = useMemo(() => {
    if (!prayers.length) return 0;
    const fajr = toMinutes(prayers[0].time);
    const isha = toMinutes(prayers[4].time);
    const total = isha - fajr;
    if (total <= 0) return 0;
    const elapsed = currentMinutes - fajr;
    return Math.max(0, Math.min(1, elapsed / total));
  }, [prayers, currentMinutes]);

  // Compute prayer positions on the arc (0-1)
  const prayerPositions = useMemo(() => {
    if (!prayers.length) return [];
    const fajr = toMinutes(prayers[0].time);
    const isha = toMinutes(prayers[4].time);
    const total = isha - fajr;
    if (total <= 0) return [];

    const all = [
      { time: prayers[0].time, done: false },
      { time: sunrise, done: false },
      { time: prayers[1].time, done: false },
      { time: prayers[2].time, done: false },
      { time: prayers[3].time, done: false },
      { time: prayers[4].time, done: false },
    ];

    return all.map((p) => {
      const pos = (toMinutes(p.time) - fajr) / total;
      return {
        pos: Math.max(0, Math.min(1, pos)),
        done: toMinutes(p.time) <= currentMinutes,
      };
    });
  }, [prayers, sunrise, currentMinutes]);

  // Stars for night mode
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 37 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 60}%`,
      size: (i % 3) + 1,
      delay: `${(i * 0.3) % 2}s`,
    }));
  }, []);

  const formatTime = (t: string) => t.replace(/^0/, "");

  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border animate-pulse">
        <div className="h-4 bg-secondary rounded w-1/3 mb-4" />
        <div className="h-24 bg-secondary rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-border">
      {/* Next prayer banner */}
      {nextPrayer && (
        <div className="bg-accent text-accent-foreground px-5 py-3 flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80">Prochaine prière</p>
            <p className="font-display text-lg font-bold">{nextPrayer.nameFr}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold">{formatTime(nextPrayer.time)}</p>
            <p className="text-xs font-display opacity-80">{nextPrayer.nameAr}</p>
          </div>
        </div>
      )}

      {/* City selector */}
      <div className="bg-card px-5 py-3 flex items-center gap-3">
        <div className="relative flex-1">
          <button
            onClick={() => setShowCityPicker(!showCityPicker)}
            className="flex items-center gap-2 w-full px-3 py-2 bg-background rounded-lg border border-border text-sm"
          >
            <MapPin size={16} className="text-muted-foreground" />
            <span className="flex-1 text-left">{city}</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </button>

          {showCityPicker && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
              {CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCity(c.name);
                    setCountry(c.country);
                    setShowCityPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors ${
                    city === c.name ? "bg-secondary font-medium" : ""
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sun arc + prayer list */}
      <div
        className={`relative transition-colors duration-700 ${
          isNight
            ? "bg-[hsl(220,30%,12%)] text-[hsl(30,30%,95%)]"
            : "bg-card text-card-foreground"
        }`}
      >
        {/* Stars (night only) */}
        {isNight &&
          stars.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                opacity: 0.6,
                animationDelay: s.delay,
              }}
            />
          ))}

        {/* City header */}
        <div className="text-center pt-4 pb-2 relative z-10">
          <p className="font-display font-bold text-sm">{city}, {country === "France" ? "FR" : country.slice(0, 2).toUpperCase()}</p>
          <p className="text-xs opacity-60">UOIF (France) (12.0° / 12.0°)</p>
        </div>

        {/* Current time */}
        <div className="text-right px-5 relative z-10">
          <span className="text-sm opacity-70">
            {now.getHours().toString().padStart(2, "0")}:{now.getMinutes().toString().padStart(2, "0")}
          </span>
        </div>

        {/* Sun arc SVG */}
        <div className="relative px-5 py-4 z-10">
          <svg viewBox="0 0 300 100" className="w-full h-auto">
            {/* Arc path */}
            <path
              d="M 20 85 Q 150 -20 280 85"
              fill="none"
              stroke={isNight ? "hsl(30,15%,30%)" : "hsl(30,15%,75%)"}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Filled arc up to sun position */}
            {!isNight && (
              <path
                d="M 20 85 Q 150 -20 280 85"
                fill="none"
                stroke="hsl(38,60%,55%)"
                strokeWidth="2.5"
                strokeDasharray={`${sunProgress * 320} 320`}
              />
            )}

            {/* Prayer position dots */}
            {prayerPositions.map((p, i) => {
              const t = p.pos;
              // Quadratic bezier: B(t) = (1-t)^2*P0 + 2*(1-t)*t*P1 + t^2*P2
              const x = (1 - t) ** 2 * 20 + 2 * (1 - t) * t * 150 + t ** 2 * 280;
              const y = (1 - t) ** 2 * 85 + 2 * (1 - t) * t * -20 + t ** 2 * 85;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={4}
                  fill={p.done ? "hsl(142,60%,45%)" : isNight ? "hsl(30,10%,40%)" : "hsl(30,15%,80%)"}
                  stroke={p.done ? "hsl(142,60%,45%)" : "none"}
                  strokeWidth="1"
                />
              );
            })}

            {/* Sun icon */}
            {!isNight && (
              <g
                transform={`translate(${
                  (1 - sunProgress) ** 2 * 20 +
                  2 * (1 - sunProgress) * sunProgress * 150 +
                  sunProgress ** 2 * 280
                }, ${
                  (1 - sunProgress) ** 2 * 85 +
                  2 * (1 - sunProgress) * sunProgress * -20 +
                  sunProgress ** 2 * 85
                })`}
              >
                <circle r="8" fill="hsl(45,90%,55%)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1={Math.cos((angle * Math.PI) / 180) * 10}
                    y1={Math.sin((angle * Math.PI) / 180) * 10}
                    x2={Math.cos((angle * Math.PI) / 180) * 14}
                    y2={Math.sin((angle * Math.PI) / 180) * 14}
                    stroke="hsl(45,90%,55%)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            )}

            {/* Moon icon for night */}
            {isNight && (
              <circle
                cx={150}
                cy={30}
                r="10"
                fill="hsl(45,50%,80%)"
                opacity="0.8"
              />
            )}

            {/* Horizon line */}
            <line
              x1="10"
              y1="85"
              x2="290"
              y2="85"
              stroke={isNight ? "hsl(30,10%,25%)" : "hsl(30,15%,80%)"}
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Prayer times list */}
        <div className="relative z-10">
          {/* Sobh */}
          <div className={`flex items-center justify-between px-5 py-3 border-t ${
            isNight ? "border-[hsl(220,20%,20%)]" : "border-border"
          }`}>
            <span className="text-sm font-medium">Sobh</span>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold">{formatTime(prayers[0]?.time || "")}</span>
              <span className="text-xs opacity-40">☆</span>
            </div>
          </div>

          {/* Lever */}
          <div className={`flex items-center justify-between px-5 py-3 ${
            isNight ? "bg-[hsl(142,40%,15%)]" : "bg-accent/10"
          } border-t ${isNight ? "border-[hsl(220,20%,20%)]" : "border-border"}`}>
            <span className="text-sm font-bold text-gold">Lever</span>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-gold">{formatTime(sunrise)}</span>
              <span className="w-2 h-2 rounded-full bg-gold" />
            </div>
          </div>

          {/* Dohr, Asr, Maghreb, Icha */}
          {prayers.slice(1).map((p) => (
            <div
              key={p.name}
              className={`flex items-center justify-between px-5 py-3 border-t ${
                isNight ? "border-[hsl(220,20%,20%)]" : "border-border"
              } ${
                nextPrayer?.name === p.name
                  ? isNight
                    ? "bg-[hsl(220,25%,16%)]"
                    : "bg-accent/5"
                  : ""
              }`}
            >
              <span className="text-sm font-medium">{p.nameFr}</span>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold">{formatTime(p.time)}</span>
                <span className="text-xs opacity-40">☆</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidget;
