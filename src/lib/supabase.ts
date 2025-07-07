import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqxdxnwcdutedvjccrmg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGR4bndjZHV0ZWR2amNjcm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTA1NDksImV4cCI6MjA2NzQ4NjU0OX0.3Fd5RZdlsMPETmaSc0TbB1oKm9_DMsV1v__WApqcjXk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      pre_registrations: {
        Row: {
          id: string
          name: string
          date_of_birth: string
          age: number
          gender: string
          address: string
          mobile: string
          alternate_mobile?: string
          email: string
          school_college: string
          teacher_name: string
          dance_type: 'solo' | 'duo' | 'group'
          age_group: '7-9' | '9-12' | '12-17'
          theme: 'Naya Bharat' | 'Mythology'
          category: 'Western Freestyle' | 'Classical' | 'Folk'
          participant1_name?: string
          participant2_name?: string
          group_members?: any
          video_url: string
          amount: number
          status: 'pending' | 'paid' | 'failed'
          payment_session_id?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['pre_registrations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['pre_registrations']['Insert']>
      }
      registrations: {
        Row: {
          id: string
          pre_registration_id: string
          name: string
          date_of_birth: string
          age: number
          gender: string
          address: string
          mobile: string
          alternate_mobile?: string
          email: string
          school_college: string
          teacher_name: string
          dance_type: 'solo' | 'duo' | 'group'
          age_group: '7-9' | '9-12' | '12-17'
          theme: 'Naya Bharat' | 'Mythology'
          category: 'Western Freestyle' | 'Classical' | 'Folk'
          participant1_name?: string
          participant2_name?: string
          group_members?: any
          video_url: string
          amount: number
          payment_id: string
          payment_status: string
          audition_status: 'under_review' | 'approved' | 'rejected'
          admin_notes?: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['registrations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['registrations']['Insert']>
      }
      admins: {
        Row: {
          id: string
          user_id: string
          email: string
          name: string
          role: 'admin' | 'super_admin'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['admins']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['admins']['Insert']>
      }
    }
  }
}