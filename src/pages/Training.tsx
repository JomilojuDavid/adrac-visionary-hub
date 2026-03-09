import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";

const trainingEvents = [
  { title: "IFRS 9 & IFRS 17 Implementation Workshop", date: "March 15-17, 2026", location: "Lagos", type: "In-Person" },
  { title: "IPSAS Certification Programme", date: "April 5-9, 2026", location: "Abuja", type: "In-Person" },
  { title: "Forensic Accounting Masterclass", date: "April 22-24, 2026", location: "Online", type: "Virtual" },
  { title: "Corporate Governance for Board Members", date: "May 10-11, 2026", location: "Lagos", type: "In-Person" },
  { title: "Transfer Pricing Compliance Workshop", date: "May 20-22, 2026", location: "Abuja", type: "In-Person" },
  { title: "Digital Internal Audit Bootcamp", date: "June 3-5, 2026", location: "Online", type: "Virtual" },
  { title: "Leadership & Executive Education Retreat", date: "June 15-18, 2026", location: "Ogun State", type: "In-Person" },
  { title: "Data Analytics for Financial Professionals", date: "July 7-9, 2026", location: "Lagos", type: "Hybrid" },
];

const Training = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", programme: "", organisation: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration submitted! We will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", programme: "", organisation: "" });
  };

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Training & Programmes
          </motion.h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            World-class professional development programmes tailored for today's finance and governance professionals.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Training Calendar" subtitle="Upcoming programmes for 2026. Register early to secure your place." />
          <div className="space-y-4">
            {trainingEvents.map((evt, i) => (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-card-foreground mb-2">{evt.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {evt.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {evt.location}</span>
                    <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full">{evt.type}</span>
                  </div>
                </div>
                <a href="#register" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-5 py-2.5 rounded-lg transition-all text-sm shrink-0">
                  Register <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="section-padding bg-surface">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading title="Online Registration" subtitle="Complete the form below to register for a programme. Our team will follow up with payment details." />
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5">
            {[
              { label: "Full Name", key: "name", type: "text" },
              { label: "Email Address", key: "email", type: "email" },
              { label: "Phone Number", key: "phone", type: "tel" },
              { label: "Organisation", key: "organisation", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-heading font-medium text-foreground mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={(formData as any)[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Select Programme</label>
              <select
                required
                value={formData.programme}
                onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Choose a programme...</option>
                {trainingEvents.map((evt) => (
                  <option key={evt.title} value={evt.title}>{evt.title}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold py-3 rounded-lg transition-all hover:scale-[1.02]">
              Submit Registration
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Training;
