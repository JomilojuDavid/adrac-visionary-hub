import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, BarChart3, Shield, Search, Calculator, TrendingUp, Monitor, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: FileText,
    title: "IFRS / IPSAS Training & Implementation",
    overview: "Comprehensive training and implementation support for International Financial Reporting Standards and International Public Sector Accounting Standards.",
    benefits: ["Deep understanding of standards", "Practical implementation guidance", "Regulatory compliance assurance", "Customised organisational training"],
  },
  {
    icon: BarChart3,
    title: "Financial Reporting Advisory",
    overview: "Expert advisory services on financial reporting, helping organisations produce accurate, compliant, and transparent financial statements.",
    benefits: ["Improved reporting accuracy", "Regulatory compliance", "Stakeholder confidence", "Best practice adoption"],
  },
  {
    icon: Shield,
    title: "Corporate Governance & Ethics Training",
    overview: "Building ethical leadership and governance frameworks that meet international standards and local regulatory requirements.",
    benefits: ["Board effectiveness", "Regulatory alignment", "Risk mitigation", "Ethical culture development"],
  },
  {
    icon: Search,
    title: "Forensic Accounting & Fraud Investigation",
    overview: "Specialised forensic accounting services to detect, investigate, and prevent financial fraud and irregularities.",
    benefits: ["Fraud detection", "Investigation support", "Internal controls strengthening", "Litigation support"],
  },
  {
    icon: Calculator,
    title: "Tax Advisory & Transfer Pricing",
    overview: "Strategic tax advisory and transfer pricing documentation to ensure compliance and optimise tax positions.",
    benefits: ["Tax compliance", "Transfer pricing documentation", "Tax risk management", "Regulatory alignment"],
  },
  {
    icon: TrendingUp,
    title: "Valuation Services & Training",
    overview: "Professional valuation services and training for business, asset, and financial instrument valuations.",
    benefits: ["Accurate valuations", "Standards compliance", "Transaction support", "Capacity building"],
  },
  {
    icon: Monitor,
    title: "Digital Age Audit & Internal Audit Support",
    overview: "Modernising internal audit functions with digital tools, data analytics, and contemporary audit methodologies.",
    benefits: ["Digital audit capabilities", "Data-driven insights", "Process efficiency", "Risk-based audit approach"],
  },
  {
    icon: Users,
    title: "Leadership & Executive Education",
    overview: "High-impact leadership programmes designed for C-suite executives, directors, and senior managers across industries.",
    benefits: ["Strategic thinking", "Leadership excellence", "Industry networking", "Career advancement"],
  },
];

const Services = () => (
  <Layout>
    <section className="relative py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Our Services
        </motion.h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Comprehensive professional services designed to build institutional capacity and drive performance.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto space-y-16">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svc.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground">{svc.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{svc.overview}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 text-sm">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {svc.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
