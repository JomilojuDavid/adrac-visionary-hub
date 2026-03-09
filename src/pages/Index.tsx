import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Briefcase, Award, ArrowRight, Users, Shield, Globe, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import heroImage from "@/assets/hero-boardroom.jpg";
import founderImage from "@/assets/founder-portrait.jpg";
import businessSchoolImage from "@/assets/business-school.jpg";
import defactImage from "@/assets/defact-consult.jpg";
import apartmentsImage from "@/assets/calebs-apartments.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  {
    icon: BookOpen,
    title: "Training & Capacity Development",
    description: "IFRS, IPSAS, Accounting Standards, Public Finance, Leadership, Corporate Governance, Forensic Accounting.",
  },
  {
    icon: Briefcase,
    title: "Consulting & Advisory",
    description: "Financial reporting, valuations, tax advisory, audit support, transfer pricing, technical accounting.",
  },
  {
    icon: Award,
    title: "Executive Programmes",
    description: "Leadership seminars, industry masterclasses, regulatory-focused programmes, digital-age internal audit.",
  },
];

const trustReasons = [
  "Strong regulatory collaborations (FRC, ICAN, NUPRC, NCAA)",
  "Expert trainers with real industry experience",
  "Nationwide technical training footprint",
  "Practical knowledge that improves corporate performance",
  "Professional, reliable and ethical delivery",
];

const programmes = [
  "IFRS and IPSAS Certification",
  "Forensic Accounting & Anti-Fraud",
  "Corporate Governance & Ethics",
  "Digital Audit & Data Analytics",
  "Transfer Pricing & Taxation",
  "Leadership & Executive Education",
  "Industry-Specific Technical Training",
];

const testimonials = [
  {
    quote: "ADRAC's IFRS training transformed our finance team's competence. The practical approach and depth of knowledge delivered were exceptional.",
    name: "Adebayo Olumide",
    role: "CFO, Industrial Group",
  },
  {
    quote: "We have relied on ADRAC for corporate governance advisory for three years. Their expertise and professionalism are second to none.",
    name: "Funke Adeyemi",
    role: "Company Secretary, Regulated Entity",
  },
  {
    quote: "The forensic accounting programme was eye-opening. It has significantly improved our fraud detection capabilities.",
    name: "Chinedu Okafor",
    role: "Head of Internal Audit",
  },
];

const subEntities = [
  {
    name: "ADRAC Business School",
    description: "A premier institution delivering executive education, professional development, and certification programmes for finance and governance professionals.",
    image: businessSchoolImage,
    path: "/adrac-business-school",
  },
  {
    name: "Defact International Consult",
    description: "Specialised international consulting services in financial advisory, regulatory compliance, and corporate restructuring.",
    image: defactImage,
    path: "/defact-consult",
  },
  {
    name: "Caleb's Apartments",
    description: "Premium serviced accommodation for corporate travellers and training participants in a serene, professional environment.",
    image: apartmentsImage,
    path: "/calebs-apartments",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Corporate boardroom" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-4 max-w-4xl mx-auto"
          >
            ADRAC Professional Services Consulting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-foreground/80 font-body mb-8"
          >
            Building great minds for a better future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105"
            >
              View Our Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/training#register"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold px-8 py-4 rounded-lg transition-all"
            >
              Register for Training
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <SectionHeading title="What We Do" subtitle="Comprehensive professional services designed to elevate corporate performance and build sustainable institutional capacity." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeUp}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <svc.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-heading font-semibold mb-3 text-card-foreground">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{svc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Why Clients Trust ADRAC" light />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {trustReasons.map((reason, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-primary-foreground/90 text-sm">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Categories */}
      <section className="section-padding bg-surface">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Programme Categories" subtitle="Explore our comprehensive range of professional development and certification programmes." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {programmes.map((prog, i) => (
              <motion.div
                key={prog}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="font-heading font-medium text-sm text-card-foreground">{prog}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/training#calendar"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              View Training Calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Highlight */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={founderImage} alt="Dr. Deji Awobotu" className="rounded-xl shadow-xl w-full max-w-md mx-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-heading font-semibold text-gold uppercase tracking-widest">Meet Our Founder</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-2">
                Dr. Deji Awobotu <span className="text-primary">FCA, F.CIoD, mni</span>
              </h2>
              <p className="text-muted-foreground font-heading text-lg mb-4">Founder & Chief Executive</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A finance and accounting expert, policy strategist and capacity-building specialist with extensive experience across Nigeria's public and private sectors. He has played a significant role in strengthening financial reporting, governance and professional education through regulatory collaboration, executive training and institutional development.
              </p>
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
              >
                Read Full Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-Entities */}
      <section className="section-padding bg-surface">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Our Sub-Entities" subtitle="A family of brands delivering excellence across education, consulting, and hospitality." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subEntities.map((entity, i) => (
              <motion.div
                key={entity.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
              >
                <img src={entity.image} alt={entity.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">{entity.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{entity.description}</p>
                  <Link to={entity.path} className="text-primary font-heading font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto">
          <SectionHeading title="What Our Clients Say" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 border border-primary-foreground/10"
              >
                <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-heading font-semibold text-primary-foreground">{t.name}</p>
                  <p className="text-primary-foreground/60 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to Build Capacity?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Partner with ADRAC for world-class training, advisory, and professional development services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/training" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-heading font-semibold px-8 py-4 rounded-lg transition-all">
              Explore Training
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
