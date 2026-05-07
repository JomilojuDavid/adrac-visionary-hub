import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PAYSTACK_SECRET = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface BookingPayload {
  type: "booking";
  fullName: string;
  email: string;
  phone?: string;
  roomType?: string;
  roomLabel?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string | number;
  nights?: number;
  specialRequests?: string;
}

interface TrainingPayload {
  type: "training";
  trainingId: string;
  trainingTitle: string;
  email: string;
  fullName?: string;
  phone?: string;
  organisation?: string;
  jobTitle?: string;
  formData?: Record<string, unknown>;
}

type Payload = BookingPayload | TrainingPayload;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { reference, payload } = (await req.json()) as { reference: string; payload: Payload };
    if (!reference || !payload?.type) {
      return json({ error: "Missing reference or payload" }, 400);
    }

    // Verify with Paystack
    const v = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const vData = await v.json();
    if (!v.ok || !vData?.status || vData?.data?.status !== "success") {
      return json({ verified: false, error: "Payment not successful", details: vData }, 400);
    }

    const tx = vData.data;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    if (payload.type === "booking") {
      const { error } = await supabase.from("bookings").upsert({
        reference,
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        room_type: payload.roomType,
        room_label: payload.roomLabel,
        check_in: payload.checkIn || null,
        check_out: payload.checkOut || null,
        guests: payload.guests ? Number(payload.guests) : null,
        nights: payload.nights ?? null,
        special_requests: payload.specialRequests,
        amount_kobo: tx.amount,
        currency: tx.currency || "NGN",
        status: "paid",
        paystack_response: tx,
      }, { onConflict: "reference" });
      if (error) return json({ verified: true, saved: false, error: error.message }, 500);
    } else {
      const { error } = await supabase.from("training_registrations").upsert({
        reference,
        training_id: payload.trainingId,
        training_title: payload.trainingTitle,
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        organisation: payload.organisation,
        job_title: payload.jobTitle,
        form_data: payload.formData ?? {},
        amount_kobo: tx.amount,
        currency: tx.currency || "NGN",
        status: "paid",
        paystack_response: tx,
      }, { onConflict: "reference" });
      if (error) return json({ verified: true, saved: false, error: error.message }, 500);
    }

    return json({ verified: true, saved: true, reference });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
