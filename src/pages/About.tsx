import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import trainingImage from "@/assets/training-room.jpg";
import { Target, Eye, Heart, Shield, Award, TrendingUp, Users, Star } from "lucide-react";

const values = [
  { icon: Heart, label: "Integrity", desc: "We uphold the highest ethical standards in all engagements." },
  { icon: Shield, label: "Professionalism", desc: "Excellence in delivery, communication, and conduct." },
  { icon: Award, label: "Excellence", desc: "Continuous pursuit of quality and impact in every service." },
  { icon: Users, label: "Service", desc: "Client-centric approach focused on building lasting partnerships." },
  { icon: TrendingUp, label: "Impact", desc: "Measurable results that transform organisations and careers." },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img src={trainingImage} alt="ADRAC training" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          About ADRAC
        </motion.h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          A leading professional services firm building institutional capacity across Nigeria.
        </p>
      </div>
    </section>

    {/* Who We Are */}
    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="Who We Are" centered={false} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              ADRAC Professional Services Consulting is a premier training, consulting, and advisory firm specialising in financial reporting standards (IFRS/IPSAS), corporate governance, forensic accounting, tax advisory, and executive leadership development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded by Dr. Deji Awobotu FCA, mni, ADRAC has established a nationwide reputation for delivering practical, high-impact professional development programmes that meet the evolving needs of regulators, financial institutions, government agencies, and the private sector.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a track record spanning numerous successful engagements and collaborations with bodies like the Financial Reporting Council (FRC), ICAN, NUPRC, and NCAA, ADRAC continues to set the standard for professional excellence in Nigeria.
            </p>
          </div>
          <div className="bg-surface rounded-xl p-8 border border-border">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-heading font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To deliver world-class training, consulting, and advisory services that build great minds, strengthen institutions, and advance professional standards across Africa.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-heading font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To be Africa's most trusted professional services firm—recognised for integrity, expertise, and transformational impact on corporate and public sector performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="section-padding bg-surface">
      <div className="container-narrow mx-auto">
        <SectionHeading title="Core Values" subtitle="The principles that guide everything we do." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md hover:border-primary/20 transition-all"
            >
              <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-card-foreground mb-1">{v.label}</h3>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Track Record */}
    <section className="section-padding bg-primary">
      <div className="container-narrow mx-auto text-center">
        <SectionHeading title="Our Track Record" light />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "500+", label: "Training Programmes" },
            { num: "15,000+", label: "Professionals Trained" },
            { num: "200+", label: "Corporate Clients" },
            { num: "20+", label: "Years of Experience" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-heading font-bold text-gold">{stat.num}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
