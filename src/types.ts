// Remove MySQL dependency
// import type { RowDataPacket } from "mysql2";

// Update Id interface to not extend RowDataPacket
export interface Id {
  id: number;
}

export type Todo = {
  id: number;
  task: string;
  checked: boolean;
  created_at?: string; // Supabase automatically adds timestamps
  image?: string;
};

// Supabase Database Types
export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          task: string
          checked: boolean
          created_at: string
        }
        Insert: {
          id?: number
          task: string
          checked?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          task?: string
          checked?: boolean
          created_at?: string
        }
      }
    }
  }
}
