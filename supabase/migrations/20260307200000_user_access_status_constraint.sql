-- Migration: Add user_access_status enum to replace free-text status field
-- This ensures only valid values can be stored (pendente, aprovado, reprovado)

-- Create the enum type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE user_access_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add a check constraint to the user_access table status column
-- If column doesn't have it yet
DO $$
BEGIN
  -- Update any existing rows with invalid status to 'pending'
  UPDATE public.user_access
  SET status = 'pending'
  WHERE status NOT IN ('pending', 'approved', 'rejected');
END $$;

-- Add check constraint for valid status values
ALTER TABLE public.user_access 
  DROP CONSTRAINT IF EXISTS user_access_status_check;

ALTER TABLE public.user_access
  ADD CONSTRAINT user_access_status_check 
  CHECK (status IN ('pending', 'approved', 'rejected'));
