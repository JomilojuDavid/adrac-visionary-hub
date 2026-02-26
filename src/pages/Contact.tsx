import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We will respond within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Contact Us
          </motion.h1>
          <p className="text-xl text-primary-foreground/80">Get in touch. We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <SectionHeading title="Get In Touch" centered={false} subtitle="Reach out to us for training, consulting, or partnership enquiries." />
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Office Address</h3>
                    <p className="text-muted-foreground text-sm">Arnold's House, Bluestone Estate, Mowe-Ofada Road, Mowe, Ogun State, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground text-sm">08035487820</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">info@adracconsulting.com</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.4!3d6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJOIDPCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1600000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ADRAC Office Location"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">Send a Message</h3>
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone", type: "tel" },
                  { label: "Subject", key: "subject", type: "text" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-heading font-medium text-foreground mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
