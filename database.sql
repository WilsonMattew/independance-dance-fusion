
-- Create pre_registrations table
CREATE TABLE public.pre_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile TEXT NOT NULL,
  alternate_mobile TEXT,
  email TEXT NOT NULL,
  school_college TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  dance_type TEXT NOT NULL CHECK (dance_type IN ('solo', 'duo', 'group')),
  age_group TEXT NOT NULL CHECK (age_group IN ('7-9', '9-12', '12-17')),
  theme TEXT NOT NULL CHECK (theme IN ('Naya Bharat', 'Mythology')),
  category TEXT NOT NULL CHECK (category IN ('Western Freestyle', 'Classical', 'Folk')),
  participant1_name TEXT,
  participant2_name TEXT,
  group_members JSONB,
  video_url TEXT NOT NULL,
  payment_session_id TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pre_registration_id UUID REFERENCES public.pre_registrations(id),
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile TEXT NOT NULL,
  alternate_mobile TEXT,
  email TEXT NOT NULL,
  school_college TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  dance_type TEXT NOT NULL CHECK (dance_type IN ('solo', 'duo', 'group')),
  age_group TEXT NOT NULL CHECK (age_group IN ('7-9', '9-12', '12-17')),
  theme TEXT NOT NULL CHECK (theme IN ('Naya Bharat', 'Mythology')),
  category TEXT NOT NULL CHECK (category IN ('Western Freestyle', 'Classical', 'Folk')),
  participant1_name TEXT,
  participant2_name TEXT,
  group_members JSONB,
  video_url TEXT NOT NULL,
  amount INTEGER NOT NULL,
  payment_id TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  audition_status TEXT NOT NULL DEFAULT 'under_review' CHECK (audition_status IN ('under_review', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create admins table
CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pre_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for pre_registrations
CREATE POLICY "Allow public insert" ON public.pre_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.pre_registrations
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON public.pre_registrations
  FOR UPDATE USING (true);

-- Create policies for registrations
CREATE POLICY "Allow public select registrations" ON public.registrations
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert registrations" ON public.registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update registrations" ON public.registrations
  FOR UPDATE USING (true);

-- Create policies for admins
CREATE POLICY "Allow admin select" ON public.admins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow admin insert" ON public.admins
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for registrations table
CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON public.registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (you need to create this user in Supabase Auth first)
-- After creating the user in Supabase Auth, get their UUID and replace 'USER_UUID_HERE'
-- INSERT INTO public.admins (user_id, email, name, role) 
-- VALUES ('USER_UUID_HERE', 'admin@npanashik.com', 'Admin User', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_pre_registrations_email ON public.pre_registrations(email);
CREATE INDEX idx_pre_registrations_status ON public.pre_registrations(status);
CREATE INDEX idx_registrations_email ON public.registrations(email);
CREATE INDEX idx_registrations_audition_status ON public.registrations(audition_status);
CREATE INDEX idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX idx_admins_user_id ON public.admins(user_id);
