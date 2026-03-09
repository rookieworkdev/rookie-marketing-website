export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          org_number: string | null
          domain: string | null
          employee_count: number | null
          industry: string | null
          region: string | null
          current_score: number | null
          status: string | null
          created_at: string | null
          updated_at: string | null
          phone: string | null
          website: string | null
          ai_reasoning: string | null
          enrichment_needed: Json | null
          source: string[] | null
          company_description: string | null
        }
        Insert: {
          id?: string
          name: string
          org_number?: string | null
          domain?: string | null
          employee_count?: number | null
          industry?: string | null
          region?: string | null
          current_score?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          phone?: string | null
          website?: string | null
          ai_reasoning?: string | null
          enrichment_needed?: Json | null
          source?: string[] | null
          company_description?: string | null
        }
        Update: {
          id?: string
          name?: string
          org_number?: string | null
          domain?: string | null
          employee_count?: number | null
          industry?: string | null
          region?: string | null
          current_score?: number | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          phone?: string | null
          website?: string | null
          ai_reasoning?: string | null
          enrichment_needed?: Json | null
          source?: string[] | null
          company_description?: string | null
        }
        Relationships: []
      }
      website_inspiration: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          date: string
          description: string
          id: string
          image: string
          is_published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          date: string
          description: string
          id?: string
          image: string
          is_published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          image?: string
          is_published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      job_ads: {
        Row: {
          ai_category: string | null
          ai_reasoning: string | null
          ai_score: number | null
          ai_valid: boolean | null
          ai_experience: string | null
          application_email: string | null
          category: string | null
          company_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          external_id: string
          external_url: string | null
          id: string
          is_active: boolean | null
          is_ai_generated: boolean | null
          job_type: string | null
          location: string | null
          posted_date: string | null
          published_status: string | null
          raw_data: Json | null
          salary: string | null
          scraped_at: string | null
          service_type: string | null
          source: string
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_category?: string | null
          ai_reasoning?: string | null
          ai_score?: number | null
          ai_valid?: boolean | null
          ai_experience?: string | null
          application_email?: string | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          external_id: string
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          is_ai_generated?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string | null
          published_status?: string | null
          raw_data?: Json | null
          salary?: string | null
          scraped_at?: string | null
          service_type?: string | null
          source: string
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_category?: string | null
          ai_reasoning?: string | null
          ai_score?: number | null
          ai_valid?: boolean | null
          ai_experience?: string | null
          application_email?: string | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          external_id?: string
          external_url?: string | null
          id?: string
          is_active?: boolean | null
          is_ai_generated?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string | null
          published_status?: string | null
          raw_data?: Json | null
          salary?: string | null
          scraped_at?: string | null
          service_type?: string | null
          source?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_ads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
        ]
      }
      website_rookies: {
        Row: {
          city: string
          created_at: string | null
          id: string
          image_src: string | null
          is_current: boolean | null
          month: string
          name: string
          school: string
          studies: string
          updated_at: string | null
          year: number
        }
        Insert: {
          city: string
          created_at?: string | null
          id?: string
          image_src?: string | null
          is_current?: boolean | null
          month: string
          name: string
          school: string
          studies: string
          updated_at?: string | null
          year: number
        }
        Update: {
          city?: string
          created_at?: string | null
          id?: string
          image_src?: string | null
          is_current?: boolean | null
          month?: string
          name?: string
          school?: string
          studies?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types for the website tables
export type JobAd = Database['public']['Tables']['job_ads']['Row']
export type WebsiteRookie = Database['public']['Tables']['website_rookies']['Row']
export type WebsiteInspiration = Database['public']['Tables']['website_inspiration']['Row']
