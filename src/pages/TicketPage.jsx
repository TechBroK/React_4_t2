import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'
import '../styles/tickets.css'

export default function TicketPage() {
  const { id } = useParams()
  const { getTicketById } = useTickets()
  const ticket = getTicketById(id)

  if (!ticket) return <p>Ticket not found</p>

  const statusClass = (ticket.status || '').toLowerCase()

  return (
    <article className={`page-ticket ${statusClass}`}>
      <div className="ticket-card-header">
        <div>
          <h1 className="ticket-title">{ticket.title}</h1>
          <div className="ticket-meta">
            <span className={`badge status ${statusClass}`}>{ticket.status}</span>
            <span style={{ marginLeft: 8 }} className={`badge priority ${ticket.priority?.toLowerCase()}`}>{ticket.priority}</span>
          </div>
        </div>
        <div>
          <Link to="/dashboard" className="btn ghost small">Back</Link>
        </div>
      </div>

      <div className="ticket-card-body">
        <p className="ticket-desc">{ticket.description}</p>
      </div>
    </article>
  )
}
