
# Admin Setup Instructions

## Step 1: Create Admin User in Supabase Auth

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" 
4. Create a user with:
   - Email: admin@npanashik.com (or your preferred admin email)
   - Password: (set a secure password)
   - Email Confirm: true

## Step 2: Get the User UUID

1. After creating the user, copy their UUID from the Users table
2. You'll need this UUID for the next step

## Step 3: Add Admin to Database

1. Go to SQL Editor in your Supabase dashboard
2. Run this query (replace USER_UUID_HERE with the actual UUID):

```sql
INSERT INTO public.admins (user_id, email, name, role) 
VALUES ('USER_UUID_HERE', 'admin@npanashik.com', 'Admin User', 'admin');
```

## Step 4: Test Admin Login

1. Go to /admin page
2. Login with the email and password you created
3. You should now have access to the admin panel

## Troubleshooting

If you get "Access Denied" error:
- Make sure the user UUID in the admins table matches the auth user UUID
- Check that the email addresses match exactly
- Verify that the user was created successfully in Supabase Auth

## Alternative Quick Setup

You can also run this complete setup in SQL Editor:

```sql
-- This will work if you want to use a specific UUID (generate one first)
-- INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
-- VALUES ('12345678-1234-1234-1234-123456789012', 'admin@npanashik.com', now(), now(), now());

-- Then add to admins table:
-- INSERT INTO public.admins (user_id, email, name, role) 
-- VALUES ('12345678-1234-1234-1234-123456789012', 'admin@npanashik.com', 'Admin User', 'admin');
```

Note: It's recommended to create users through the Supabase dashboard interface rather than directly in SQL for proper password hashing and security.
