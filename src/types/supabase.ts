export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: number
          created_at: string
          expires_at: string
          owner: string
          group_id: number
        }
        Insert: {
          id?: number
          created_at?: string
          expires_at?: string
          owner: string
          group_id: number
        }
        Update: {
          id?: number
          created_at?: string
          expires_at?: string
          owner?: string
          group_id?: number
        }
      }
      groups: {
        Row: {
          id: number
          short: string | null
          name: string | null
          events: number[] | null
        }
        Insert: {
          id?: number
          short?: string | null
          name?: string | null
          events?: number[] | null
        }
        Update: {
          id?: number
          short?: string | null
          name?: string | null
          events?: number[] | null
        }
      }
      members: {
        Row: {
          id: number
          user_id: string
          group_id: number | null
        }
        Insert: {
          id?: number
          user_id: string
          group_id?: number | null
        }
        Update: {
          id?: number
          user_id?: string
          group_id?: number | null
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
