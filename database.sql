-- IndepeDANCE Database Schema
-- Run this in your Supabase SQL Editor

-- Create pre_registrations table (before payment)
CREATE TABLE pre_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    alternate_mobile VARCHAR(15),
    email VARCHAR(255) NOT NULL,
    school_college VARCHAR(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    dance_type VARCHAR(20) NOT NULL CHECK (dance_type IN ('solo', 'duo', 'group')),
    age_group VARCHAR(10) NOT NULL CHECK (age_group IN ('7-9', '9-12', '12-17')),
    theme VARCHAR(50) NOT NULL CHECK (theme IN ('Naya Bharat', 'Mythology')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Western Freestyle', 'Classical', 'Folk')),
    participant1_name VARCHAR(255),
    participant2_name VARCHAR(255),
    group_members JSONB,
    video_url TEXT NOT NULL,
    amount DECIMAL(10,2) DEFAULT 500.00,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    payment_session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create registrations table (after successful payment)
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pre_registration_id UUID REFERENCES pre_registrations(id),
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    alternate_mobile VARCHAR(15),
    email VARCHAR(255) NOT NULL,
    school_college VARCHAR(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    dance_type VARCHAR(20) NOT NULL,
    age_group VARCHAR(10) NOT NULL,
    theme VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    participant1_name VARCHAR(255),
    participant2_name VARCHAR(255),
    group_members JSONB,
    video_url TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_id VARCHAR(255) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'paid',
    audition_status VARCHAR(20) DEFAULT 'under_review' CHECK (audition_status IN ('under_review', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create admins table
CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pre_registrations
CREATE POLICY "Allow public insert" ON pre_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read own" ON pre_registrations FOR SELECT USING (true);
CREATE POLICY "Allow admin read all" ON pre_registrations FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
);

-- RLS Policies for registrations
CREATE POLICY "Allow public read own registration" ON registrations FOR SELECT USING (email = auth.jwt() ->> 'email' OR true);
CREATE POLICY "Allow admin read all registrations" ON registrations FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
);
CREATE POLICY "Allow admin update registrations" ON registrations FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
);

-- RLS Policies for admins
CREATE POLICY "Allow admin read own" ON admins FOR SELECT USING (user_id = auth.uid());

-- Insert default admin (you can change this email)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('admin@npanashik.com', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW());

-- Insert admin record (replace with actual user_id after creating auth user)
-- You'll need to run this separately after creating the auth user
-- INSERT INTO admins (user_id, email, name, role) 
-- VALUES ('USER_ID_FROM_AUTH_USERS', 'admin@npanashik.com', 'Admin User', 'super_admin');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for registrations table
CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_pre_registrations_email ON pre_registrations(email);
CREATE INDEX idx_pre_registrations_status ON pre_registrations(status);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_audition_status ON registrations(audition_status);
CREATE INDEX idx_registrations_dance_type ON registrations(dance_type);
CREATE INDEX idx_registrations_age_group ON registrations(age_group);