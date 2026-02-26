import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import founderImage from "@/assets/founder-portrait.jpg";
import { Award, BookOpen, Globe, Users, Briefcase, GraduationCap } from "lucide-react";

const sections = [
  {
    icon: GraduationCap,
    title: "Education & Certifications",
    items: [
      "Fellow, Institute of Chartered Accountants of Nigeria (FCA)",
      "Member, National Institute (mni)",
      "Doctorate in Accounting & Financial Management",
      "Master's in Business Administration (MBA)",
      "BSc Accounting (First Class Honours)",
      "Certified Forensic Accountant",
      "IFRS Certification (ACCA & ICAEW accredited)",
    ],
  },
  {
    icon: Briefcase,
    title: "Leadership Roles",
    items: [
      "Founder & Lead Consultant, ADRAC Professional Services Consulting",
      "Founder, ADRAC Business School",
      "Managing Director, Defact International Consult",
      "Senior Partner, Financial Advisory Practice",
      "Board Member, Multiple Financial Institutions",
    ],
  },
  {
    icon: Award,
    title: "Regulatory Engagements",
    items: [
      "Technical Consultant to Financial Reporting Council of Nigeria (FRC)",
      "Resource Person, Institute of Chartered Accountants of Nigeria (ICAN)",
      "Technical Adviser, Nigerian Upstream Petroleum Regulatory Commission (NUPRC)",
      "Consultant to Nigerian Civil Aviation Authority (NCAA)",
      "Adviser to Federal Airports Authority of Nigeria (FAAN)",
    ],
  },
  {
    icon: Globe,
    title: "International Conferences & Projects",
    items: [
      "Speaker at IFRS Foundation Conferences",
      "Participant at World Bank Financial Reporting Workshops",
      "Led IPSAS Implementation Projects for State Governments",
      "Facilitated Corporate Governance Reforms for Listed Companies",
      "Keynote Speaker at Pan-African Accounting Conferences",
    ],
  },
  {
    icon: Users,
    title: "Boards Served",
    items: [
      "Board of Directors, Leading Nigerian Financial Institutions",
      "Governing Council, Professional Accounting Bodies",
      "Advisory Board, Academic Institutions",
      "Audit Committees of Listed Companies",
    ],
  },
  {
    icon: BookOpen,
    title: "Social Impact",
    items: [
      "Pro-bono training for emerging accountants",
      "Scholarship programmes for accounting students",
      "Community development initiatives through Caleb's Apartments",
      "Mentorship of young professionals in finance and governance",
    ],
  },
];

const FounderProfile = () => (
  <Layout>
    <section className="relative py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Founder's Profile
        </motion.h1>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <img src={founderImage} alt="Dr. Deji Awobotu" className="rounded-xl shadow-xl w-full sticky top-24" />
          </div>
          <div className="md:col-span-2">
            <span className="text-sm font-heading font-semibold text-gold uppercase tracking-widest">Founder & Lead Consultant</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
              Dr. Deji Awobotu <span className="text-primary">FCA, mni</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Dr. Deji Awobotu is a distinguished chartered accountant, national honours recipient, and one of Nigeria's foremost experts in financial reporting standards, corporate governance, and professional education.
              </p>
              <p>
                With decades of experience spanning public practice, regulatory advisory, and executive education, Dr. Awobotu has been instrumental in shaping Nigeria's financial reporting landscape. His work with the Financial Reporting Council (FRC), ICAN, NUPRC, NCAA, and various state governments has positioned him as a trusted authority in the profession.
              </p>
              <p>
                As the founder of ADRAC Professional Services Consulting and ADRAC Business School, he continues to champion the cause of building great minds for a better future—delivering practical, impact-driven programmes that transform organisations and advance professional standards.
              </p>
            </div>
          </div>
        </div>

        {/* Detail sections */}
        <div className="space-y-12">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface border border-border rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <sec.icon className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-heading font-bold text-foreground">{sec.title}</h3>
              </div>
              <ul className="space-y-2">
                {sec.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default FounderProfile;
