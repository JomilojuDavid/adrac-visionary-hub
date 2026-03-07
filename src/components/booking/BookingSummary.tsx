import { CalendarDays, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSummaryProps {
  roomLabel: string;
  roomPrice: number;
  nights: number;
  checkIn: string;
  checkOut: string;
  guests: string;
  totalAmount: number;
  onPay: () => void;
  loading: boolean;
  disabled: boolean;
  step: number;
}

const formatDate = (d: string) => {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const BookingSummary = ({ roomLabel, roomPrice, nights, checkIn, checkOut, guests, totalAmount, onPay, loading, disabled, step }: BookingSummaryProps) => (
  <div className="bg-card rounded-xl border border-border shadow-sm p-6 sticky top-24 space-y-5">
    <h3 className="font-heading font-bold text-foreground text-lg">Booking Summary</h3>

    {roomLabel ? (
      <>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium text-foreground">{roomLabel}</span>
          </div>
          {checkIn && (
            <div className="flex items-start gap-2 text-sm">
              <CalendarDays className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="text-foreground">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="text-foreground">{formatDate(checkOut)}</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Guests</span>
            <span className="ml-auto text-foreground">{guests}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₦{roomPrice.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-heading font-bold text-foreground text-xl pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-gold">₦{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {step === 3 && (
          <Button
            onClick={onPay}
            disabled={disabled || loading}
            className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold py-6 text-base"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {loading ? "Processing..." : `Pay ₦${totalAmount.toLocaleString()}`}
          </Button>
        )}
      </>
    ) : (
      <p className="text-sm text-muted-foreground">Select a room to see pricing details.</p>
    )}
  </div>
);

export default BookingSummary;
