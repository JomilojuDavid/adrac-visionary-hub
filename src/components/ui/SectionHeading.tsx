interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true, light = false }: SectionHeadingProps) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-3 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
    <div className={`w-16 h-1 bg-gold mt-4 ${centered ? "mx-auto" : ""}`} />
  </div>
);

export default SectionHeading;
