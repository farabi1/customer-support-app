import { useState } from 'react'

const defaultForm = {
  title: '',
  description: '',
  customer: '',
  priority: 'MEDIUM',
  status: 'Open',
}

function NewTicketModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    if (!form.customer.trim()) newErrors.customer = 'Customer name is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">New Ticket</h2>
          <button type="button" className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Issue Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={`form-input${errors.title ? ' form-input--error' : ''}`}
              placeholder="e.g. Login Issues - Can't Access Account"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className={`form-input form-textarea${errors.description ? ' form-input--error' : ''}`}
              placeholder="Describe the customer's problem in detail..."
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer" className="form-label">Customer Name</label>
            <input
              id="customer"
              name="customer"
              type="text"
              className={`form-input${errors.customer ? ' form-input--error' : ''}`}
              placeholder="e.g. John Smith"
              value={form.customer}
              onChange={handleChange}
            />
            {errors.customer && <span className="form-error">{errors.customer}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                className="form-input form-select"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-input form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="In-Progress">In-Progress</option>
              </select>
            </div>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTicketModal
