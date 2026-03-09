import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

import frcLogo from "@/assets/partners/FRC.jpg";
import icanLogo from "@/assets/partners/ICAN.png";
import ananLogo from "@/assets/partners/ANAN.png";
import nuprcLogo from "@/assets/partners/NUPRC.png";
import ncaaLogo from "@/assets/partners/NCAA.jpg";
import faanLogo from "@/assets/partners/FAAN.jpg";

const partners = [
  { name: "Financial Reporting Council (FRC)", description: "Nigeria's principal regulatory body for financial reporting. ADRAC serves as a technical resource partner for standards implementation and capacity building.", logo: frcLogo },
  { name: "Institute of Chartered Accountants of Nigeria (ICAN)", description: "ADRAC collaborates with ICAN on professional development programmes, IFRS training, and continuing professional education.", logo: icanLogo },
  { name: "Association of National Accountants of Nigeria (ANAN)", description: "Partnership in public sector accounting training, IPSAS implementation, and professional capacity building.", logo: ananLogo },
  { name: "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)", description: "Technical advisory and training services for petroleum industry financial reporting and regulatory compliance.", logo: nuprcLogo },
  { name: "Nigerian Civil Aviation Authority (NCAA)", description: "Capacity building and governance advisory services for Nigeria's aviation regulatory body.", logo: ncaaLogo },
  { name: "Federal Airports Authority of Nigeria (FAAN)", description: "Training and advisory services in financial management, governance, and operational excellence.", logo: faanLogo },
  { name: "State Governments", description: "IPSAS implementation, public financial management training, and governance capacity building for multiple state governments." },
  { name: "Financial Institutions", description: "IFRS training, corporate governance advisory, and risk management capacity building for banks and financial services firms." },
];

const Collaborations = () => (
  <Layout>
    <section className="relative py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Collaborations & Partners
        </motion.h1>
        <p className="text-xl text-primary-foreground/80">Trusted partnerships with Nigeria's leading regulatory and professional bodies.</p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <SectionHeading title="Our Partners" subtitle="ADRAC's credibility is reinforced through strategic collaborations with institutions that shape Nigeria's financial and governance landscape." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-xl font-heading font-bold text-primary">{p.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-card-foreground mb-2">{p.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Collaborations;
