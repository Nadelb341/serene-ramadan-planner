export interface DayContent {
  day: number;
  coran: {
    method1: string;
    method2: string;
  };
  namesOfAllah: string[];
  challenge: string;
  hadith: {
    text: string;
    source: string;
  };
}

export const RAMADAN_DAYS: DayContent[] = [
  {
    day: 1,
    coran: {
      method1: "Sourate Al Fatiha (1) à sourate Al Baqara (2) verset 141",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [],
    challenge: "Se concentrer, se questionner davantage sur sa relation avec Allah 'Azawajjel",
    hadith: {
      text: "« Et je n'ai créé les djins et les humains que pour qu'ils se soumettent à Moi »",
      source: "Sourate 51 Ad-Dariyat (à faire au quotidien, pendant et hors Ramadan)",
    },
  },
  {
    day: 2,
    coran: {
      method1: "Sourate Al Baqara (2) verset 142 à verset 252",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: ["Al-Qouddouss (Le Pur)"],
    challenge: "Éviter la perte de temps (ex : télé, réseaux-sociaux...)",
    hadith: {
      text: "« Le jeûne n'est pas de s'abstenir de manger et de boire, certes le jeûne est de s'abstenir des futilités et des obscénités... »",
      source: "Muslim, Al Boukhari",
    },
  },
  {
    day: 3,
    coran: {
      method1: "Sourate Al Baqara (2) verset 253 à sourate Al Imran (3) verset 92",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Mouhaîmin (Le Prédominant)",
      "Al-'Aziz (Le Tout Puissant)",
      "Al-Djabbar (Le contraignant, celui qui réduit les brisures de l'âme)",
    ],
    challenge: "Donner en aumône, même si c'est peu",
    hadith: {
      text: "« Donnez ne serait-ce qu'une datte en aumône, car elle soulage l'affamé et efface les fautes comme l'eau éteindrait le Feu. »",
      source: "Ibn Moubârak, authentifié par sheikh Albani",
    },
  },
  {
    day: 4,
    coran: {
      method1: "Sourate Al Imran (3) verset 93 à sourate An Nissa (4) verset 23",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Moutakabbir (Le Parfait imposant, L'ultime de grandeur)",
      "Al-Khaliq (Le Parfait Créateur)",
      "Al-Bâri (Celui qui donne un commencement à toute chose)",
    ],
    challenge: "Se réconcilier avec un frère ou une sœur",
    hadith: {
      text: "« Il n'est pas permis au musulman de s'écarter de son frère au-delà de trois nuits. Ils se rencontrent et celui-là s'écarte, et l'autre s'écarte. Et le meilleur des deux est celui qui passe le salam en premier. »",
      source: "Authentifié par sheikh Albani",
    },
  },
  {
    day: 5,
    coran: {
      method1: "Sourate An Nissa (4) verset 24 à verset 147",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Moussawir (Le Parfait Formateur)",
      "Al-Ghaffar (Le Tout Pardonneur)",
      "Al-Qahhâr (Le Suprême Dominateur)",
    ],
    challenge: "Regarder une vidéo sur un sujet religieux de notre choix et en tirer le message",
    hadith: {
      text: "« Apprendre la science est une obligation pour chaque musulman. »",
      source: "Rapporté par Ibn Maja, authentifié par sheikh Albani",
    },
  },
  {
    day: 6,
    coran: {
      method1: "Sourate An Nissa (4) verset 148 à sourate Al Ma'ida (5) verset 81",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Wahab (Le Grand donateur)",
      "Ar-Razzaq (Celui qui subvient aux besoins)",
      "Al-Fattâh (Celui qui ouvre les portes de ses faveurs)",
    ],
    challenge: "Faire un acte de bien envers un frère ou une sœur",
    hadith: {
      text: "« Chaque acte de bien est une aumône et certes fait partie des actes de bien que tu rencontres ton frère avec un visage avenant et que tu remplisses le récipient de ton frère de ton seau. »",
      source: "At Tirmidhi",
    },
  },
  {
    day: 7,
    coran: {
      method1: "Sourate Al Ma'ida (5) verset 82 à sourate An'am (6) verset 110",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-'Alim (L'omniscient qui sait tout absolument tout)",
      "Al-Qabid (Celui qui retient)",
      "Al-Bassit (Celui qui donne largement)",
    ],
    challenge: "Faire le istighfar (demander pardon plusieurs fois dans la journée)",
    hadith: {
      text: "« Certes Allah accepte le repentir du serviteur tant que son âme n'a pas atteint sa gorge. »",
      source: "At Tirmidhi",
    },
  },
  {
    day: 8,
    coran: {
      method1: "Sourate An'am (6) verset 111 à sourate Al Araf (7) verset 87",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Khafidh (Celui qui abaisse)",
      "Ar-Rafi' (Celui qui élève)",
      "Al-Mou'izz (Celui qui donne puissance et considération)",
    ],
    challenge: "Apprendre quelque chose de nouveau sur la religion",
    hadith: {
      text: "« Le mérite de la science est meilleur que le mérite de l'adoration et votre meilleure religion est le wara* » (*Délaisser parfois quelque chose de halal par peur de tomber dans le haram)",
      source: "Authentifié par sheikh Albani",
    },
  },
  {
    day: 9,
    coran: {
      method1: "Sourate Al Araf (7) verset 88 à sourate Al Anfal (8) verset 40",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Moudhil (Celui qui avilit)",
      "As-Sami' (Celui qui entend tout)",
      "Al-Bâssir (Le Voyant)",
    ],
    challenge: "Manger avec modération",
    hadith: {
      text: "« L'homme ne remplit pas d'excipient plus mauvais qu'un ventre. Le fils d'Adam devrait se contenter de quelques bouchées suffisantes pour le maintenir debout, sinon qu'il réserve un tiers pour sa nourriture, un tiers pour sa boisson et un tiers pour sa respiration. »",
      source: "At Tirmidhi",
    },
  },
  {
    day: 10,
    coran: {
      method1: "Sourate Al Anfal (8) verset 41 à sourate At Tawbah (9) verset 92",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: ["Al-Hakam (Le Juge)"],
    challenge: "Choisir un hadith, le décortiquer afin de comprendre son sens et le mettre en pratique",
    hadith: {
      text: "« Jamais un homme ne prolonge sa méditation sans s'instruire, et jamais un homme ne s'instruit sans jamais traduire son savoir en actes. »",
      source: "Wahb Ibn Munabbih",
    },
  },
  {
    day: 11,
    coran: {
      method1: "Sourate At Tawbah (9) verset 93 à sourate Hud (11) verset 5",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Hâlim (Le Très Clément)",
      "Al-'Azim (Le Magnifique)",
      "Al-Ghafoûr (Le Tout-Pardonnant)",
      "Ash-Shakour (Le Très Reconnaissant)",
    ],
    challenge: "Multiplier le dhikr au cours de la journée",
    hadith: {
      text: "« Pour se sauver du châtiment d'Allah, le fils d'Adam n'accomplit pas une œuvre plus salutaire que le Dhikr d'Allah. »",
      source: "Muslim",
    },
  },
  {
    day: 12,
    coran: {
      method1: "Sourate Hud (11) verset 6 à sourate Yusuf (12) verset 52",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-'Aaliy (L'Élevé)",
      "Al-Kabir (Le Sublime)",
    ],
    challenge: "Renouer avec la biographie et la sunnah de notre bien aimé Prophète ﷺ",
    hadith: {
      text: "« Accrochez-vous à ma sunnah et à celle des successeurs bien guidés après moi. Cramponnez-vous et mordez-y à pleine dent. »",
      source: "Rapporté par Abu Dawud, At Tirmidhi",
    },
  },
  {
    day: 13,
    coran: {
      method1: "Sourate Yusuf (12) verset 53 à sourate Ibrahim (14) verset 52",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Hassib (Celui qui compte tout)",
      "Al-Djâlil (Le Majestueux)",
      "Al-Karim (Le Tout Généreux)",
      "Ar-Raqqib (Le Vigilant)",
    ],
    challenge: "Rendre visite à une personne malade ou un frère/sœur en Islam",
    hadith: {
      text: "« Celui qui rend visite à une personne malade ou visite un frère dans l'Islam, un invocateur du ciel lui dit : Puisses-tu être heureux, que tes pas soient bénis, et puisses-tu occuper une position digne au Paradis. »",
      source: "Authentifié par sheikh Albani",
    },
  },
  {
    day: 14,
    coran: {
      method1: "Sourate Al Hijr (15) verset 1 à sourate An Nahl (16) verset 128",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Moujib (Celui qui répond)",
      "Al-Wassi' (Le Vaste)",
      "Al-Hakim (L'Infiniment Sage)",
      "Al-Wadûd (Le Bien aimant)",
    ],
    challenge: "Passer le salam un maximum et accueillir avec un visage souriant",
    hadith: {
      text: "« Ne méprise aucune bonne action si petite soit-elle, comme le fait de passer le salam ou d'accueillir ton frère avec un visage souriant. »",
      source: "Muslim",
    },
  },
  {
    day: 15,
    coran: {
      method1: "Sourate Al Isra (17) verset 1 à sourate Al Kahf (18) verset 74",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [],
    challenge: "Nourrir un jeûneur pour la rupture du jeûne",
    hadith: {
      text: "« Celui qui nourrit un jeûneur pour la rupture du jeûne aura la même récompense que lui sans que cela n'enlève rien à la récompense du jeûneur. »",
      source: "At Tirmidhi",
    },
  },
  {
    day: 16,
    coran: {
      method1: "Sourate Al Kahf (18) verset 75 à sourate Ta-ha (20) verset 135",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Wakil (Le Gérant)",
      "Al-Qawiyy (Le Très Fort)",
      "Al-Matîn (Le Très Ferme)",
      "Al-Waliyy (Le Très Proche)",
    ],
    challenge: "Consolider ses liens familiaux",
    hadith: {
      text: "« Quiconque veut avoir beaucoup de richesse et une longue vie doit consolider ses liens familiaux. »",
      source: "Al Bukhari 5986",
    },
  },
  {
    day: 17,
    coran: {
      method1: "Sourate Al Anbiya (21) verset 1 à sourate Al Hajj (22) verset 78",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Hâmid (Le Très Louangé)",
      "Al-Moushy (Celui dont le savoir cerne toute chose)",
      "Al-Moubdi' (Celui qui produit sans modèle)",
      "Al-Mou'id (Celui qui redonne existence)",
    ],
    challenge: "Suivre les traces des compagnons du Prophète ﷺ",
    hadith: {
      text: "« Eux sont les compagnons du Prophète ﷺ, ils étaient la meilleure partie de cette Umma : ceux qui avaient les cœurs les plus vertueux, ceux qui étaient les plus profonds en connaissance... Reconnaissez donc leur valeur et suivez leurs traces. »",
      source: "Abdullah Ibn Mas-ud",
    },
  },
  {
    day: 18,
    coran: {
      method1: "Sourate Al Mouminoun (23) verset 1 à sourate Al Fourqan (25) verset 20",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Mouhyi (Celui qui fait vivre)",
      "Al-Moumit (Celui qui fait mourir)",
      "Al-Hayy (Le Vivant par excellence)",
      "Al-Qayoum (L'Immuable)",
    ],
    challenge: "Donner de l'eau à boire en aumône",
    hadith: {
      text: "« La meilleure aumône est de donner de l'eau à boire. »",
      source: "Authentifié par sheikh Albani",
    },
  },
  {
    day: 19,
    coran: {
      method1: "Sourate Al Fourqan (25) verset 21 à sourate An Naml (27) verset 55",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: ["Al-Wadjid (L'Opulent)"],
    challenge: "Enseigner une science à quelqu'un",
    hadith: {
      text: "« Celui qui enseigne une science a la récompense de celui qui a œuvré avec, sans que cela ne réduise en rien la récompense de celui qui a œuvré. »",
      source: "Rapporté par Ibn Maja, authentifié par sheikh Albani",
    },
  },
  {
    day: 20,
    coran: {
      method1: "Sourate An Naml (27) verset 56 à sourate Al Ankabut (29) verset 45",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Qadir (Le Déterminant)",
      "Al-Mouqtadir (Celui qui a pouvoir sur tout)",
      "Al-Mouqqadim (Celui qui met en avant)",
      "Al-Mouakhir (Celui qui met en arrière)",
    ],
    challenge: "Multiplier les invocations et les prières surérogatoires (10 derniers jours !)",
    hadith: {
      text: "« C'est Toi seul que nous adorons et c'est à Toi seul dont nous implorons secours. »",
      source: "Sourate 1, verset 5",
    },
  },
  {
    day: 21,
    coran: {
      method1: "Sourate Al Ankabut (29) verset 46 à sourate Al Ahzab (33) verset 30",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: ["Al-Awwal (Le Premier)"],
    challenge: "Méditer sur les versets du Coran",
    hadith: {
      text: "« C'est un livre béni que nous avons fait descendre vers toi afin qu'ils méditent sur ses versets et que les doués d'intelligence se rappellent. »",
      source: "Sourate 38, verset 29",
    },
  },
  {
    day: 22,
    coran: {
      method1: "Sourate Al Ahzab (33) verset 31 à sourate Yassin (36) verset 27",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: ["Al-Batin (Le Caché)"],
    challenge: "Faire une aumône cachée",
    hadith: {
      text: "« L'aumône cachée éteint la colère du Seigneur. »",
      source: "Authentifié par sheikh Albani",
    },
  },
  {
    day: 23,
    coran: {
      method1: "Sourate Yassin (36) verset 28 à sourate Az Zoummar (39) verset 31",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Barr (Le Bienveillant)",
      "At-Tawwab (Celui qui ne cesse d'accueillir le repentir)",
      "Al-Muntaqim (Le Vengeur)",
    ],
    challenge: "Invoquer Allah dans le dernier tiers de la nuit",
    hadith: {
      text: "« À partir du dernier tiers de la nuit, notre Seigneur descend au ciel le plus proche de la terre et dit : J'exauce les invocations de celui qui M'invoque, Je donne à celui qui Me demande et pardonne à celui qui Me demande le pardon. »",
      source: "Al Bukhari 1145",
    },
  },
  {
    day: 24,
    coran: {
      method1: "Sourate Az Zoummar (39) verset 32 à sourate Foussilat (41) verset 46",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-'Affuw (Celui qui efface)",
      "Ar-Raouf (Le Très Bienveillant)",
      "Malik-ul-Mulk (Le Possesseur du Royaume)",
    ],
    challenge: "Lutter pour la cause d'Allah avec bienfaisance",
    hadith: {
      text: "« Et quant à ceux qui luttent pour Notre cause, Nous les guiderons certes sur Nos sentiers. Dieu est en vérité avec les bienfaisants. »",
      source: "Sourate 29, verset 69",
    },
  },
  {
    day: 25,
    coran: {
      method1: "Sourate Foussilat (41) verset 47 à sourate Al Jathiya (45) verset 37",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Dhul-jalali-Wal-Ikram (Détenteur de la Majesté et de la Générosité)",
      "Al-Muqsit (Celui qui rend Justice)",
      "Al-Djami' (Celui qui réunit)",
    ],
    challenge: "Prier sur le Prophète ﷺ abondamment",
    hadith: {
      text: "Les récompenses de cette prière : Allah l'élève de 10 degrés, il lui sera inscrit 10 récompenses, et ses invocations seront plus favorablement reçues.",
      source: "Hadith sur les mérites de la prière sur le Prophète ﷺ",
    },
  },
  {
    day: 26,
    coran: {
      method1: "Sourate Al Ahqaf (46) à sourate Qaf (50)",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Ghaniyy (Le Suffisant par soi)",
      "Al-Moughni (Celui qui confère la suffisance)",
      "Al-Mani' (Le Défenseur)",
    ],
    challenge: "Délaisser une mauvaise habitude et se promettre de ne plus la refaire",
    hadith: {
      text: "« L'homme ne prononce pas une parole sans avoir auprès de lui un observateur prêt à l'inscrire. »",
      source: "Sourate Qaf, verset 18",
    },
  },
  {
    day: 27,
    coran: {
      method1: "Sourate Ad Dhariyat (51) à sourate Al Hadid (57)",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Ad-Dar (Celui qui contrarie)",
      "An-Nafi' (L'Utile)",
      "An-Nur (La Lumière)",
    ],
    challenge: "Invoquer Allah pour réformer sa religion et sa condition",
    hadith: {
      text: "« Ô mon Allah… aide-moi à réformer ma religion qui est source de protection pour moi dans toute affaire ! Aide-moi aussi à réformer ma condition matérielle, puisque c'est dans ce monde que je vis ! Réforme pour moi ma situation dans l'au-delà... »",
      source: "Muslim",
    },
  },
  {
    day: 28,
    coran: {
      method1: "Sourate Al Mujadilah (58) à sourate At Tahrim (66)",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [],
    challenge: "Ne pas oublier de faire Zakat al Fitr (obligatoire). Elle doit être impérativement faite avant salat Al'Aid.",
    hadith: {
      text: "Le Prophète ﷺ a imposé l'aumône de la rupture du jeûne : un sa' de dattes, ou un sa' d'orge pour le serviteur et l'homme libre, pour les hommes et les femmes, pour les vieux et les jeunes parmi les musulmans. Et il a ordonné qu'elle soit donnée avant la sortie des gens pour la prière.",
      source: "Al Bukhari 1503",
    },
  },
  {
    day: 29,
    coran: {
      method1: "Sourate Al Mulk (67) à sourate Al Mursalat (77)",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [
      "Al-Warith (L'Héritier)",
      "Ar-Rashid (Celui qui agit avec droiture)",
      "As-Sabbur (Le Patient)",
    ],
    challenge: "Se ressourcer en cette fin et se préparer pour Aid Al Fitr",
    hadith: {
      text: "Le Prophète ﷺ ne sortait pas le jour du Fitr avant d'avoir mangé des dattes.",
      source: "Al Bukhari",
    },
  },
  {
    day: 30,
    coran: {
      method1: "Sourate An Naba (78) à sourate An Nass (114)",
      method2: "Je lis 4 pages de coran après chacune de mes 5 prières",
    },
    namesOfAllah: [],
    challenge: "Se rendre tôt à salat Al'Aid. Profite de cette fête pour retrouver ta famille et tes proches. Aid Mubarak ! 🎉",
    hadith: {
      text: "Profite de cette fête pour retrouver ta famille et tes proches. Aid Mubarak !",
      source: "",
    },
  },
];

export const EID_PRAYER_INFO = `La prière de l'Aid est une prière collective fortement recommandée par le Prophète ﷺ pour les hommes et les femmes.

• Faire les grandes ablutions ce jour-là
• Se vêtir de ses meilleurs habits dans la pudeur
• Manger avant de se rendre à la mosquée (pour symboliser la fin du jeûne)
• Y aller à pieds et prendre un chemin différent au retour
• Glorifier Allah avant la prière : « Allâhu Akbar, Allâhu Akbar, Allâhu Akbar wa li-Llâhi-l-hamd »
• Avoir donné la Zakat al Fitr
• La prière : 2 unités sans adhan ni iqama. 7 takbîr au début, puis sourate Al-Fatiha + sourate Al-A'la. 6 takbîr à la 2ème rak'a.
• Rester assis pour la khoutouba (sermon) après la prière
• « Taqabalou llahou minâ mink » (Qu'Allah accepte de nous et de toi)`;

export const END_RAMADAN_DUA = `Ô Allah, ne clos pas ce mois de Ramadan sans que tu n'aies préservé notre chasteté, effacé nos péchés, accepté notre repentir, trouvé une solution à nos problèmes, exaucé nos invocations, arrangé notre situation, pardonné à nos morts, accordé guérison à nos malades, et préservé nos familles, nos époux/épouses, nos enfants, nos amis, et les musulmans ajma3in.

Ô Allah préserve nous du châtiment de la tombe et de l'enfer, fais de nous les habitants du Paradis.

Ô Allah ! Fais que le Coran soit le printemps de nos cœurs, le remède de nos poitrines, la lumière de notre vue, qu'il dissipe notre tristesse, nos soucis et nos chagrins et qu'il nous conduise vers les jardins des délices.

Ameen 🤲`;
