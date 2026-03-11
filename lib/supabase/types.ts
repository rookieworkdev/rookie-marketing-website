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
          phone: string | null
          website: string | null
          description: string | null
          logo_url: string | null
          ai_reasoning: string | null
          enrichment_status: string | null
          enrichment_needed: Json | null
          created_at: string | null
          updated_at: string | null
          show_branding: boolean
          linkedin_url: string | null
          company_size: string | null
          source: string[] | null
          industry_id: string | null
          region_id: string | null
          country_id: string | null
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
          phone?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          ai_reasoning?: string | null
          enrichment_status?: string | null
          enrichment_needed?: Json | null
          created_at?: string | null
          updated_at?: string | null
          show_branding?: boolean
          linkedin_url?: string | null
          company_size?: string | null
          source?: string[] | null
          industry_id?: string | null
          region_id?: string | null
          country_id?: string | null
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
          phone?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          ai_reasoning?: string | null
          enrichment_status?: string | null
          enrichment_needed?: Json | null
          created_at?: string | null
          updated_at?: string | null
          show_branding?: boolean
          linkedin_url?: string | null
          company_size?: string | null
          source?: string[] | null
          industry_id?: string | null
          region_id?: string | null
          country_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
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
      jobs: {
        Row: {
          id: string
          company_id: string | null
          title: string
          description: string | null
          location: string | null
          job_type: string | null
          experience_level: string | null
          salary_min: number | null
          salary_max: number | null
          salary_currency: string | null
          remote_policy: string | null
          skills: Json | null
          benefits: Json | null
          application_url: string | null
          application_email: string | null
          is_published: boolean | null
          published_at: string | null
          expires_at: string | null
          created_at: string | null
          updated_at: string | null
          source: string | null
          external_id: string | null
          external_url: string | null
          posted_date: string | null
          scraped_at: string | null
          ai_valid: boolean | null
          ai_score: number | null
          ai_reasoning: string | null
          ai_category: string | null
          duration: string | null
          raw_data: Json | null
          service_type: string | null
          is_ai_generated: boolean | null
          category: string | null
          region_id: string | null
          ai_experience: string | null
          salary: string | null
          published_status: string | null
          is_active: boolean | null
          match_notified_at: string | null
          match_notification_status: string | null
          match_company_email: string | null
          match_company_email_source: string | null
          match_candidate_count: number | null
        }
        Insert: {
          id?: string
          company_id?: string | null
          title: string
          description?: string | null
          location?: string | null
          job_type?: string | null
          experience_level?: string | null
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string | null
          remote_policy?: string | null
          skills?: Json | null
          benefits?: Json | null
          application_url?: string | null
          application_email?: string | null
          is_published?: boolean | null
          published_at?: string | null
          expires_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          source?: string | null
          external_id?: string | null
          external_url?: string | null
          posted_date?: string | null
          scraped_at?: string | null
          ai_valid?: boolean | null
          ai_score?: number | null
          ai_reasoning?: string | null
          ai_category?: string | null
          duration?: string | null
          raw_data?: Json | null
          service_type?: string | null
          is_ai_generated?: boolean | null
          category?: string | null
          region_id?: string | null
          ai_experience?: string | null
          salary?: string | null
          published_status?: string | null
          is_active?: boolean | null
          match_notified_at?: string | null
          match_notification_status?: string | null
          match_company_email?: string | null
          match_company_email_source?: string | null
          match_candidate_count?: number | null
        }
        Update: {
          id?: string
          company_id?: string | null
          title?: string
          description?: string | null
          location?: string | null
          job_type?: string | null
          experience_level?: string | null
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string | null
          remote_policy?: string | null
          skills?: Json | null
          benefits?: Json | null
          application_url?: string | null
          application_email?: string | null
          is_published?: boolean | null
          published_at?: string | null
          expires_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          source?: string | null
          external_id?: string | null
          external_url?: string | null
          posted_date?: string | null
          scraped_at?: string | null
          ai_valid?: boolean | null
          ai_score?: number | null
          ai_reasoning?: string | null
          ai_category?: string | null
          duration?: string | null
          raw_data?: Json | null
          service_type?: string | null
          is_ai_generated?: boolean | null
          category?: string | null
          region_id?: string | null
          ai_experience?: string | null
          salary?: string | null
          published_status?: string | null
          is_active?: boolean | null
          match_notified_at?: string | null
          match_notification_status?: string | null
          match_company_email?: string | null
          match_company_email_source?: string | null
          match_candidate_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
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
export type JobRow = Database['public']['Tables']['jobs']['Row']
export type WebsiteRookie = Database['public']['Tables']['website_rookies']['Row']
export type WebsiteInspiration = Database['public']['Tables']['website_inspiration']['Row']
