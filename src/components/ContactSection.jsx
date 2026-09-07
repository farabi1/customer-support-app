import { useState } from 'react'
import { toast } from 'react-toastify'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  category: 'Technical Support',
  priority: 'Normal',
  message: '',
}

function ContactSection({ onNewTicketFromContact }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please provide your full name'
    if (!form.email.trim()) {
      errs.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) {
      errs.message = 'Please provide details about your inquiry'
    } else if (form.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setSubmitted(true)

    // Also optionally pipe into active tickets if handler is provided
    if (onNewTicketFromContact) {
      onNewTicketFromContact({
        title: form.subject,
        description: `[Contact Form - ${form.category}] ${form.message}`,
        customer: form.name,
        priority: form.priority === 'Urgent' ? 'HIGH' : form.priority === 'Normal' ? 'MEDIUM' : 'LOW',
        status: 'Open',
      })
    }

    toast.success('Your message has been received! A support ticket was registered.', {
      position: 'top-right',
      autoClose: 4000,
    })
  }

  function handleReset() {
    setForm(initialForm)
    setSubmitted(false)
    setErrors({})
  }

  function copyEmail() {
    navigator.clipboard?.writeText('support@cst.com')
    setCopiedEmail(true)
    toast.info('Copied support@cst.com to clipboard!')
    setTimeout(() => setCopiedEmail(false), 3000)
  }

  return (
    <section className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <span className="page-badge">Get in Touch</span>
          <h1 className="page-title">Contact Customer Support</h1>
          <p className="page-subtitle">
            Have a question, encountered an issue, or need custom integration help? Send us a message and our team will get right back to you.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <div className="contact-success-icon">✓</div>
                <h3 className="success-title">Message Sent Successfully</h3>
                <p className="success-desc">
                  Thank you, <strong>{form.name}</strong>! We have logged your request under <em>&ldquo;{form.subject}&rdquo;</em>.
                  A support specialist will reach out to <strong>{form.email}</strong> within 2 business hours.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleReset}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="contact-form-title">Send a Direct Support Message</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="e.g. Alex Morgan"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value })
                        if (errors.name) setErrors({ ...errors, name: '' })
                      }}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      placeholder="e.g. alex@company.com"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: '' })
                      }}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-category" className="form-label">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-category"
                      className="form-input form-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="Technical Support">Technical Support</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Suggestion">Feature Suggestion</option>
                      <option value="Billing & Subscription">Billing & Subscription</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-priority" className="form-label">
                      Urgency
                    </label>
                    <select
                      id="contact-priority"
                      className="form-input form-select"
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                      <option value="Normal">Normal — Standard response</option>
                      <option value="Urgent">Urgent — System blocked</option>
                      <option value="Low">Low — General inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                    placeholder="Brief summary of your request"
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value })
                      if (errors.subject) setErrors({ ...errors, subject: '' })
                    }}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message Details <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Please explain the issue or question in detail. Include any reproduction steps or error codes."
                    rows="5"
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: '' })
                    }}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <div className="contact-form-actions">
                  <button type="submit" className="btn-submit">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Channels & Details */}
          <div className="contact-info-cards">
            {/* Email Card */}
            <div className="info-card">
              <div className="info-card__icon">✉️</div>
              <div className="info-card__details">
                <h3 className="info-card__title">Direct Email Support</h3>
                <p className="info-card__text">
                  Email our support queue directly. Tickets are auto-created upon receipt.
                </p>
                <div className="email-copy-row">
                  <span className="email-highlight">support@cst.com</span>
                  <button
                    type="button"
                    className="btn-copy-small"
                    onClick={copyEmail}
                  >
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="info-card">
              <div className="info-card__icon">🕒</div>
              <div className="info-card__details">
                <h3 className="info-card__title">Hours of Operation</h3>
                <p className="info-card__text">
                  Monday to Friday: <strong>9:00 AM – 6:00 PM EST</strong>
                  <br />
                  Weekends & Holidays: <strong>Emergency on-call triage only</strong>
                </p>
                <span className="support-status-badge">
                  <span className="pulse-dot"></span> Team Online
                </span>
              </div>
            </div>

            {/* SLA Response Guarantee */}
            <div className="info-card">
              <div className="info-card__icon">⚡</div>
              <div className="info-card__details">
                <h3 className="info-card__title">Average Response Times</h3>
                <p className="info-card__text">
                  • Critical / High Priority: <strong>&lt; 30 minutes</strong>
                  <br />
                  • Standard Inquiries: <strong>&lt; 2 hours</strong>
                  <br />
                  • General Inquiries: <strong>Same business day</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
