export interface Database {
  public: {
    Tables: {
      routes: {
        Row: {
          id: string;
          name: string;
          coordinates: [number, number][];
          grade: string;
          potholes: number;
          cracks: number;
          description: string;
          video_url: string;
          date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['routes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['routes']['Insert']>;
      };
      defect_markers: {
        Row: {
          id: string;
          route_id: string;
          type: 'pothole' | 'crack';
          coordinates: [number, number];
          time: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['defect_markers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['defect_markers']['Insert']>;
      };
    };
  };
}