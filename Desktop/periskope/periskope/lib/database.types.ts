export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string
          created_at: string
          title: string
          last_message: string | null
          last_message_time: string | null
          unread_count: number
          labels: string[]
          phone_number: string | null
          avatar: string | null
          is_group: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          last_message?: string | null
          last_message_time?: string | null
          unread_count?: number
          labels?: string[]
          phone_number?: string | null
          avatar?: string | null
          is_group?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          last_message?: string | null
          last_message_time?: string | null
          unread_count?: number
          labels?: string[]
          phone_number?: string | null
          avatar?: string | null
          is_group?: boolean
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          user_id: string
          content: string
          created_at: string
          read: boolean
          type: string
        }
        Insert: {
          id?: string
          chat_id: string
          user_id: string
          content: string
          created_at?: string
          read?: boolean
          type?: string
        }
        Update: {
          id?: string
          chat_id?: string
          user_id?: string
          content?: string
          created_at?: string
          read?: boolean
          type?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          avatar: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string | null
          phone?: string | null
          created_at?: string
        }
      }
    }
  }
}

