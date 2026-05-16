import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShieldCheck, BarChart3, Calculator, Search, Lock, Landmark, Gavel, GraduationCap, Handshake, Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: FileText,
    title: "Financial Reporting and Advisory Services",
    overview: "Comprehensive support in the preparation, review, interpretation, and improvement of financial statements — helping clients comply with applicable standards while producing reports that are clear, reliable, and useful for decision-making.",
    benefits: [
      "IFRS, IPSAS, and IFRS for SMEs implementation",
      "Preparation and review of annual financial statements",
      "Group reporting, consolidation and disclosure enhancement",
      "Financial reporting health checks and gap assessments",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance and Financial Statement Review",
    overview: "We help organisations meet the requirements of regulators and oversight bodies, reduce avoidable sanctions, and strengthen the credibility of their financial reporting.",
    benefits: [
      "Pre-submission financial statement review",
      "Compliance with FRC, SEC, NGX, CAMA and sector rules",
      "Post-inspection remediation support",
      "Identification of red flags and regulatory concerns",
    ],
  },
  {
    icon: BarChart3,
    title: "Financial Management and Performance Improvement",
    overview: "Helping management teams move beyond routine reporting to effective financial planning, monitoring, and decision-making that drives performance.",
    benefits: [
      "Budgeting, forecasting and budgetary control",
      "Cash flow, treasury and working capital support",
      "Finance function transformation",
      "Financial dashboards and KPIs",
    ],
  },
  {
    icon: Calculator,
    title: "Tax Advisory and Tax Compliance Services",
    overview: "Practical and technically sound tax advisory services that help clients comply with tax laws, reduce tax risk, and manage their tax affairs responsibly.",
    benefits: [
      "Corporate tax, VAT and withholding tax advisory",
      "Transfer pricing advisory and documentation",
      "Tax health checks and risk management",
      "Support during tax audits and investigations",
    ],
  },
  {
    icon: Search,
    title: "Fraud Risk Management and Forensic Investigation",
    overview: "Specialist support in fraud prevention, detection, forensic investigation, and response to financial misconduct — delivered confidentially and evidence-based.",
    benefits: [
      "Fraud risk assessment and prevention frameworks",
      "Investigation of suspected fraud and irregularities",
      "Asset tracing and investigation reporting",
      "Staff training on fraud indicators",
    ],
  },
  {
    icon: Lock,
    title: "Internal Control, Risk and Compliance Services",
    overview: "Strengthening internal control systems and improving the ability to identify, assess, manage, and monitor risks across the organisation.",
    benefits: [
      "Internal control review and redesign",
      "Enterprise risk management support",
      "Risk and control matrix preparation",
      "Policies and standard operating procedures",
    ],
  },
  {
    icon: Landmark,
    title: "Public Financial Management Advisory",
    overview: "Solutions tailored to government institutions and public sector organisations that improve accountability, transparency, and service delivery.",
    benefits: [
      "IPSAS implementation and advisory",
      "Public sector budgeting and expenditure control",
      "Audit readiness for MDAs",
      "Donor-funded project and reform support",
    ],
  },
  {
    icon: Gavel,
    title: "Audit, Assurance and Governance Advisory",
    overview: "Working with boards, audit committees, and assurance functions to strengthen governance and improve oversight effectiveness.",
    benefits: [
      "Audit readiness and governance framework reviews",
      "Board and audit committee advisory and training",
      "Internal audit strengthening",
      "Assurance mapping and oversight design",
    ],
  },
  {
    icon: GraduationCap,
    title: "Capacity Building, Executive Training and Professional Development",
    overview: "High-impact training programmes for regulators, MDAs, corporates, financial institutions, boards, and professional bodies — practical, case-based, and interactive.",
    benefits: [
      "IFRS, IPSAS and finance for non-finance executives",
      "Governance, ethics, AML and compliance",
      "Internal audit, risk and forensic accounting",
      "Sustainability reporting and assurance",
    ],
  },
  {
    icon: Handshake,
    title: "Regulator Relationship Management and Stakeholder Engagement",
    overview: "Helping organisations engage regulators and stakeholders professionally and proactively — from inspection readiness to remediation.",
    benefits: [
      "Preparation for regulatory inspections",
      "Drafting responses to regulatory queries",
      "Pre-submission document review",
      "Stakeholder communication support",
    ],
  },
  {
    icon: Briefcase,
    title: "Management Consultancy and Strategic Advisory",
    overview: "Broader management consulting for organisations seeking to improve performance, governance, operational effectiveness, and strategic direction.",
    benefits: [
      "Organisational review and restructuring",
      "Strategic planning and policy development",
      "Performance management systems",
      "Executive advisory and transformation support",
    ],
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
