// Paystack webhook handler with HMAC SHA512 signature verification.
// Configure this URL in Paystack dashboard:
//   https://uealhlkmvahfyaxbvivq.supabase.co/functions/v1/paystack-webhook
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { createHmac } from "node:crypto";

const PAYSTACK_SECRET = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// No CORS — webhook is server-to-server from Paystack only.
Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const signature = req.headers.get("x-paystack-signature") || "";
  const rawBody = await req.text();

  // Verify signature
  const expected = createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex");
  if (signature !== expected) {
    console.error("Invalid Paystack signature");
    return new Response("Invalid signature", { status: 401 });
  }

  let event: { event: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  console.log("Paystack webhook event:", event.event);

  // Only handle successful charges. Respond 200 to all other events to prevent retries.
  if (event.event !== "charge.success") {
    return new Response("ok", { status: 200 });
  }

  const tx = event.data as {
    reference: string;
    amount: number;
    currency: string;
    customer?: { email?: string };
    metadata?: Record<string, unknown> & { custom_fields?: Array<{ variable_name: string; value: string }> };
    status: string;
  };

  if (tx.status !== "success") {
    return new Response("ok", { status: 200 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const reference = tx.reference;
  const email = tx.customer?.email || "";

  // Helper to read a metadata custom_field value by variable_name
  const cf = (name: string): string => {
    const f = tx.metadata?.custom_fields?.find((x) => x.variable_name === name);
    return (f?.value as string) || "";
  };

  try {
    if (reference.startsWith("TRAIN-")) {
      // Training registration
      const { error } = await supabase.from("training_registrations").upsert({
        reference,
        training_id: cf("training_id") || (tx.metadata?.trainingId as string) || reference.split("-")[1] || "",
        training_title: cf("training") || (tx.metadata?.trainingTitle as string) || "",
        full_name: cf("full_name"),
        email,
        phone: cf("phone"),
        organisation: cf("organisation"),
        job_title: cf("job_title"),
        form_data: tx.metadata ?? {},
        amount_kobo: tx.amount,
        currency: tx.currency || "NGN",
        status: "paid",
        paystack_response: tx,
      }, { onConflict: "reference" });
      if (error) {
        console.error("Training upsert error:", error);
        return new Response("DB error", { status: 500 });
      }
    } else {
      // Booking (default)
      const { error } = await supabase.from("bookings").upsert({
        reference,
        full_name: cf("full_name"),
        email,
        phone: cf("phone"),
        room_type: cf("room_type"),
        room_label: cf("room_label"),
        check_in: cf("check_in") || null,
        check_out: cf("check_out") || null,
        guests: cf("guests") ? Number(cf("guests")) : null,
        nights: cf("nights") ? Number(cf("nights")) : null,
        special_requests: cf("special_requests"),
        amount_kobo: tx.amount,
        currency: tx.currency || "NGN",
        status: "paid",
        paystack_response: tx,
      }, { onConflict: "reference" });
      if (error) {
        console.error("Booking upsert error:", error);
        return new Response("DB error", { status: 500 });
      }
    }
  } catch (e) {
    console.error("Handler error:", e);
    return new Response("error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
});
