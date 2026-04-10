import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

function Contact() {
  const [status, setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      setStatus("success")
      e.target.reset()
    } else {
      setStatus("error")
    }
  }

  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Web3Forms hidden fields */}
        <input
          type="hidden"
          name="access_key"
          value="dab76883-20e4-406a-9814-5971416a18b4"
        />
        <input
          type="hidden"
          name="subject"
          value="New Contact Form Submission"
        />

        {/* Row 1 */}
        <div className="form-row">
          <input type="text" name="first_name" placeholder="First Name" className="form-input" required />
          <input type="text" name="last_name" placeholder="Last Name" className="form-input" required />
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Your message..."
          className="form-textarea"
          rows="5"
          required
        ></textarea>

        {/* Row 3 */}
        <div className="form-row">
          <input type="email" name="email" placeholder="Email" className="form-input" required />
          <input type="tel" name="phone" placeholder="Phone Number" className="form-input" />
        </div>

        {/* Submit */}
        <button className="apply-btn contact-btn" type="submit">
          Send Message
        </button>

        {/* ✅ Success / Error message */}
        {status === "success" && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  )
}

export default Contact

