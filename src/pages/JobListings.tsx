import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Briefcase, Calendar, Building2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { getJobs } from "@/lib/jobsStore";

const JobListings = () => {
  const jobs = getJobs();

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Job Openings</h1>
              <p className="text-muted-foreground mt-1">Browse current opportunities from our network of recruiters.</p>
            </div>
            <Link
              to="/jobs/post"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-2.5 rounded-lg transition-all hover:scale-105 text-sm"
            >
              Post a Job
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-xl border border-border">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">No job openings yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Be the first to post a job opening on the ADRAC Job Board.</p>
              <Link
                to="/jobs/post"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-cta-foreground font-heading font-semibold px-6 py-2.5 rounded-lg transition-all text-sm"
              >
                Post a Job Opening
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
                >
                  <h3 className="text-lg font-heading font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    {job.recruiterCompany && (
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {job.recruiterCompany}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(job.postedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{job.roleDetails}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-heading font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default JobListings;
