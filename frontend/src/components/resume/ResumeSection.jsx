function ResumeSection({ children, className = '', title }) {
  if (!children) {
    return null;
  }

  return (
    <section className={className}>
      {title ? <h3 className="resume-section-title">{title}</h3> : null}
      {children}
    </section>
  );
}

export default ResumeSection;
