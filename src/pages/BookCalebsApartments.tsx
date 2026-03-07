import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Wifi, Car, Shield, Coffee, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import RoomCard from "@/components/booking/RoomCard";
import BookingSummary from "@/components/booking/BookingSummary";
import StepIndicator from "@/components/booking/StepIndicator";
import apartmentsImage from "@/assets/calebs-apartments.jpg";
import studioImg from "@/assets/rooms/studio.jpg";
import oneBedImg from "@/assets/rooms/one-bed.jpg";
import twoBedImg from "@/assets/rooms/two-bed.jpg";
import executiveImg from "@/assets/rooms/executive.jpg";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const roomTypes = [
  {
    value: "studio", label: "Studio Apartment", price: 25000, image: studioImg,
    description: "Cosy and efficient space perfect for solo travellers or short business stays.",
    maxGuests: 2, size: "30 m²", features: ["Queen Bed", "Kitchenette", "WiFi", "Work Desk"],
  },
  {
    value: "one-bed", label: "1-Bedroom Apartment", price: 40000, image: oneBedImg,
    description: "Separate living and sleeping areas with full kitchen amenities.",
    maxGuests: 3, size: "50 m²", features: ["King Bed", "Full Kitchen", "Smart TV", "Balcony"],
  },
  {
    value: "two-bed", label: "2-Bedroom Apartment", price: 60000, image: twoBedImg,
    description: "Spacious layout ideal for families or colleagues travelling together.",
    maxGuests: 5, size: "80 m²", features: ["2 Beds", "Living Room", "Dining Area", "Laundry"],
  },
  {
    value: "executive", label: "Executive Suite", price: 85000, image: executiveImg,
    description: "Premium luxury suite with panoramic views and top-tier finishes.",
    maxGuests: 4, size: "100 m²", features: ["King Bed", "Jacuzzi", "Lounge", "Butler Service"],
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const BookCalebsApartments = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", roomType: "",
    checkIn: "", checkOut: "", guests: "1", specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const selectedRoom = roomTypes.find((r) => r.value === form.roomType);
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000))
    : 0;
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = (s: number) => {
    if (s === 1) return !!form.roomType;
    if (s === 2) return !!(form.fullName.trim() && form.email.trim() && form.phone.trim() && form.checkIn && form.checkOut && nights > 0);
    return true;
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = () => {
    if (PAYSTACK_PUBLIC_KEY.startsWith("pk_test_pk_test_13fd90a9b47a55f9ec5c06f5d4f27cc18871b774")) {
      toast({ title: "Payment Not Configured", description: "Paystack gateway is not yet configured. Please contact support.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY, email: form.email, amount: totalAmount * 100, currency: "NGN",
      ref: `CALEB-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: form.fullName },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Room Type", variable_name: "room_type", value: selectedRoom?.label },
          { display_name: "Check-in", variable_name: "check_in", value: form.checkIn },
          { display_name: "Check-out", variable_name: "check_out", value: form.checkOut },
          { display_name: "Guests", variable_name: "guests", value: form.guests },
          { display_name: "Special Requests", variable_name: "special_requests", value: form.specialRequests },
        ],
      },
      callback: (response: { reference: string }) => {
        setLoading(false);
        toast({ title: "Booking Confirmed! 🎉", description: `Payment successful. Ref: ${response.reference}. Confirmation sent to ${form.email}.` });
        setForm({ fullName: "", email: "", phone: "", roomType: "", checkIn: "", checkOut: "", guests: "1", specialRequests: "" });
        setStep(1);
      },
      onClose: () => { setLoading(false); toast({ title: "Payment Cancelled", description: "Your booking has not been confirmed." }); },
    });
    handler.openIframe();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img src={apartmentsImage} alt="Caleb's Apartments" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gold font-heading font-semibold text-sm tracking-widest uppercase mb-3">Caleb's Apartments</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Book Your Stay</h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">Premium serviced apartments — select your room, choose dates, and pay securely.</p>
            <div className="flex items-center justify-center gap-4 mt-6 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Bluestone Estate BlueStone Estate Local Government, Deji Awobotu Avenue, Mowe, Obafemi Owode 110113, Ogun State</span>
              <span className="flex items-center gap-1"><Wifi className="w-4 h-4" /> Free WiFi</span>
              <span className="flex items-center gap-1"><Car className="w-4 h-4" /> Parking</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> 24/7 Security</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <Link to="/calebs-apartments" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Caleb's Apartments
          </Link>

          <StepIndicator current={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-heading font-bold text-foreground text-2xl mb-6">Choose Your Room</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {roomTypes.map((room) => (
                        <RoomCard key={room.value} {...room} selected={form.roomType === room.value} onSelect={(v) => handleChange("roomType", v)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-heading font-bold text-foreground text-2xl mb-6">Guest Information</h2>
                    <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input id="fullName" placeholder="John Doe" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} maxLength={100} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} maxLength={255} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={20} />
                        </div>
                        <div className="space-y-2">
                          <Label>Number of Guests</Label>
                          <Select value={form.guests} onValueChange={(v) => handleChange("guests", v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((n) => (
                                <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checkIn">Check-in Date *</Label>
                          <Input id="checkIn" type="date" value={form.checkIn} min={today} onChange={(e) => handleChange("checkIn", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkOut">Check-out Date *</Label>
                          <Input id="checkOut" type="date" value={form.checkOut} min={form.checkIn || today} onChange={(e) => handleChange("checkOut", e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea id="specialRequests" placeholder="Any special requirements or requests..." value={form.specialRequests} onChange={(e) => handleChange("specialRequests", e.target.value)} maxLength={500} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-heading font-bold text-foreground text-2xl mb-6">Review Your Booking</h2>
                    <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
                      {selectedRoom && (
                        <div className="flex gap-4 items-center">
                          <img src={selectedRoom.image} alt={selectedRoom.label} className="w-24 h-20 rounded-lg object-cover" loading="lazy" />
                          <div>
                            <h3 className="font-heading font-bold text-foreground">{selectedRoom.label}</h3>
                            <p className="text-sm text-muted-foreground">{selectedRoom.size} · Up to {selectedRoom.maxGuests} guests</p>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {[
                          ["Full Name", form.fullName],
                          ["Email", form.email],
                          ["Phone", form.phone],
                          ["Guests", form.guests],
                          ["Check-in", form.checkIn ? new Date(form.checkIn + "T00:00:00").toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : ""],
                          ["Check-out", form.checkOut ? new Date(form.checkOut + "T00:00:00").toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : ""],
                        ].map(([label, val]) => (
                          <div key={label} className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-medium text-foreground">{val}</span>
                          </div>
                        ))}
                      </div>
                      {form.specialRequests && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Special Requests:</span>
                          <p className="mt-1 text-foreground">{form.specialRequests}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted text-sm text-muted-foreground">
                        <Coffee className="w-4 h-4 shrink-0" />
                        <span>Complimentary breakfast included with your stay.</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => goTo(step - 1)} className="font-heading">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                ) : <div />}
                {step < 3 && (
                  <Button onClick={() => goTo(step + 1)} disabled={!canProceed(step)} className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="hidden lg:block">
              <BookingSummary
                roomLabel={selectedRoom?.label || ""}
                roomPrice={selectedRoom?.price || 0}
                nights={nights}
                checkIn={form.checkIn}
                checkOut={form.checkOut}
                guests={form.guests}
                totalAmount={totalAmount}
                onPay={handlePayment}
                loading={loading}
                disabled={!canProceed(2)}
                step={step}
              />
            </div>
          </div>

          {/* Mobile Summary */}
          {selectedRoom && nights > 0 && step === 3 && (
            <div className="lg:hidden mt-8">
              <BookingSummary
                roomLabel={selectedRoom.label}
                roomPrice={selectedRoom.price}
                nights={nights}
                checkIn={form.checkIn}
                checkOut={form.checkOut}
                guests={form.guests}
                totalAmount={totalAmount}
                onPay={handlePayment}
                loading={loading}
                disabled={!canProceed(2)}
                step={step}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BookCalebsApartments;
