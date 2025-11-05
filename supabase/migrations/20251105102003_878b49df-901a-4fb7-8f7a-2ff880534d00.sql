-- Create shared_wishlists table for wishlist sharing
CREATE TABLE IF NOT EXISTS public.shared_wishlists (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_code text NOT NULL UNIQUE,
  wishlist_data jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  view_count integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.shared_wishlists ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view shared wishlists by code
CREATE POLICY "Anyone can view shared wishlists by code"
ON public.shared_wishlists
FOR SELECT
USING (true);

-- Users can create their own shared wishlists
CREATE POLICY "Users can create their own shared wishlists"
ON public.shared_wishlists
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own shared wishlists
CREATE POLICY "Users can delete their own shared wishlists"
ON public.shared_wishlists
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_shared_wishlists_share_code ON public.shared_wishlists(share_code);

-- Create function to generate unique share codes
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  LOOP
    -- Generate random 8-character code
    new_code := substring(md5(random()::text || clock_timestamp()::text) from 1 for 8);
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.shared_wishlists WHERE share_code = new_code) INTO code_exists;
    
    -- Exit loop if code is unique
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN new_code;
END;
$$;