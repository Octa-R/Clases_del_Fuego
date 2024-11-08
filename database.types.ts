export type Database = {
  public: {
    Tables: {
      alumnes: {
        Row: {
          apellido: string;
          created_at: string;
          email: string;
          fecha_nacimiento: string;
          id: number;
          nombre: string;
          observaciones: string | null;
        };
        Insert: {
          apellido: string;
          created_at?: string;
          email: string;
          fecha_nacimiento: string;
          id?: number;
          nombre: string;
          observaciones?: string | null;
        };
        Update: {
          apellido?: string;
          created_at?: string;
          email?: string;
          fecha_nacimiento?: string;
          id?: number;
          nombre?: string;
          observaciones?: string | null;
        };
        Relationships: [];
      };
      DIAS_DE_LA_SEMANA: {
        Row: {
          CODE: number;
          id: number;
          NAME: string;
          VALUE: string;
        };
        Insert: {
          CODE: number;
          id?: number;
          NAME: string;
          VALUE: string;
        };
        Update: {
          CODE?: number;
          id?: number;
          NAME?: string;
          VALUE?: string;
        };
        Relationships: [];
      };
      horarios: {
        Row: {
          cantidad_inscriptos: number | null;
          creado_en: string | null;
          cupo_maximo: number;
          dia_semana: string;
          hora_fin: string;
          hora_inicio: string;
          id: number;
          modificado_en: string | null;
        };
        Insert: {
          cantidad_inscriptos?: number | null;
          creado_en?: string | null;
          cupo_maximo?: number;
          dia_semana: string;
          hora_fin: string;
          hora_inicio: string;
          id?: number;
          modificado_en?: string | null;
        };
        Update: {
          cantidad_inscriptos?: number | null;
          creado_en?: string | null;
          cupo_maximo?: number;
          dia_semana?: string;
          hora_fin?: string;
          hora_inicio?: string;
          id?: number;
          modificado_en?: string | null;
        };
        Relationships: [];
      };
      inscripciones: {
        Row: {
          activo: boolean | null;
          created_at: string;
          id: number;
          id_alumne: number | null;
          id_horario: number | null;
        };
        Insert: {
          activo?: boolean | null;
          created_at?: string;
          id?: number;
          id_alumne?: number | null;
          id_horario?: number | null;
        };
        Update: {
          activo?: boolean | null;
          created_at?: string;
          id?: number;
          id_alumne?: number | null;
          id_horario?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inscripciones_id_alumne_fkey";
            columns: ["id_alumne"];
            isOneToOne: false;
            referencedRelation: "alumnes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inscripciones_id_horario_fkey";
            columns: ["id_horario"];
            isOneToOne: false;
            referencedRelation: "horarios";
            referencedColumns: ["id"];
          },
        ];
      };
      pagos: {
        Row: {
          creado_en: string;
          fecha_pago: string;
          id: number;
          id_alumne: number;
          id_horario: number;
          metodo_pago: string;
          modificado_en: string | null;
          monto: number;
        };
        Insert: {
          creado_en?: string;
          fecha_pago: string;
          id?: number;
          id_alumne: number;
          id_horario: number;
          metodo_pago: string;
          modificado_en?: string | null;
          monto: number;
        };
        Update: {
          creado_en?: string;
          fecha_pago?: string;
          id?: number;
          id_alumne?: number;
          id_horario?: number;
          metodo_pago?: string;
          modificado_en?: string | null;
          monto?: number;
        };
        Relationships: [
          {
            foreignKeyName: "PAGOS_id_alumne_fkey";
            columns: ["id_alumne"];
            isOneToOne: false;
            referencedRelation: "alumnes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "PAGOS_id_horario_fkey";
            columns: ["id_horario"];
            isOneToOne: false;
            referencedRelation: "horarios";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
