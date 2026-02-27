"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import trainingImage from "@/assets/training-room.jpg";
import {
  Heart,
  Shield,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

import MotionSection from "@/lib/animations/MotionSection";
import MotionDiv from "@/lib/animations/MotionDiv";
import { fadeUp, scaleIn } from "@/lib/animations/variants";

/* =========================================
   RE-TRIGGERING COUNT UP COMPONENT
========================================= */

type CountUpProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
};

const CountUp = ({ from = 0, to, duration = 2, suffix = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const isInView = useInView(ref, {
    amount: 0.6,
  });

  const motionValue = useMotionValue(from);

  const formatted = useTransform(motionValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    let controls: any;

    if (isInView) {
      motionValue.set(from);
      controls = animate(motionValue, to, {
        duration,
        ease: "easeOut",
      });
    } else {
      motionValue.set(from);
    }

    return () => controls?.stop();
  }, [isInView, from, to, duration, motionValue]);

  return (
    <motion.span ref={ref}>
      {formatted}
      {suffix}
    </motion.span>
  );
};

/* =========================================
   DATA
========================================= */

const values = [
  {
    icon: Heart,
    label: "Integrity",
    desc: "We uphold the highest ethical standards in all engagements.",
  },
  {
    icon: Shield,
    label: "Professionalism",
    desc: "Excellence in delivery, communication, and conduct.",
  },
  {
    icon: Award,
    label: "Excellence",
    desc: "Continuous pursuit of quality and impact in every service.",
  },
  {
    icon: Users,
    label: "Service",
    desc: "Client-centric approach focused on building lasting partnerships.",
  },
  {
    icon: TrendingUp,
    label: "Impact",
    desc: "Measurable results that transform organisations and careers.",
  },
];

const stats = [
  { num: 500, label: "Training Programmes" },
  { num: 15000, label: "Professionals Trained" },
  { num: 200, label: "Corporate Clients" },
  { num: 20, label: "Years of Experience" },
];

/* =========================================
   ABOUT PAGE
========================================= */

const About = () => (
  <Layout>
    {/* HERO */}
    <MotionSection className="relative py-24 md:py-32 overflow-hidden" variant={fadeUp}>
      <img
        src={trainingImage}
        alt="ADRAC training"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          About ADRAC
        </h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          A leading professional services firm building institutional capacity
          across Nigeria.
        </p>
      </div>
    </MotionSection>

    {/* WHO WE ARE */}
    <MotionSection
      variant={fadeUp}
      className="section-padding bg-background"
    >
      <div className="container-narrow mx-auto">
        <SectionHeading title="Who We Are" centered={false} />

        <p className="text-muted-foreground leading-relaxed mb-4">
          ADRAC Professional Services Consulting is a premier training,
          consulting, and advisory firm specialising in IFRS/IPSAS,
          corporate governance, forensic accounting, tax advisory, and
          executive leadership development.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Founded by Dr. Deji Awobotu FCA, mni, ADRAC has established a
          nationwide reputation for delivering practical, high-impact
          professional development programmes.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          ADRAC continues to set the standard for professional excellence
          across Nigeria.
        </p>
      </div>
    </MotionSection>

    {/* CORE VALUES */}
    <MotionSection
      variant={fadeUp}
      className="section-padding bg-surface"
    >
      <div className="container-narrow mx-auto">
        <SectionHeading
          title="Core Values"
          subtitle="The principles that guide everything we do."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((v) => (
            <MotionDiv
              key={v.label}
              variant={scaleIn}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-all"
            >
              <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-1">
                {v.label}
              </h3>
              <p className="text-xs text-muted-foreground">
                {v.desc}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>

    {/* TRACK RECORD */}
    <MotionSection
      variant={fadeUp}
      className="section-padding bg-primary"
    >
      <div className="container-narrow mx-auto text-center">
        <SectionHeading title="Our Track Record" light />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <MotionDiv key={stat.label} variant={scaleIn}>
              <p className="text-3xl md:text-4xl font-heading font-bold text-gold">
                <CountUp to={stat.num} suffix="+" />
              </p>
              <p className="text-sm text-primary-foreground/70 mt-1">
                {stat.label}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  </Layout>
);

export default About;
