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
    id: "lagos-march-2026",
    title: "ADRAC Professional Training – Lagos",
    date: "March 23–24, 2026",
    location: "Unilag Multipurpose Hall, Akoka, Lagos",
    type: "In-Person",
    description: "Two-day intensive professional development programme at the University of Lagos.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "owerri-march-2026",
    title: "ADRAC Professional Training – Owerri",
    date: "March 26–27, 2026",
    location: "Graceland Event Centre, Grand Amari Hotel, Onitsha Road, Owerri, Imo State",
    type: "In-Person",
    description: "Two-day intensive professional development programme in Owerri.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "bauchi-april-2026",
    title: "ADRAC Professional Training – Bauchi",
    date: "April 1–2, 2026",
    location: "Army Officers Mess and Suites, HQ NAAC Obienu Barracks, Kano Road, Bauchi",
    type: "In-Person",
    description: "Two-day intensive professional development programme in Bauchi.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "abuja-april-2026",
    title: "ADRAC Professional Training – Abuja",
    date: "April 20–21, 2026",
    location: "Exclusive Serene Hotel, Wuye, Abuja",
    type: "In-Person",
    description: "Two-day intensive professional development programme in Abuja.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "portharcourt-april-2026",
    title: "ADRAC Professional Training – Port Harcourt",
    date: "April 23–24, 2026",
    location: "Casoni Int'l Hotel, Stadium Road, Port Harcourt, Rivers State",
    type: "In-Person",
    description: "Two-day intensive professional development programme in Port Harcourt.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
  {
    id: "kano-april-2026",
    title: "ADRAC Professional Training – Kano",
    date: "April 28–29, 2026",
    location: "Amani Events Centre, Tamandu Road, Kano",
    type: "In-Person",
    description: "Two-day intensive professional development programme in Kano.",
    fee: "₦250,000",
    formFields: [...defaultFormFields],
  },
];
