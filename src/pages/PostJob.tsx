import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addJob } from "@/lib/jobsStore";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: "",
    roleDetails: "",
    requirements: "",
    applicationEmail: "",
    recruiterName: "",
    recruiterCompany: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.roleDetails || !form.requirements || !form.applicationEmail) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    addJob(form);
    toast({ title: "Job posted successfully!", description: "Your opening is now visible to job seekers." });
    navigate("/jobs");
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="max-w-2xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Post a Job Opening</h1>
          <p className="text-muted-foreground mb-8">Fill in the details below to list your job opening on the ADRAC Job Board.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recruiterName">Your Name</Label>
                <Input id="recruiterName" placeholder="Full name" value={form.recruiterName} onChange={(e) => update("recruiterName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recruiterCompany">Company</Label>
                <Input id="recruiterCompany" placeholder="Company name" value={form.recruiterCompany} onChange={(e) => update("recruiterCompany", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input id="title" placeholder="e.g. Senior Financial Analyst" value={form.title} onChange={(e) => update("title", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleDetails">Job Role & Details *</Label>
              <Textarea id="roleDetails" placeholder="Describe the role, responsibilities, location, salary range etc." rows={5} value={form.roleDetails} onChange={(e) => update("roleDetails", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Job Requirements *</Label>
              <Textarea id="requirements" placeholder="List qualifications, experience, skills required..." rows={4} value={form.requirements} onChange={(e) => update("requirements", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationEmail">Application Email *</Label>
              <Input id="applicationEmail" type="email" placeholder="hr@company.com" value={form.applicationEmail} onChange={(e) => update("applicationEmail", e.target.value)} required />
              <p className="text-xs text-muted-foreground">Applicants will be instructed to send their CV to this email with the job title as the subject.</p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 w-full justify-center"
            >
              <Send className="w-4 h-4" /> Post Job Opening
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default PostJob;
