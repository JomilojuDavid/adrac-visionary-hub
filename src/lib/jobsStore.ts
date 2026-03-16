export interface JobPosting {
  id: string;
  title: string;
  roleDetails: string;
  requirements: string;
  applicationEmail: string;
  postedAt: string;
  recruiterName: string;
  recruiterCompany: string;
}

const STORAGE_KEY = "adrac_job_postings";

export const getJobs = (): JobPosting[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addJob = (job: Omit<JobPosting, "id" | "postedAt">): JobPosting => {
  const jobs = getJobs();
  const newJob: JobPosting = {
    ...job,
    id: crypto.randomUUID(),
    postedAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  return newJob;
};

export const getJobById = (id: string): JobPosting | undefined => {
  return getJobs().find((j) => j.id === id);
};
