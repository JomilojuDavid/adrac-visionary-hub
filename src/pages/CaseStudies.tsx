import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircle } from "lucide-react";

const caseStudies = [
  {
    title: "IFRS Implementation for a Major Nigerian Bank",
    challenge: "A leading tier-2 bank needed to transition from Nigerian GAAP to full IFRS compliance within 12 months to meet regulatory deadlines.",
    solution: "ADRAC deployed a team of IFRS specialists who conducted gap analysis, developed implementation roadmaps, trained finance teams, and provided ongoing advisory support throughout the transition.",
    impact: ["Achieved full IFRS compliance ahead of deadline", "Trained over 80 finance professionals", "Improved financial reporting transparency", "Received commendation from FRC"],
  },
  {
    title: "Corporate Governance Overhaul for a Listed Company",
    challenge: "A publicly listed company faced governance deficiencies highlighted during regulatory review, risking reputational damage and potential sanctions.",
    solution: "ADRAC conducted a comprehensive governance review, restructured board committees, developed a governance code, and delivered training for board members and senior management.",
    impact: ["Governance rating improved to 'Good'", "Board effectiveness score increased by 40%", "Zero compliance infractions in subsequent reviews", "Improved investor confidence"],
  },
  {
    title: "Forensic Investigation in a Public Sector Agency",
    challenge: "A government agency suspected significant financial irregularities in procurement and payroll processes spanning multiple fiscal years.",
    solution: "ADRAC's forensic accounting team conducted detailed investigations, analysed financial records, interviewed key personnel, and prepared comprehensive reports for management and oversight bodies.",
    impact: ["Identified ₦2.3 billion in irregularities", "Strengthened internal controls", "Developed fraud prevention framework", "Training delivered to 150 staff members"],
  },
];

const clientTestimonials = [
  { quote: "ADRAC's forensic investigation was thorough, professional, and delivered actionable recommendations that have transformed our control environment.", name: "Agency Director General", org: "Federal Government Agency" },
  { quote: "The IFRS training programme was the best we've attended. Practical, well-structured, and immediately applicable to our work.", name: "Senior Accountant", org: "Financial Institution" },
  { quote: "Dr. Awobotu's expertise in corporate governance is unmatched. ADRAC helped us build a governance framework that regulators now reference as best practice.", name: "Board Chairman", org: "Listed Company" },
];

const CaseStudies = () => (
  <Layout>
    <section className="relative py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Case Studies & Testimonials
        </motion.h1>
        <p className="text-xl text-primary-foreground/80">Real impact. Proven results. Trusted by leading organisations.</p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto space-y-16">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="bg-primary/5 px-8 py-5 border-b border-border">
              <h2 className="text-xl font-heading font-bold text-card-foreground">{cs.title}</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm uppercase tracking-wider text-primary">Challenge</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm uppercase tracking-wider text-primary">Solution</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm uppercase tracking-wider text-primary">Impact</h3>
                <ul className="space-y-2">
                  {cs.impact.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-surface">
      <div className="container-narrow mx-auto">
        <SectionHeading title="Client Testimonials" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientTestimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">"{t.quote}"</p>
              <p className="font-heading font-semibold text-card-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default CaseStudies;
