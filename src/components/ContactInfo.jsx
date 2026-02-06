import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function ContactInfo() {
  return (
    <section className="contact-triangle">
      <div className="contact-triangle-layout">
        {/* LEFT: heading */}
        <div className="contact-triangle-left">
          <h2 className="contact-triangle-title">Contact Us Today!</h2>
        </div>

        {/* RIGHT: the “triangle” items */}
        <div className="contact-triangle-right">
          <div className="contact-triangle-row">
            <div className="contact-triangle-item">
              <FaPhone className="contact-icon" />
              <p>+1 (540) 667-6300</p>
            </div>
            <div className="contact-triangle-item">
              <FaEnvelope className="contact-icon" />
              <p>bellview.winchester@gmail.com</p>
            </div>
          </div>

          <div className="contact-triangle-single">
            <div className="contact-triangle-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>5O Bellview Ave, Winchester, VA, 22601</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;

/*import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


function ContactInfo() {
  return (
    <section className="contact-triangle">
      <h2 className="contact-triangle-title">Contact Us Today!</h2>

      <div className="contact-triangle-row">
        <div className="contact-triangle-item">
          <FaPhone className="contact-icon" />
          <p>+1 (123) 456-7890</p>
        </div>
        <div className="contact-triangle-item">
          <FaEnvelope className="contact-icon" />
          <p>info@example.com</p>
        </div>
      </div>

      <div className="contact-triangle-single">
        <div className="contact-triangle-item">
          <FaMapMarkerAlt className="contact-icon" />
          <p>123 Main St, City, State</p>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;*/
