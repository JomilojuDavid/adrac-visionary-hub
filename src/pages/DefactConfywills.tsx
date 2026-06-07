import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Recycle,
  Truck,
  Search,
  Tag,
  Leaf,
  PiggyBank,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Globe,
  Tv,
  Refrigerator,
  Sofa,
  Fan,
  Package,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import flyerAsset from "@/assets/defact-confywills-flyer.jpeg.asset.json";

const collectItems = [
  { icon: Tv, title: "Old Electronics", desc: "TVs, phones, laptops, speakers, etc." },
  { icon: Refrigerator, title: "Home Appliances", desc: "Fridges, irons, blenders, etc." },
  { icon: Sofa, title: "Furniture & Household", desc: "Chairs, tables, mattresses, etc." },
  { icon: Fan, title: "Fans & Electricals", desc: "Standing fans, electrical equipment." },
  { icon: Package, title: "Other Usable Items", desc: "Anything still useful or refurbishable." },
];

const howItWorks = [
  { icon: Truck, title: "Bring or Schedule Pickup", desc: "Drop off or schedule a pickup of your old items at your convenience." },
  { icon: Search, title: "We Inspect & Evaluate", desc: "Our team carefully inspects and evaluates the items you bring." },
  { icon: Tag, title: "Get 50% Discount", desc: "You receive a 50% discount on any new product of your choice." },
  { icon: Recycle, title: "Responsible Recycling", desc: "We recycle or refurbish the items responsibly for a greener Nigeria." },
];

const whyChoose = [
  { icon: PiggyBank, title: "Save Money" },
  { icon: Leaf, title: "Reduce Waste & Pollution" },
  { icon: MapPin, title: "Support a Greener Nigeria" },
  { icon: ShieldCheck, title: "Quality Products at Half Price" },
  { icon: Clock, title: "Fast & Reliable Service" },
];

const DefactConfywills = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0e3b1f]">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#c9a227_0%,transparent_50%)]" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#f5c842] font-heading font-semibold tracking-widest text-sm mb-3"
          >
            PARTNERS IN SUSTAINABILITY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-5 leading-tight"
          >
            defact<span className="text-[#f5c842]">&</span> confywills
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/90 mb-3"
          >
            We collect what you no longer use and give you more value for{" "}
            <span className="text-[#f5c842] font-semibold">a better tomorrow.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-[#f5c842] text-[#0e3b1f] font-heading font-bold uppercase px-5 py-2 rounded-md text-lg mt-4"
          >
            Exchange for a Better Tomorrow!
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#f5c842] hover:bg-[#e0b630] text-[#0e3b1f] font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              Schedule a Pickup <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-heading font-semibold px-6 py-3 rounded-lg transition-all"
            >
              How It Works
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-5 -right-5 w-32 h-32 md:w-40 md:h-40 bg-[#f5c842] rounded-full flex flex-col items-center justify-center text-[#0e3b1f] font-heading font-bold shadow-xl z-10">
            <span className="text-xs">GET</span>
            <span className="text-3xl md:text-4xl leading-none">50%</span>
            <span className="text-xs">DISCOUNT</span>
          </div>
          <img
            src={flyerAsset.url}
            alt="defact & confywills - Exchange for a Better Tomorrow"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>

    {/* About */}
    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto text-center">
        <SectionHeading
          title="Building a Greener, Smarter Nigeria"
          subtitle="defact & confywills are partners in building a cleaner, smarter and more sustainable Nigeria. We collect your old electronics and household items you no longer use and reward you with 50% discount on any new product you choose!"
        />
      </div>
    </section>

    {/* We Collect */}
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="What We Collect" subtitle="A wide range of items we accept for exchange and responsible recycling." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {collectItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md hover:border-[#0e3b1f]/30 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#0e3b1f]/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-7 h-7 text-[#0e3b1f]" />
              </div>
              <h3 className="font-heading font-semibold text-card-foreground mb-1 text-sm">{item.title}</h3>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section id="how-it-works" className="section-padding bg-[#0e3b1f] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">How It Works</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Four simple steps from your old item to a brand new one — at half the price.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur"
            >
              <div className="w-12 h-12 rounded-full bg-[#f5c842] text-[#0e3b1f] flex items-center justify-center font-heading font-bold mb-4">
                {i + 1}
              </div>
              <step.icon className="w-7 h-7 text-[#f5c842] mb-3" />
              <h3 className="font-heading font-semibold mb-2">{step.title}</h3>
              <p className="text-white/75 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading title="Why Choose Us?" subtitle="Real value for you, real impact for Nigeria." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#f5c842]/20 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-[#0e3b1f]" />
              </div>
              <p className="font-heading font-semibold text-sm">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA / Contact */}
    <section className="section-padding bg-gradient-to-br from-[#0e3b1f] to-[#072412] text-white">
      <div className="container-narrow mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Together, Let's Build a Greener <span className="text-[#f5c842]">& Better Nigeria.</span>
        </h2>
        <p className="text-white/80 mb-10 max-w-2xl mx-auto">
          Recycle today, save tomorrow. Get in touch to schedule a pickup or visit us in any major city across Nigeria.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <Phone className="w-6 h-6 text-[#f5c842] mb-3" />
            <p className="text-white/70 text-sm">Call us</p>
            <p className="font-heading font-semibold">0704 548 633</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <Globe className="w-6 h-6 text-[#f5c842] mb-3" />
            <p className="text-white/70 text-sm">Website</p>
            <a
              href="https://adracconsulting.com/defact-confywills"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold break-all text-[#f5c842] hover:underline"
            >
              adracconsulting.com/defact-confywills
            </a>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <MapPin className="w-6 h-6 text-[#f5c842] mb-3" />
            <p className="text-white/70 text-sm">Coverage</p>
            <p className="font-heading font-semibold">All major cities across Nigeria</p>
          </div>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#f5c842] hover:bg-[#e0b630] text-[#0e3b1f] font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
        >
          Contact Us Today <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default DefactConfywills;
