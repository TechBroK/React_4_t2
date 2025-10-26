import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTickets } from '../hooks/useTickets'
import { useNotification } from '../context/NotificationContext'
import TicketForm from './TicketForm'

export default function TicketItem({ ticket, index }) {
  const { updateTicket, deleteTicket } = useTickets()
  const { show } = useNotification()
  const [editing, setEditing] = useState(false)

  if (!ticket) return null

  const handleDelete = () => {
    if (!confirm('Delete this ticket?')) return
    deleteTicket(ticket.id)
    show('Ticket deleted')
  }

  const handleUpdate = (payload) => {
    updateTicket(ticket.id, payload)
    setEditing(false)
    show('Ticket updated')
  }

  return (
    <>
      <tr className="ticket-row">
        <td>{index}</td>
        <td>
          <Link to={`/tickets/${ticket.id}`} className="no-deco-link">{ticket.title}</Link>
        </td>
        <td className="muted desc-cell">{ticket.description}</td>
        <td>
          <span className={`badge priority ${ticket.priority?.toLowerCase()}`}>{ticket.priority}</span>
        </td>
        <td>
          {(() => {
            const s = ticket.status || ''
            const cls = s.toLowerCase()
            const label = s === 'in_progress' ? 'In Progress' : (s.charAt(0).toUpperCase() + s.slice(1))
            return <span className={`badge status ${cls}`}>{label}</span>
          })()}
        </td>
        <td>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <button onClick={() => setEditing(true)} className="btn small">Edit</button>
            <button onClick={handleDelete} className="btn ghost small">Delete</button>
            {/* Completed / History action: show green tick to mark completed */}
            {ticket.status !== 'closed' && (
              <button
                className="complete-icon"
                aria-label="Mark completed"
                title="Mark completed"
                onClick={() => {
                  if (!confirm('Mark this ticket as completed?')) return
                  updateTicket(ticket.id, { status: 'closed' })
                  show('Ticket marked closed', { type: 'success' })
                }}
              >
                ✓
              </button>
            )}
          </div>
        </td>
      </tr>

      {editing && (
        <tr className="ticket-edit-row">
          <td colSpan={6}>
            <TicketForm initial={ticket} onSubmit={handleUpdate} submitLabel="Update" onCancel={() => setEditing(false)} />
          </td>
        </tr>
      )}
    </>
  )
}
