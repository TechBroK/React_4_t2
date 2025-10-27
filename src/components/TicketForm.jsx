import React, { useState } from 'react'

export default function TicketForm({ onSubmit, initial = {}, submitLabel = 'Save Ticket' }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [priority, setPriority] = useState(initial.priority || 'Medium')
  const [status, setStatus] = useState(initial.status || 'open')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!description.trim()) e.description = 'Description is required'
    const allowed = ['open', 'in_progress', 'closed']
    if (!status || !allowed.includes(status)) e.status = 'Please select a valid status'
    if (description && description.length > 1000) e.description = 'Description is too long (max 1000 chars)'
    const prios = ['Low', 'Medium', 'High']
    if (priority && !prios.includes(priority)) e.priority = 'Invalid priority'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length) return
  onSubmit?.({ title: title.trim(), description: description.trim(), priority, status })
    if (!initial.title) {
      setTitle('')
      setDescription('')
      setPriority('Medium')
    }
  }

  return (
    <form className="ticket-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="tf-title">Title</label>
        <input id="tf-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short descriptive title" />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </div>

      <div className="field">
        <label htmlFor="tf-desc">Description</label>
        <textarea id="tf-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or request" />
        {errors.description && <div className="field-error">{errors.description}</div>}
      </div>

      <div className="row two-cols">
        <div className="field">
          <label htmlFor="tf-priority">Priority</label>
          <select id="tf-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          {errors.priority && <div className="field-error">{errors.priority}</div>}
        </div>

        <div className="field">
          <label htmlFor="tf-status">Status</label>
          <select id="tf-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && <div className="field-error">{errors.status}</div>}
        </div>
      </div>

      <div className="field">
        <button type="submit" className="btn primary">{submitLabel}</button>
      </div>
    </form>
  )
}
