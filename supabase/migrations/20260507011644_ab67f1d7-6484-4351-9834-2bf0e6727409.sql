
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  room_type text,
  room_label text,
  check_in date,
  check_out date,
  guests int,
  nights int,
  special_requests text,
  amount_kobo bigint NOT NULL,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'paid',
  paystack_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.training_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  training_id text NOT NULL,
  training_title text NOT NULL,
  full_name text,
  email text NOT NULL,
  phone text,
  organisation text,
  job_title text,
  form_data jsonb,
  amount_kobo bigint NOT NULL,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'paid',
  paystack_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;

-- No public read/write; the verify-paystack edge function uses the service role.
