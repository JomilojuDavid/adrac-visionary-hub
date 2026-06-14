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
    id: "frc-lagos-june-2026",
    title: "FRC & ADRAC 2-Day Capacity Building – Lagos",
    date: "June 23–24, 2026",
    location: "Regency Hall, Otunba Jobi Fele Way, Alausa Ikeja, Lagos",
    type: "In-Person",
    fee: "FREE (Sponsored by the Financial Reporting Council of Nigeria)",
    description:
      "Emerging Trends in Valuation, Financial Reporting and Regulatory Oversight in Nigeria — for Finance, Audit and related professionals in both the public and private sector. Time: 9AM – 4PM daily. Tea break and lunch provided.",
    formFields: [...defaultFormFields],
  },
  {
    id: "frc-abuja-july-2026",
    title: "FRC & ADRAC 2-Day Capacity Building – Abuja",
    date: "July 7–8, 2026",
    location: "Exclusive Serene Hotel, Plot 31 Reuben Okoya Crescent, Wuye, Abuja",
    type: "In-Person",
    fee: "FREE (Sponsored by the Financial Reporting Council of Nigeria)",
    description:
      "Emerging Trends in Valuation, Financial Reporting and Regulatory Oversight in Nigeria — for Finance, Audit and related professionals in both the public and private sector. Time: 9AM – 4PM daily. Tea break and lunch provided.",
    formFields: [...defaultFormFields],
  },
  {
    id: "frc-enugu-july-2026",
    title: "FRC & ADRAC 2-Day Capacity Building – Enugu",
    date: "July 14–15, 2026",
    location:
      "William & Seraphina Events Centre, Bridge Waters Hotel, Plot C/2b Garden Avenue, adjacent ESUT Business School, GRA Enugu",
    type: "In-Person",
    fee: "FREE (Sponsored by the Financial Reporting Council of Nigeria)",
    description:
      "Emerging Trends in Valuation, Financial Reporting and Regulatory Oversight in Nigeria — for Finance, Audit and related professionals in both the public and private sector. Time: 9AM – 4PM daily. Tea break and lunch provided.",
    formFields: [...defaultFormFields],
  },
];

