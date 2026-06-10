import { useRef, useState } from "react";
import { Upload, FileCheck2, Loader2, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface ExtractedIdInfo {
  fullName?: string;
  idType?: string;
  idNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  expiryDate?: string;
}

interface Props {
  onExtracted: (info: ExtractedIdInfo) => void;
  extracted: ExtractedIdInfo | null;
}

const IdVerificationStep = ({ onExtracted, extracted }: Props) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image of your ID (JPG, PNG).", variant: "destructive" });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum size is 8MB.", variant: "destructive" });
      return;
    }

    setFileName(file.name);
    setLoading(true);
    try {
      const dataUrl = await fileToBase64(file);
      setPreview(dataUrl);

      const { data, error } = await supabase.functions.invoke("extract-id-info", {
        body: { imageBase64: dataUrl, mimeType: file.type },
      });

      if (error || !data?.success) {
        const msg = data?.error === "not_an_id"
          ? "We couldn't recognize this as a valid ID. Please upload a clearer photo."
          : data?.error || error?.message || "Extraction failed. Try a clearer photo.";
        toast({ title: "ID verification failed", description: msg, variant: "destructive" });
        return;
      }

      onExtracted(data.data as ExtractedIdInfo);
      toast({ title: "ID verified ✓", description: "Your details have been pre-filled for you." });
    } catch (e) {
      toast({ title: "Upload failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFileName("");
    onExtracted({});
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <h2 className="font-heading font-bold text-foreground text-2xl mb-2">Verify Your Identity</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Upload a clear photo of a valid government-issued ID (Passport, Driver's License, National ID, or Voter's Card).
        Your details will be extracted automatically.
      </p>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
        {!preview ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary hover:bg-muted/40 transition-colors"
          >
            <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-heading font-semibold text-foreground">Click to upload ID</p>
            <p className="text-xs text-muted-foreground mt-1">JPG or PNG, up to 8MB</p>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img src={preview} alt="ID preview" className="w-full md:w-48 h-auto rounded-lg border border-border object-cover" />
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 text-sm">
                  <FileCheck2 className="w-4 h-4 text-gold" />
                  <span className="font-medium text-foreground truncate">{fileName}</span>
                </div>
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" /> Extracting information…
                  </div>
                )}
                {!loading && extracted?.fullName && (
                  <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                    <div className="flex items-center gap-1.5 text-gold font-semibold mb-2">
                      <ShieldCheck className="w-4 h-4" /> Verified
                    </div>
                    {extracted.fullName && <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{extracted.fullName}</span></div>}
                    {extracted.idType && <div><span className="text-muted-foreground">Type:</span> <span className="text-foreground font-medium">{extracted.idType}</span></div>}
                    {extracted.idNumber && <div><span className="text-muted-foreground">ID No:</span> <span className="text-foreground font-medium">{extracted.idNumber}</span></div>}
                    {extracted.dateOfBirth && <div><span className="text-muted-foreground">DOB:</span> <span className="text-foreground font-medium">{extracted.dateOfBirth}</span></div>}
                    {extracted.nationality && <div><span className="text-muted-foreground">Nationality:</span> <span className="text-foreground font-medium">{extracted.nationality}</span></div>}
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={reset} disabled={loading} className="mt-2">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Upload a different ID
                </Button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        <p className="text-xs text-muted-foreground">
          🔒 Your ID is processed securely for verification only and is not stored permanently.
        </p>
      </div>
    </div>
  );
};

export default IdVerificationStep;
