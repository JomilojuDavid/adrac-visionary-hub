import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Briefcase, Users, Search, FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getJobs } from "@/lib/jobsStore";

const Careers = () => {
  const jobCount = getJobs().length;

  return (
    <Layout>
      <Helmet>
        <title>Careers & Job Board | ADRAC Consulting</title>
        <meta
          name="description"
          content="ADRAC Careers — recruiters post job openings and job seekers browse and apply to opportunities across finance, audit, tax and compliance."
        />
      </Helmet>

      <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.18),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="inline-flex items-center gap-2 bg-primary-foreground/15 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wide mb-5 backdrop-blur-sm">
            <Briefcase className="w-3.5 h-3.5" /> ADRAC Job Board
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Careers at ADRAC & Beyond
          </h1>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto">
            One place where organisations find qualified professionals and candidates find their next
            role. Choose the path that fits you.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:shadow-lg hover:border-primary/30 transition-all">
            <div className="w-14 h-14 rounded-full bg-cta/10 flex items-center justify-center mb-5">
              <Users className="w-7 h-7 text-cta" />
            </div>
            <h2 className="text-xl font-heading font-bold text-card-foreground mb-2">I'm a Recruiter</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Publish your vacancy to our professional network. Add the role details, requirements and the
              email address applicants should send their CVs to.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-cta mt-0.5" /> Free job posting</li>
              <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-cta mt-0.5" /> Applications straight to your inbox</li>
              <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-cta mt-0.5" /> Visible instantly to job seekers</li>
            </ul>
            <Link
              to="/jobs/post"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
            >
              Post a Job Opening <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:shadow-lg hover:border-primary/30 transition-all">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Search className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-card-foreground mb-2">I'm a Job Seeker</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Browse open roles from our network of recruiters and apply directly with your CV.
              {jobCount > 0 && (
                <span className="block mt-2 font-medium text-foreground">
                  {jobCount} opening{jobCount === 1 ? "" : "s"} currently listed.
                </span>
              )}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-start gap-2"><Briefcase className="w-4 h-4 text-primary mt-0.5" /> Roles in finance, audit, tax & compliance</li>
              <li className="flex items-start gap-2"><Briefcase className="w-4 h-4 text-primary mt-0.5" /> Clear requirements on every listing</li>
              <li className="flex items-start gap-2"><Briefcase className="w-4 h-4 text-primary mt-0.5" /> Apply by email in one click</li>
            </ul>
            <Link
              to="/jobs"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
            >
              Browse Job Openings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
