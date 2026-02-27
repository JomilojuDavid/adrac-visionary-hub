import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wifi, Car, Shield, Coffee, Tv, Wind } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import apartmentsImage from "@/assets/calebs-apartments.jpg";

const amenities = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Car, label: "Secure Parking" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Coffee, label: "Fully Equipped Kitchen" },
  { icon: Tv, label: "Smart TV & Entertainment" },
  { icon: Wind, label: "Air Conditioning" },
];

const CalebsApartments = () => (
  <Layout>
    <section className="relative py-24 md:py-32 overflow-hidden">
      <img src={apartmentsImage} alt="Caleb's Apartments" className="absolute inset-0 w-full h-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
          Caleb's Apartments
        </motion.h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Premium serviced accommodation for corporate travellers and training participants.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading title="Your Home Away from Home" centered={false} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Caleb's Apartments offers premium, fully furnished serviced apartments designed for corporate professionals, training participants, and short-to-medium stay guests. Located in a serene environment along the Mowe-Ofada corridor, our apartments combine comfort, convenience, and security.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're attending an ADRAC training programme or need comfortable accommodation for business travel, Caleb's Apartments provides the perfect base with modern amenities and a professional atmosphere.
            </p>

            <h3 className="font-heading font-bold text-foreground text-lg mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {amenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <a.icon className="w-5 h-5 text-primary" />
                  {a.label}
                </div>
              ))}
            </div>

            <Link to="/calebs-apartments/book" className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-6">
            <img src={apartmentsImage} alt="Caleb's Apartments" className="rounded-xl shadow-lg w-full" />
            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-border h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.4!3d6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJOIDPCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1600000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Caleb's Apartments Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default CalebsApartments;
