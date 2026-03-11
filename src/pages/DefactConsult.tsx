import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, BarChart3, Shield, Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import defactImage from "@/assets/defact-consult.jpg";

const services = [
  { icon: Globe, title: "International Advisory", desc: "Cross-border financial advisory and regulatory compliance services." },
  { icon: BarChart3, title: "Corporate Restructuring", desc: "Strategic restructuring, turnaround management, and performance improvement." },
  { icon: Shield, title: "Regulatory Compliance", desc: "Ensuring compliance with local and international regulatory frameworks." },
  { icon: Briefcase, title: "Transaction Advisory", desc: "Due diligence, valuations, and M&A advisory services." },
];

const DefactConsult = () => (
  <Layout>
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img src={defactImage} alt="Defact International Consult" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Defact International Consult
        </motion.h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Specialised international consulting in financial advisory, regulatory compliance, and corporate restructuring.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <SectionHeading title="What We Offer" subtitle="Expert consulting services tailored for complex business challenges." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-md hover:border-primary/20 transition-all"
            >
              <svc.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-card-foreground mb-2">{svc.title}</h3>
              <p className="text-muted-foreground text-sm">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105">
            Contact for Enquiries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default DefactConsult;
