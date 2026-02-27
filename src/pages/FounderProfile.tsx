import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import founderImage from "@/assets/founder-portrait.jpg";
import { Award, BookOpen, Globe, Users, Briefcase, GraduationCap } from "lucide-react";

const sections = [
  {
    icon: GraduationCap,
    title: "Education & Certifications",
    items: [
      "PhD in Accounting and Finance – Ballsbridge University",
      "Earlier degrees in Accounting",
      "Member of the National Institute (mni) – Senior Executive Course, NIPSS, Kuru (2023)",
      "Fellow, Institute of Chartered Accountants of Nigeria (ICAN)",
      "Fellow, Chartered Institute of Taxation of Nigeria (CITN)",
      "Fellow, Chartered Institute of Directors Nigeria (F.CIoD)",
      "Fellow, Institute of Management Consultants",
      "Fellow, Institute of Chartered Professionals",
      "Certified Fraud Examiner (CFE) – USA",
      "Certified Anti-Money Laundering Specialist (ACAMS) – USA",
    ],
  },
  {
    icon: Briefcase,
    title: "Leadership Roles",
    items: [
      "Founder & Chief Executive, ADRAC Professional Services Consulting (est. 2012)",
      "Founder & Chief Executive, Defact International Consult (est. 2020)",
      "Former Chief Finance Officer, Santrust Securities",
      "Former Chief Internal Auditor, Pan Africa Capital Markets",
      "Former Head of Asset Management, Goldman Assets Management",
      "Former Head of Financial Audit, BGL Group",
    ],
  },
  {
    icon: Award,
    title: "Regulatory & Governance Engagements",
    items: [
      "Member, Governing Council of ICAN (2015–2024)",
      "Convened the Inaugural Regulators and Operators Conference (2016)",
      "Supported Lagos State Government's readiness for the World Bank SFTAS programme",
      "Reviewed Lagos State's 2019 IPSAS Financial Statements",
      "Appointed to the Lagos State Stamp Duties Collection and Recovery Committee (2020)",
      "Led nationwide valuation and fair value measurement training with FRC (2025) – Lagos, Abuja, Port Harcourt, Kaduna",
      "Partnered with FRC on nationwide IFRS for SMEs and IFRS 19 training – over 2,000 delegates across Lagos, Kano, Owerri, Abuja",
    ],
  },
  {
    icon: Globe,
    title: "Key Areas of Expertise",
    items: [
      "IFRS and IPSAS application",
      "Business valuation and fair value measurement",
      "Forensic audit and fraud risk management",
      "Anti-money laundering",
      "Public financial management",
      "Financial reporting",
      "Corporate governance and ethics",
      "Leadership development and executive training",
    ],
  },
  {
    icon: Users,
    title: "Boards & Institutional Service",
    items: [
      "Governing Council of ICAN (2015–2024)",
      "Strategic initiatives across professional accounting bodies",
      "Advisory roles with government agencies and financial institutions",
    ],
  },
  {
    icon: BookOpen,
    title: "Personal & Social Impact",
    items: [
      "Dedicated father to Arnold and Caleb",
      "Passionate about mentoring young professionals",
      "Supporting youth development through education and philanthropy",
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
            <span className="text-sm font-heading font-semibold text-gold uppercase tracking-widest">Founder & Chief Executive</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
              Dr. Deji Awobotu <span className="text-primary">FCA, F.CIoD, mni</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Dr. Deji Awobotu is a finance and accounting expert, policy strategist and capacity-building specialist with extensive experience across Nigeria's public and private sectors. He has played a significant role in strengthening financial reporting, governance and professional education through regulatory collaboration, executive training and institutional development.
              </p>
              <p>
                He served on the Governing Council of ICAN from 2015 to 2024, where he led several strategic initiatives, including convening the Inaugural Regulators and Operators Conference in 2016. His governance insight shaped the Lagos State Government's readiness for the World Bank SFTAS programme, and he reviewed the State's 2019 IPSAS financial statements. In 2020, he was appointed to the Lagos State Stamp Duties Collection and Recovery Committee.
              </p>
              <p>
                As Founder and Chief Executive of ADRAC Professional Services Consulting (established 2012) and Defact International Consult (established 2020), he leads multidisciplinary teams delivering high-impact training and advisory services to regulators, government agencies and private institutions. In 2025, ADRAC executed a nationwide valuation and fair value measurement training in collaboration with the Financial Reporting Council of Nigeria (FRC), covering Lagos, Abuja, Port Harcourt and Kaduna. ADRAC also partnered with FRC to deliver a nationwide IFRS for SMEs and IFRS 19 training that attracted over 2,000 delegates across Lagos, Kano, Owerri and Abuja.
              </p>
              <p>
                Dr. Awobotu's career spans senior roles in financial services, including Chief Finance Officer at Santrust Securities; Chief Internal Auditor at Pan Africa Capital Markets; Head of Asset Management at Goldman Assets Management; and Head of Financial Audit at BGL Group. These roles provided a solid foundation in financial analysis, corporate governance, audit, risk management and regulatory compliance.
              </p>
              <p>
                He holds a PhD in Accounting and Finance from Ballsbridge University, with earlier degrees in Accounting. He earned the prestigious title of Member of the National Institute (mni) after completing the Senior Executive Course at NIPSS, Kuru in 2023. He is a Fellow of ICAN, CITN, the Chartered Institute of Directors Nigeria, the Institute of Management Consultants and the Institute of Chartered Professionals. His international certifications include CFE (USA) and ACAMS (USA).
              </p>
            </div>
          </div>
        </div>

        {/* Detail sections */}
        <div className="space-y-12">
          {sections.map((sec) => (
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
