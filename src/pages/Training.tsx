import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { trainingEvents } from "@/lib/trainingData";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const Training = () => {
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

      <section id="calendar" className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Training Calendar" subtitle="Upcoming programmes for 2026. Click Register to sign up." />
          <div className="space-y-4">
            {trainingEvents.map((evt, i) => (
              <motion.div
                key={evt.id}
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
                    {evt.fee && <span className="text-xs font-heading font-semibold text-foreground">{evt.fee}</span>}
                  </div>
                </div>
                <Link
                  to={`/training/register/${evt.id}`}
                  className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-5 py-2.5 rounded-lg transition-all text-sm shrink-0"
                >
                  Register <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Training;
