import s from "./SectionWrapper.module.css";

const SectionWrapper = ({ children }) => (
  <section className={s.section}>
    <div className={s.container}>{children}</div>
  </section>
);

export default SectionWrapper;
