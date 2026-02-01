export interface Project {
  color?: string
  created_at: string
  description: string
  id?: string
  title: string
  updated_at?: string
  user_id?: string
  text: React.ReactNode
  is_published?: boolean
  image: string | null
  tags: string[]
  is_pin?: boolean
  category?: 'student' | 'personal'
}