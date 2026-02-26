import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Award, Users, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import businessSchoolImage from "@/assets/business-school.jpg";

const programmes = [
  "IFRS & IPSAS Certification Programmes",
  "Executive MBA in Financial Management",
  "Corporate Governance Diploma",
  "Forensic Accounting & Fraud Examination",
  "Leadership & Management Development",
  "Data Analytics for Finance Professionals",
];

const AdracBusinessSchool = () => (
  <Layout>
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img src={businessSchoolImage} alt="ADRAC Business School" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          ADRAC Business School
        </motion.h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          A premier institution for executive education, professional certifications, and leadership development.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading title="About the School" centered={false} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              ADRAC Business School is the educational arm of ADRAC Professional Services Consulting, dedicated to delivering world-class professional development and certification programmes for finance, governance, and leadership professionals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our programmes are designed with practical application in mind, combining rigorous academic content with real-world case studies and industry-relevant exercises. Led by experienced practitioners and thought leaders, ADRAC Business School equips professionals with the skills and knowledge needed to excel in today's complex business environment.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: GraduationCap, label: "Expert Faculty" },
                { icon: Award, label: "Accredited Programmes" },
                { icon: Users, label: "Networking Opportunities" },
                { icon: BookOpen, label: "Practical Curriculum" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <f.icon className="w-5 h-5 text-primary" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-8">
            <h3 className="font-heading font-bold text-foreground text-lg mb-4">Programmes Offered</h3>
            <ul className="space-y-3">
              {programmes.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/training#register" className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 text-sm">
              Enrol Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default AdracBusinessSchool;
