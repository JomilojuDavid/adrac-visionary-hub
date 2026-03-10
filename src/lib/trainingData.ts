export interface TrainingFormField {
  label: string;
  key: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "date" | "number";
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
}

export interface TrainingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "In-Person" | "Virtual" | "Hybrid";
  description?: string;
  fee?: string;
  /** Customisable form fields — edit per training as needed */
  formFields: TrainingFormField[];
}

/**
 * Default form fields used for all trainings.
 * Duplicate and customise per training below when needed.
 */
const defaultFormFields: TrainingFormField[] = [
  { label: "Full Name", key: "name", type: "text", required: true, placeholder: "Enter your full name" },
  { label: "Email Address", key: "email", type: "email", required: true, placeholder: "you@example.com" },
  { label: "Phone Number", key: "phone", type: "tel", required: true, placeholder: "+234 800 000 0000" },
  { label: "Organisation", key: "organisation", type: "text", required: true, placeholder: "Your company or organisation" },
  { label: "Job Title / Designation", key: "jobTitle", type: "text", required: false, placeholder: "e.g. Chief Financial Officer" },
  { label: "Additional Notes", key: "notes", type: "textarea", required: false, placeholder: "Any special requirements or questions?" },
];

export const trainingEvents: TrainingEvent[] = [
  {
    id: "ifrs-9-17-workshop",
    title: "IFRS 9 & IFRS 17 Implementation Workshop",
    date: "March 15-17, 2026",
    location: "Lagos",
    type: "In-Person",
    description: "A hands-on workshop covering practical implementation of IFRS 9 (Financial Instruments) and IFRS 17 (Insurance Contracts).",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "ipsas-certification",
    title: "IPSAS Certification Programme",
    date: "April 5-9, 2026",
    location: "Abuja",
    type: "In-Person",
    description: "Comprehensive certification programme on International Public Sector Accounting Standards.",
    fee: "₦350,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "forensic-accounting",
    title: "Forensic Accounting Masterclass",
    date: "April 22-24, 2026",
    location: "Online",
    type: "Virtual",
    description: "Advanced masterclass in forensic accounting, fraud investigation, and litigation support.",
    fee: "₦180,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance for Board Members",
    date: "May 10-11, 2026",
    location: "Lagos",
    type: "In-Person",
    description: "Equipping board members with essential governance skills and best practices.",
    fee: "₦200,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "transfer-pricing",
    title: "Transfer Pricing Compliance Workshop",
    date: "May 20-22, 2026",
    location: "Abuja",
    type: "In-Person",
    description: "Practical guidance on transfer pricing regulations, documentation, and compliance.",
    fee: "₦220,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "digital-internal-audit",
    title: "Digital Internal Audit Bootcamp",
    date: "June 3-5, 2026",
    location: "Online",
    type: "Virtual",
    description: "Leveraging technology and data analytics for modern internal audit practices.",
    fee: "₦150,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "leadership-retreat",
    title: "Leadership & Executive Education Retreat",
    date: "June 15-18, 2026",
    location: "Ogun State",
    type: "In-Person",
    description: "An immersive retreat focusing on leadership development and executive education.",
    fee: "₦400,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "data-analytics",
    title: "Data Analytics for Financial Professionals",
    date: "July 7-9, 2026",
    location: "Lagos",
    type: "Hybrid",
    description: "Building data analytics capabilities for finance and accounting professionals.",
    fee: "₦200,000",
    formFields: [...defaultFormFields],
  },
];
