import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Wifi, Car, Shield, Coffee, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import CalebsLayout from "@/components/layout/CalebsLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import RoomCard from "@/components/booking/RoomCard";
import BookingSummary from "@/components/booking/BookingSummary";
import StepIndicator from "@/components/booking/StepIndicator";
import IdVerificationStep, { ExtractedIdInfo } from "@/components/booking/IdVerificationStep";
import apartmentsImage from "@/assets/calebs-apartments.jpg";
import studioImg from "@/assets/rooms/studio.jpg";
import oneBedImg from "@/assets/rooms/one-bed.jpg";
import twoBedImg from "@/assets/rooms/two-bed.jpg";
import executiveImg from "@/assets/rooms/executive.jpg";

const calebsThreeBedImg = "https://lh3.googleusercontent.com/pw/AP1GczNGA4J08VvvKkP1J6NRNH5X61I6dz_lZXpqJsK39qZExg0P2KFaLyeQ-2nkzhCmiCOkj2KCTzye6e9MUZhaRDgWIutzhfRLrORQxJ2j_WTTbUhkRdU5BCWr9nApp9rWPlRFQzhNo9spoQKouxiQL6KvFw=w1164-h524-s-no-gm?authuser=0";
const calebsTwoBedImg = "https://lh3.googleusercontent.com/pw/AP1GczMYnHXlydUYNxn4jMM00pino2lpHFoDgVocI8lyVey4lhDqv0qP0XGSgQJstvdMjHEuDBEwg1exVZwutVrMPjAfSj1C1PYW0uxRWTsU58-1H8IUNf4ugffnuU1EWt8bmWxKuy_L05C7OX87H9hQq834Ww=w1164-h525-s-no-gm?authuser=0";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_PUBLIC_KEY = "pk_live_478b54a25ef0c1f91edf804a2afb6348d4fe9c9a";

const roomTypes = [
  // Caleb's House
  {
    value: "calebs-3bed", house: "Caleb's House", label: "3 Bedroom", price: 130000, image: calebsThreeBedImg,
    description: "Expansive three-bedroom apartment perfect for families or group stays with premium finishes.",
    maxGuests: 6, size: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "Dining Area"],
  },
  {
    value: "calebs-2bed", house: "Caleb's House", label: "2 Bedroom", price: 100000, image: calebsTwoBedImg,
    description: "Spacious two-bedroom layout ideal for families or colleagues travelling together.",
    maxGuests: 4, size: "80 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "Balcony"],
  },
  {
    value: "calebs-1bed-exec", house: "Caleb's House", label: "1 Bedroom Executive", price: 55000, image: executiveImg,
    description: "Elegantly appointed one-bedroom apartment with executive-level comfort and style.",
    maxGuests: 2, size: "55 m²", features: ["King Bed", "Work Desk", "Smart TV", "Kitchenette"],
  },
  {
    value: "calebs-1bed-deluxe", house: "Caleb's House", label: "1 Bedroom Deluxe", price: 45000, image: oneBedImg,
    description: "Well-furnished deluxe one-bedroom apartment with enhanced amenities and comfort.",
    maxGuests: 2, size: "48 m²", features: ["Queen Bed", "Kitchenette", "WiFi", "Smart TV"],
  },
  {
    value: "calebs-1bed-std", house: "Caleb's House", label: "1 Bedroom Standard", price: 35000, image: studioImg,
    description: "Comfortable and affordable one-bedroom apartment for practical stays.",
    maxGuests: 2, size: "40 m²", features: ["Queen Bed", "Kitchenette", "WiFi", "Work Desk"],
  },
  // Arnold House
  {
    value: "arnold-2bed", house: "Arnold House", label: "2 Bedroom", price: 50000, image: twoBedImg,
    description: "Spacious two-bedroom apartment ideal for families or colleagues at great value.",
    maxGuests: 4, size: "75 m²", features: ["2 Bedrooms", "Living Room", "Kitchen", "Balcony"],
  },
  {
    value: "arnold-1bed", house: "Arnold House", label: "1 Bedroom", price: 25000, image: studioImg,
    description: "Comfortable one-bedroom apartment with all essential amenities at an affordable rate.",
    maxGuests: 2, size: "38 m²", features: ["Queen Bed", "Kitchenette", "WiFi", "Smart TV"],
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
  const [idInfo, setIdInfo] = useState<ExtractedIdInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIdExtracted = (info: ExtractedIdInfo) => {
    if (!info || Object.keys(info).length === 0) {
      setIdInfo(null);
      return;
    }
    setIdInfo(info);
    if (info.fullName) {
      setForm((prev) => ({ ...prev, fullName: info.fullName || prev.fullName }));
    }
  };

  const selectedRoom = roomTypes.find((r) => r.value === form.roomType);
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000))
    : 0;
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = (s: number) => {
    if (s === 1) return !!form.roomType;
    if (s === 2) return !!(idInfo && Object.keys(idInfo).length > 0);
    if (s === 3) return !!(form.fullName.trim() && form.email.trim() && form.phone.trim() && form.checkIn && form.checkOut && nights > 0);
    return true;
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = () => {
    if (PAYSTACK_PUBLIC_KEY.startsWith("pk_test_xxxx")) {
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
        (async () => {
          const { data, error } = await supabase.functions.invoke("verify-paystack", {
            body: {
              reference: response.reference,
              payload: {
                type: "booking",
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                roomType: form.roomType,
                roomLabel: selectedRoom?.label,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
                guests: form.guests,
                nights,
                specialRequests: form.specialRequests,
              },
            },
          });
          setLoading(false);
          if (error || !data?.verified) {
            toast({ title: "Payment Verification Failed", description: error?.message || "Please contact support with your reference.", variant: "destructive" });
            return;
          }
          toast({ title: "Booking Confirmed! 🎉", description: `Payment verified. Ref: ${response.reference}. Confirmation sent to ${form.email}.` });
          setForm({ fullName: "", email: "", phone: "", roomType: "", checkIn: "", checkOut: "", guests: "1", specialRequests: "" });
          setIdInfo(null);
          setStep(1);
        })();
      },
      onClose: () => { setLoading(false); toast({ title: "Payment Cancelled", description: "Your booking has not been confirmed." }); },
    });
    handler.openIframe();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <CalebsLayout>
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
                    <div className="space-y-10">
                      {["Caleb's House", "Arnold House"].map((house) => (
                        <div key={house}>
                          <div className="flex items-center gap-3 mb-4">
                            <h3 className="font-heading font-bold text-xl text-foreground">{house}</h3>
                            <div className="flex-1 h-px bg-border" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {roomTypes.filter((r) => r.house === house).map((room) => (
                              <RoomCard key={room.value} {...room} selected={form.roomType === room.value} onSelect={(v) => handleChange("roomType", v)} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <IdVerificationStep onExtracted={handleIdExtracted} extracted={idInfo} />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-heading font-bold text-foreground text-2xl mb-2">Guest Information</h2>
                    <p className="text-sm text-muted-foreground mb-6">We've pre-filled your name from your verified ID. Please complete the remaining details.</p>
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
                      {idInfo && (
                        <div className="rounded-lg bg-muted/40 border border-border p-3 text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">Verified ID on file:</span> {idInfo.idType} {idInfo.idNumber ? `• ${idInfo.idNumber}` : ""}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-heading font-bold text-foreground text-2xl mb-6">Review Your Booking</h2>
                    <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
                      {selectedRoom && (
                        <div className="flex gap-4 items-center">
                          <img src={selectedRoom.image} alt={selectedRoom.label} className="w-24 h-20 rounded-lg object-cover" loading="lazy" />
                          <div>
                            <p className="text-xs text-gold font-semibold uppercase tracking-wide">{selectedRoom.house}</p>
                            <h3 className="font-heading font-bold text-foreground">{selectedRoom.label}</h3>
                            <p className="text-muted-foreground">{selectedRoom.size} · Up to {selectedRoom.maxGuests} guests</p>
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
                          ...(idInfo?.idType ? [["ID Type", idInfo.idType] as [string, string]] : []),
                          ...(idInfo?.idNumber ? [["ID Number", idInfo.idNumber] as [string, string]] : []),
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
                {step < 4 && (
                  <Button onClick={() => goTo(step + 1)} disabled={!canProceed(step)} className="bg-cta hover:bg-cta/90 text-cta-foreground font-heading">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="hidden lg:block">
              <BookingSummary
                house={selectedRoom?.house || ""}
                roomLabel={selectedRoom?.label || ""}
                roomPrice={selectedRoom?.price || 0}
                nights={nights}
                checkIn={form.checkIn}
                checkOut={form.checkOut}
                guests={form.guests}
                totalAmount={totalAmount}
                onPay={handlePayment}
                loading={loading}
                disabled={!canProceed(3)}
                step={step === 4 ? 3 : 0}
              />
            </div>
          </div>

          {/* Mobile Summary */}
          {selectedRoom && nights > 0 && step === 4 && (
            <div className="lg:hidden mt-8">
              <BookingSummary
                house={selectedRoom.house}
                roomLabel={selectedRoom.label}
                roomPrice={selectedRoom.price}
                nights={nights}
                checkIn={form.checkIn}
                checkOut={form.checkOut}
                guests={form.guests}
                totalAmount={totalAmount}
                onPay={handlePayment}
                loading={loading}
                disabled={!canProceed(3)}
                step={3}
              />
            </div>
          )}
        </div>
      </section>
    </CalebsLayout>
  );
};

export default BookCalebsApartments;
