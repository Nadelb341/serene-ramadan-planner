export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_type: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_entries: {
        Row: {
          asr_fard: boolean | null
          asr_nafl: boolean | null
          asr_sunnah: boolean | null
          charity: boolean | null
          created_at: string
          cycle_phase: string | null
          daily_challenge: boolean | null
          day_number: number
          dhikr: boolean | null
          dhuhr_fard: boolean | null
          dhuhr_nafl: boolean | null
          dhuhr_sunnah: boolean | null
          energy_level: number | null
          evening_adhkar: boolean | null
          faith_level: number | null
          fajr_fard: boolean | null
          fajr_nafl: boolean | null
          fajr_sunnah: boolean | null
          gratitude_notes: string | null
          id: string
          iftar_notes: string | null
          improvement_tomorrow: string | null
          is_fasting: boolean | null
          isha_fard: boolean | null
          isha_nafl: boolean | null
          isha_sunnah: boolean | null
          istighfar: boolean | null
          maghrib_fard: boolean | null
          maghrib_nafl: boolean | null
          maghrib_sunnah: boolean | null
          morning_adhkar: boolean | null
          on_time_prayer: boolean | null
          quran_reading: boolean | null
          sahur_notes: string | null
          sport_notes: string | null
          tahajjud: boolean | null
          tarawih: boolean | null
          three_good_things: string | null
          todo_items: Json | null
          tomorrow_plans: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          asr_fard?: boolean | null
          asr_nafl?: boolean | null
          asr_sunnah?: boolean | null
          charity?: boolean | null
          created_at?: string
          cycle_phase?: string | null
          daily_challenge?: boolean | null
          day_number: number
          dhikr?: boolean | null
          dhuhr_fard?: boolean | null
          dhuhr_nafl?: boolean | null
          dhuhr_sunnah?: boolean | null
          energy_level?: number | null
          evening_adhkar?: boolean | null
          faith_level?: number | null
          fajr_fard?: boolean | null
          fajr_nafl?: boolean | null
          fajr_sunnah?: boolean | null
          gratitude_notes?: string | null
          id?: string
          iftar_notes?: string | null
          improvement_tomorrow?: string | null
          is_fasting?: boolean | null
          isha_fard?: boolean | null
          isha_nafl?: boolean | null
          isha_sunnah?: boolean | null
          istighfar?: boolean | null
          maghrib_fard?: boolean | null
          maghrib_nafl?: boolean | null
          maghrib_sunnah?: boolean | null
          morning_adhkar?: boolean | null
          on_time_prayer?: boolean | null
          quran_reading?: boolean | null
          sahur_notes?: string | null
          sport_notes?: string | null
          tahajjud?: boolean | null
          tarawih?: boolean | null
          three_good_things?: string | null
          todo_items?: Json | null
          tomorrow_plans?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          asr_fard?: boolean | null
          asr_nafl?: boolean | null
          asr_sunnah?: boolean | null
          charity?: boolean | null
          created_at?: string
          cycle_phase?: string | null
          daily_challenge?: boolean | null
          day_number?: number
          dhikr?: boolean | null
          dhuhr_fard?: boolean | null
          dhuhr_nafl?: boolean | null
          dhuhr_sunnah?: boolean | null
          energy_level?: number | null
          evening_adhkar?: boolean | null
          faith_level?: number | null
          fajr_fard?: boolean | null
          fajr_nafl?: boolean | null
          fajr_sunnah?: boolean | null
          gratitude_notes?: string | null
          id?: string
          iftar_notes?: string | null
          improvement_tomorrow?: string | null
          is_fasting?: boolean | null
          isha_fard?: boolean | null
          isha_nafl?: boolean | null
          isha_sunnah?: boolean | null
          istighfar?: boolean | null
          maghrib_fard?: boolean | null
          maghrib_nafl?: boolean | null
          maghrib_sunnah?: boolean | null
          morning_adhkar?: boolean | null
          on_time_prayer?: boolean | null
          quran_reading?: boolean | null
          sahur_notes?: string | null
          sport_notes?: string | null
          tahajjud?: boolean | null
          tarawih?: boolean | null
          three_good_things?: string | null
          todo_items?: Json | null
          tomorrow_plans?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string
          gender: Database["public"]["Enums"]["user_gender"] | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["user_gender"] | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["user_gender"] | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      user_gender: "Fille" | "Garçon"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      user_gender: ["Fille", "Garçon"],
    },
  },
} as const
