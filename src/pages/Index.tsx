import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Briefcase, Award, ArrowRight } from "lucide-react";
import StockMarketTicker from "@/components/home/StockMarketTicker";
import ExchangeRateTicker from "@/components/home/ExchangeRateTicker";
import frcLogo from "@/assets/partners/FRC.jpg";
import icanLogo from "@/assets/partners/ICAN.png";
import ananLogo from "@/assets/partners/ANAN.png";
import nuprcLogo from "@/assets/partners/NUPRC.png";
import ncaaLogo from "@/assets/partners/NCAA.jpg";
import faanLogo from "@/assets/partners/FAAN.jpg";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import heroImage from "@/assets/hero-boardroom.jpg";
import founderImage from "@/assets/founder-portrait.jpg";
import businessSchoolImage from "@/assets/business-school.jpg";
import defactImage from "@/assets/defact-consult.jpg";
import apartmentsImage from "@/assets/calebs-apartments.jpg";
import { useEffect, useState } from "react";

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
  "Strong regulatory collaborations (FRC, NRS, SEC, NGS, PENCOM ICAN, NUPRC, NCAA)",
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

interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  category?: string;
}

const Index = () => {
  const [latestNews, setLatestNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/punch-news");
        const data: Article[] = await res.json();
        setLatestNews(data.slice(0, 3)); // top 3 latest news
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNews();
  }, []);

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
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold px-8 py-4 rounded-lg transition-all"
            >
              Careers
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

      {/* Latest Insights */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <SectionHeading title="Latest Insights" subtitle="Expert perspectives on finance, governance, and professional development." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {latestNews.map((post, i) => (
              <motion.div
                key={post.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeUp}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <span className="inline-block bg-primary/10 text-primary text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category || "Latest News"}
                </span>
                <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-xs">{post.pubDate}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              View All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stock & Exchange Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <SectionHeading
            title="Market Watch"
            subtitle="Stay informed with live Nigerian market data and exchange rates."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary text-primary-foreground border border-primary/30 rounded-xl p-6 shadow-md [&_*]:text-primary-foreground">
              <StockMarketTicker />
            </div>
            <div className="bg-primary text-primary-foreground border border-primary/30 rounded-xl p-6 shadow-md [&_*]:text-primary-foreground">
              <ExchangeRateTicker />
            </div>
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
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <img src={founderImage} alt="Dr. Deji Awobotu" className="rounded-xl shadow-xl w-full max-w-md mx-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
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
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
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
                viewport={{ once: false, amount: 0.2 }}
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
            {[
              { id: "Pp7kut9vZm8", title: "Our Founder's Interview on BVN" },
              { id: "V1kw3UYqPls", title: "Interview with our Founder on Treasury Single Account" },
              { id: "dQw4w9WgXcQ", title: "Client Success Stories" },
            ].map((video, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeUp}
                className="rounded-xl overflow-hidden border border-primary-foreground/10"
              >
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="bg-primary-foreground/10 p-4">
                  <p className="font-heading font-semibold text-primary-foreground text-sm">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Logo Slider */}
      <section className="py-16 bg-surface overflow-hidden">
        <div className="container-narrow mx-auto mb-8">
          <SectionHeading title="Our Partners & Collaborators" subtitle="Trusted by Nigeria's leading regulatory and professional bodies." />
        </div>
        <div className="relative">
          <div className="flex animate-[scroll_25s_linear_infinite] w-max gap-16 items-center px-8">
            {[
              { src: frcLogo, name: "FRC" },
              { src: icanLogo, name: "ICAN" },
              { src: ananLogo, name: "ANAN" },
              { src: nuprcLogo, name: "NUPRC" },
              { src: ncaaLogo, name: "NCAA" },
              { src: faanLogo, name: "FAAN" },
              { src: frcLogo, name: "FRC" },
              { src: icanLogo, name: "ICAN" },
              { src: ananLogo, name: "ANAN" },
              { src: nuprcLogo, name: "NUPRC" },
              { src: ncaaLogo, name: "NCAA" },
              { src: faanLogo, name: "FAAN" },
            ].map((partner, i) => (
              <img
                key={i}
                src={partner.src}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to Build Capacity?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Partner with ADRAC for world-class training, advisory, and professional development services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/training#register" className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-semibold px-8 py-4 rounded-lg transition-all">
              Register for Training
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;