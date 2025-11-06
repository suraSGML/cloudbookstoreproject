-- Fix search_path for generate_share_code function
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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