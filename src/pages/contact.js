import Base from "../components/Base";
import { ContactForm } from "../components/HomePageComponent";

const Contact = () => {
  return (
    <Base title="Electronic Store / Contact Us" description={null}>
      <div className="my-5">
        <ContactForm />
      </div>
    </Base>
  );
};

export default Contact;