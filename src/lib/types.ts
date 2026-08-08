/* ------------------------------------------------------------------ */
/*  Supabase Database Types for Guims Academy                          */
/* ------------------------------------------------------------------ */

export type UserRole = 'admin' | 'student' | 'teacher';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';
export type PaymentMethod = 'mobile_money' | 'card' | 'bank_transfer' | 'cash';

export type EnrollmentStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export type MaterialType = 'pdf' | 'video' | 'exercise' | 'other';

export type DocumentType = 'attestation' | 'bulletin' | 'certificate' | 'other';

/* ------------------------------------------------------------------ */
/*  Row types (what you get back from a SELECT)                        */
/* ------------------------------------------------------------------ */

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  formation_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  audience: 'Particuliers' | 'Entreprises & organisations';
  image_url: string | null;
  price: number;
  duration: string | null;
  courses: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  formation_id: string;
  status: EnrollmentStatus;
  payment_id: string | null;
  enrolled_at: string;
  completed_at: string | null;
  // Joined
  formation?: Formation;
  student?: Profile;
  payment?: Payment;
}

export interface Payment {
  id: string;
  enrollment_id: string | null;
  student_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  provider_ref: string | null;
  provider_name: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface CourseMaterial {
  id: string;
  formation_id: string;
  title: string;
  description: string | null;
  file_url: string;
  type: MaterialType;
  module_name: string | null;
  order_index: number;
  created_at: string;
}

export interface Schedule {
  id: string;
  formation_id: string;
  day_of_week: number; // 0=Sun, 1=Mon ... 6=Sat
  start_time: string;  // HH:MM
  end_time: string;    // HH:MM
  room: string | null;
  subject: string;
  teacher_name: string | null;
  created_at: string;
}

export interface Grade {
  id: string;
  student_id: string;
  formation_id: string;
  module: string;
  grade: number;
  max_grade: number;
  comment: string | null;
  graded_at: string;
  created_at: string;
}

export interface StudentDocument {
  id: string;
  student_id: string;
  title: string;
  type: DocumentType;
  file_url: string;
  created_at: string;
}

export interface NewsPost {
  id: string;
  message: string;
  image_url: string | null;
  published_at: string;
  category: string;
  facebook_post_id: string | null;
  permalink_url: string | null;
  is_from_facebook: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar_url: string | null;
  rating: number;
  is_featured: boolean;
  image_position: string | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Laureat {
  id: string;
  name: string;
  formation: string;
  promotion: string;
  status: string;
  avatar_url: string | null;
  social_profile_url: string | null;
  text: string;
  rating: number;
  bio: string;
  skills: string[];
  projects: string[];
  advice: string;
  image_position: string | null;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Database type (for createClient<Database>)                         */
/* ------------------------------------------------------------------ */

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Omit<Profile, 'id' | 'created_at'>> };
      formations: { Row: Formation; Insert: Omit<Formation, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Formation, 'id' | 'created_at'>> };
      enrollments: { Row: Enrollment; Insert: Omit<Enrollment, 'id' | 'enrolled_at'>; Update: Partial<Omit<Enrollment, 'id'>> };
      payments: { Row: Payment; Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Payment, 'id' | 'created_at'>> };
      course_materials: { Row: CourseMaterial; Insert: Omit<CourseMaterial, 'id' | 'created_at'>; Update: Partial<Omit<CourseMaterial, 'id' | 'created_at'>> };
      schedules: { Row: Schedule; Insert: Omit<Schedule, 'id' | 'created_at'>; Update: Partial<Omit<Schedule, 'id' | 'created_at'>> };
      grades: { Row: Grade; Insert: Omit<Grade, 'id' | 'created_at'>; Update: Partial<Omit<Grade, 'id' | 'created_at'>> };
      student_documents: { Row: StudentDocument; Insert: Omit<StudentDocument, 'id' | 'created_at'>; Update: Partial<Omit<StudentDocument, 'id' | 'created_at'>> };
      news_posts: { Row: NewsPost; Insert: Omit<NewsPost, 'id' | 'created_at'>; Update: Partial<Omit<NewsPost, 'id' | 'created_at'>> };
      testimonials: { Row: Testimonial; Insert: Omit<Testimonial, 'id' | 'created_at'>; Update: Partial<Omit<Testimonial, 'id' | 'created_at'>> };
      site_settings: { Row: SiteSetting; Insert: Omit<SiteSetting, 'id' | 'updated_at'>; Update: Partial<Omit<SiteSetting, 'id'>> };
      contact_messages: { Row: ContactMessage; Insert: Omit<ContactMessage, 'id' | 'created_at'>; Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>> };
      laureats: { Row: Laureat; Insert: Omit<Laureat, 'id' | 'created_at'>; Update: Partial<Omit<Laureat, 'id' | 'created_at'>> };
    };
  };
}
