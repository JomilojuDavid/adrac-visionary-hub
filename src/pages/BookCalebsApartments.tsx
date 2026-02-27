import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const roomTypes = [
  { value: "studio", label: "Studio Apartment", price: 25000 },
  { value: "one-bed", label: "1-Bedroom Apartment", price: 40000 },
  { value: "two-bed", label: "2-Bedroom Apartment", price: 60000 },
  { value: "executive", label: "Executive Suite", price: 85000 },
];

const BookCalebsApartments = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const selectedRoom = roomTypes.find((r) => r.value === form.roomType);

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff =
      new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.roomType &&
    form.checkIn &&
    form.checkOut &&
    nights > 0;

  const handlePayment = () => {
    if (!isFormValid) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (PAYSTACK_PUBLIC_KEY.startsWith("pk_test_xxx")) {
      toast({
        title: "Payment Not Configured",
        description:
          "Paystack payment gateway is not yet configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: totalAmount * 100, // Paystack expects kobo
      currency: "NGN",
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
        toast({
          title: "Booking Confirmed! 🎉",
          description: `Payment successful. Reference: ${response.reference}. A confirmation email will be sent to ${form.email}.`,
        });
        setForm({
          fullName: "",
          email: "",
          phone: "",
          roomType: "",
          checkIn: "",
          checkOut: "",
          guests: "1",
          specialRequests: "",
        });
      },
      onClose: () => {
        setLoading(false);
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment. Your booking has not been confirmed.",
        });
      },
    });

    handler.openIframe();
  };

  return (
    <Layout>
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4"
          >
            Book Your Stay
          </motion.h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Reserve your premium serviced apartment at Caleb's Apartments.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link
            to="/calebs-apartments"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Caleb's Apartments
          </Link>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-10">
            <SectionHeading title="Reservation Details" centered={false} />

            <div className="grid gap-6 mt-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={form.guests} onValueChange={(v) => handleChange("guests", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Room & Dates */}
              <div className="space-y-2">
                <Label>Room Type *</Label>
                <Select value={form.roomType} onValueChange={(v) => handleChange("roomType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((room) => (
                      <SelectItem key={room.value} value={room.value}>
                        {room.label} — ₦{room.price.toLocaleString()}/night
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={form.checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={form.checkOut}
                    min={form.checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requirements or requests..."
                  value={form.specialRequests}
                  onChange={(e) => handleChange("specialRequests", e.target.value)}
                  maxLength={500}
                />
              </div>

              {/* Summary */}
              {selectedRoom && nights > 0 && (
                <div className="bg-muted rounded-lg p-5 space-y-2">
                  <h3 className="font-heading font-bold text-foreground">Booking Summary</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{selectedRoom.label}</span>
                    <span>₦{selectedRoom.price.toLocaleString()}/night</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Duration</span>
                    <span>{nights} {nights === 1 ? "night" : "nights"}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-heading font-bold text-foreground text-lg">
                    <span>Total</span>
                    <span>₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={!isFormValid || loading}
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold py-6 text-lg"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {loading ? "Processing..." : `Pay ₦${totalAmount.toLocaleString()} with Paystack`}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookCalebsApartments;
