-- ================================================================
-- Guims Academy — Supabase Database Schema Migration
-- Run this SQL in the Supabase SQL Editor to create all tables
-- ================================================================

-- ----------------------------------------------------------------
-- 1. Profiles (extends auth.users)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student', 'teacher')),
  formation_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------
-- 2. Formations
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL CHECK (audience IN ('Particuliers', 'Entreprises & organisations')),
  image_url TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  duration TEXT,
  courses TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK to profiles
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_formation
  FOREIGN KEY (formation_id) REFERENCES public.formations(id) ON DELETE SET NULL;

-- ----------------------------------------------------------------
-- 3. Enrollments
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  payment_id UUID,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------
-- 4. Payments
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE SET NULL,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XAF',
  method TEXT NOT NULL DEFAULT 'mobile_money' CHECK (method IN ('mobile_money', 'card', 'bank_transfer', 'cash')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  provider_ref TEXT,
  provider_name TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK from enrollments to payments
ALTER TABLE public.enrollments
  ADD CONSTRAINT fk_enrollments_payment
  FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE SET NULL;

-- ----------------------------------------------------------------
-- 5. Course Materials
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'pdf' CHECK (type IN ('pdf', 'video', 'exercise', 'other')),
  module_name TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 6. Schedules
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  subject TEXT NOT NULL,
  teacher_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 7. Grades
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  grade NUMERIC NOT NULL,
  max_grade NUMERIC NOT NULL DEFAULT 20,
  comment TEXT,
  graded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 8. Student Documents
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'other' CHECK (type IN ('attestation', 'bulletin', 'certificate', 'other')),
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 9. News Posts
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  category TEXT NOT NULL DEFAULT 'Général',
  facebook_post_id TEXT,
  permalink_url TEXT,
  is_from_facebook BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 10. Testimonials
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  image_position TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 11. Laureats
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.laureats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  formation TEXT NOT NULL,
  promotion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  social_profile_url TEXT,
  text TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  bio TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  projects TEXT[] NOT NULL DEFAULT '{}',
  advice TEXT NOT NULL DEFAULT '',
  image_position TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------
-- 12. Site Settings
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('promo_text', 'OFFRE MERCREDI : <strong>accompagnement privilégié</strong> pour votre inscription !'),
  ('phone', '+237 655 955 615'),
  ('email', 'contact@guimsacademy.com'),
  ('location', 'Ndogbong Carrefour Conquete'),
  ('slogan', 'Osez innover, Osez créer')
ON CONFLICT (key) DO NOTHING;

-- ----------------------------------------------------------------
-- 13. Contact Messages
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- ROW LEVEL SECURITY POLICIES
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laureats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper function: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ---- PROFILES ----
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can do anything with profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- ---- FORMATIONS (public read) ----
CREATE POLICY "Anyone can view active formations" ON public.formations FOR SELECT USING (true);
CREATE POLICY "Admins can manage formations" ON public.formations FOR ALL USING (public.is_admin());

-- ---- ENROLLMENTS ----
CREATE POLICY "Students can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Admins can manage enrollments" ON public.enrollments FOR ALL USING (public.is_admin());

-- ---- PAYMENTS ----
CREATE POLICY "Students can view own payments" ON public.payments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL USING (public.is_admin());

-- ---- COURSE MATERIALS ----
CREATE POLICY "Enrolled students can view materials" ON public.course_materials FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.student_id = auth.uid()
      AND enrollments.formation_id = course_materials.formation_id
      AND enrollments.status IN ('active', 'completed')
  )
);
CREATE POLICY "Admins can manage materials" ON public.course_materials FOR ALL USING (public.is_admin());

-- ---- SCHEDULES ----
CREATE POLICY "Enrolled students can view schedules" ON public.schedules FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.student_id = auth.uid()
      AND enrollments.formation_id = schedules.formation_id
      AND enrollments.status IN ('active', 'completed')
  )
);
CREATE POLICY "Admins can manage schedules" ON public.schedules FOR ALL USING (public.is_admin());

-- ---- GRADES ----
CREATE POLICY "Students can view own grades" ON public.grades FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Admins can manage grades" ON public.grades FOR ALL USING (public.is_admin());

-- ---- STUDENT DOCUMENTS ----
CREATE POLICY "Students can view own documents" ON public.student_documents FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Admins can manage documents" ON public.student_documents FOR ALL USING (public.is_admin());

-- ---- NEWS POSTS (public read) ----
CREATE POLICY "Anyone can view news" ON public.news_posts FOR SELECT USING (true);
CREATE POLICY "Admins can manage news" ON public.news_posts FOR ALL USING (public.is_admin());

-- ---- TESTIMONIALS (public read) ----
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

-- ---- LAUREATS (public read) ----
CREATE POLICY "Anyone can view laureats" ON public.laureats FOR SELECT USING (true);
CREATE POLICY "Admins can manage laureats" ON public.laureats FOR ALL USING (public.is_admin());

-- ---- SITE SETTINGS (public read) ----
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- ---- CONTACT MESSAGES ----
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());

-- ================================================================
-- STORAGE BUCKETS
-- ================================================================
-- Run these in Supabase Dashboard > Storage or via API:
-- 1. Create bucket "course-materials" (public: false)
-- 2. Create bucket "student-documents" (public: false)
-- 3. Create bucket "avatars" (public: true)
-- 4. Create bucket "formations" (public: true)
-- 5. Create bucket "news" (public: true)
