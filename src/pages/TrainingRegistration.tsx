import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { trainingEvents, TrainingFormField } from "@/lib/trainingData";
import { CalendarDays, MapPin, ArrowLeft, CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_PUBLIC_KEY = "pk_test_13fd90a9b47a55f9ec5c06f5d4f27cc18871b774";

const parseFee = (fee?: string): number => {
  if (!fee) return 0;
  const num = fee.replace(/[^0-9]/g, "");
  return parseInt(num, 10) || 0;
};

const TrainingRegistration = () => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const training = trainingEvents.find((t) => t.id === trainingId);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);

  if (!training) {
    return (
      <Layout>
        <section className="section-padding bg-background text-center">
          <div className="container-narrow mx-auto">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Training Not Found</h1>
            <p className="text-muted-foreground mb-6">The training programme you're looking for doesn't exist.</p>
            <Link to="/training" className="inline-flex items-center gap-2 text-primary hover:underline font-heading font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back to Training Calendar
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const feeAmount = parseFee(training?.fee);

  const handlePayment = () => {
    // Validate required fields first
    const missingRequired = training?.formFields.filter(f => f.required && !formData[f.key]?.trim());
    if (missingRequired && missingRequired.length > 0) {
      toast({ title: "Please fill all required fields", description: `Missing: ${missingRequired.map(f => f.label).join(", ")}`, variant: "destructive" });
      return;
    }

    const email = formData["email"] || "";
    if (!email) {
      toast({ title: "Email Required", description: "Please provide your email address for payment.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: feeAmount * 100,
      currency: "NGN",
      ref: `TRAIN-${training!.id}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          { display_name: "Training", variable_name: "training", value: training!.title },
          { display_name: "Full Name", variable_name: "full_name", value: formData["name"] || "" },
          { display_name: "Phone", variable_name: "phone", value: formData["phone"] || "" },
          { display_name: "Organisation", variable_name: "organisation", value: formData["organisation"] || "" },
          { display_name: "Job Title", variable_name: "job_title", value: formData["jobTitle"] || "" },
        ],
      },
      callback: (response: { reference: string }) => {
        setLoading(false);
        setPaymentRef(response.reference);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast({ title: "Payment Successful! 🎉", description: `Ref: ${response.reference}. Confirmation sent to ${email}.` });
      },
      onClose: () => {
        setLoading(false);
        toast({ title: "Payment Cancelled", description: "Your registration has not been confirmed." });
      },
    });
    handler.openIframe();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feeAmount > 0) {
      handlePayment();
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderField = (field: TrainingFormField) => {
    const baseClasses =
      "w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={baseClasses + " resize-y"}
          />
        );
      case "select":
        return (
          <select
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className={baseClasses}
          >
            <option value="">{field.placeholder || "Select an option..."}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            required={field.required}
            value={formData[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-narrow mx-auto max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                {paymentRef ? "Payment Confirmed!" : "Registration Submitted!"}
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for registering for <span className="font-semibold text-foreground">{training.title}</span>.
              </p>
              {paymentRef ? (
                <p className="text-muted-foreground mb-2">Payment Reference: <span className="font-semibold text-foreground">{paymentRef}</span></p>
              ) : null}
              <p className="text-muted-foreground mb-8">Our team will contact you shortly with further instructions.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/training"
                  className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Training Calendar
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/training" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Training Calendar
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            {training.title}
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {training.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {training.location}</span>
            <span className="inline-block bg-primary-foreground/10 text-primary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
              {training.type}
            </span>
            {training.fee && (
              <span className="inline-block bg-primary-foreground/10 text-primary-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
                {training.fee}
              </span>
            )}
          </div>
          {training.description && (
            <p className="mt-4 text-primary-foreground/70 max-w-3xl">{training.description}</p>
          )}
        </div>
      </section>

      {/* Registration Form */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading title="Registration Form" subtitle={feeAmount > 0 ? `Complete the form below and pay ${training.fee} to confirm your spot.` : "Complete the form below to register. Our team will follow up with further details."} />
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8 space-y-5"
          >
            {training.formFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-heading font-medium text-foreground mb-1.5">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}

            {feeAmount > 0 && (
              <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Training Fee</p>
                  <p className="text-xl font-heading font-bold text-foreground">{training.fee}</p>
                </div>
                <CreditCard className="w-6 h-6 text-muted-foreground" />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Processing..."
              ) : feeAmount > 0 ? (
                <>
                  <CreditCard className="w-4 h-4" />
                  Pay {training.fee} & Register
                </>
              ) : (
                "Submit Registration"
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default TrainingRegistration;
