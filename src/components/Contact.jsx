import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <form
        className="contact-form"
        action="https://api.web3forms.com/submit"
        method="POST"
      >
        {/* Web3Forms hidden fields */}
        <input
          type="hidden"
          name="access_key"
          value="250d37f4-0c4c-4868-a2a4-4acae3799bad"
        />
        <input type="hidden" name="subject" value="New Contact Form Submission" />
        <input type="hidden" name="redirect" value="https://www.serebii.net/pokedex-rs/121.shtml" />

        {/* Row 1: first + last name */}
        <div className="form-row">
          <input type="text" name="first_name" placeholder="First Name" className="form-input" required />
          <input type="text" name="last_name" placeholder="Last Name" className="form-input" required />
        </div>

        {/* Message box */}
        <textarea
          name="message"
          placeholder="Your message..."
          className="form-textarea"
          rows="5"
          required
        ></textarea>

        {/* Row 3: email + phone */}
        <div className="form-row">
          <input type="email" name="email" placeholder="Email" className="form-input" required />
          <input type="tel" name="phone" placeholder="Phone Number" className="form-input" />
        </div>

        {/* Submit button */}
        <button className="apply-btn contact-btn" type="submit">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;


