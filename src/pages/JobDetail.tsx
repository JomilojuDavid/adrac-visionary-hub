import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getJobById } from "@/lib/jobsStore";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = id ? getJobById(id) : undefined;

  if (!job) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="max-w-2xl mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">This job posting may have been removed.</p>
            <Link to="/jobs" className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-2.5 rounded-lg transition-all text-sm">
              Browse All Jobs
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const mailtoLink = `mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.title)}`;

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="max-w-2xl mx-auto px-4">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Job Listings
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{job.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            {job.recruiterCompany && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                <Building2 className="w-3.5 h-3.5" /> {job.recruiterCompany}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> Posted {new Date(job.postedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Job Role & Details</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.roleDetails}</p>
            </div>

            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Requirements</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.requirements}</p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-cta" /> How to Apply
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Send your CV to <strong className="text-foreground">{job.applicationEmail}</strong> with <strong className="text-foreground">"{job.title}"</strong> as the subject of your email.
              </p>
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" /> Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobDetail;
