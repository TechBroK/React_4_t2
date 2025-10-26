import React, { useState } from 'react'
import { useTickets } from '../hooks/useTickets'
import TicketForm from '../components/TicketForm'
import TicketList from '../components/TicketList'
import { useNotification } from '../context/NotificationContext'

export default function TicketManagement() {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets()
  const { show } = useNotification()

  const [editingId, setEditingId] = useState(null)

  const handleCreate = (payload) => {
    try {
      createTicket(payload)
      show('Ticket created')
    } catch (err) {
      show(err.message)
    }
  }

  const handleUpdate = (id) => (payload) => {
    try {
      updateTicket(id, payload)
      setEditingId(null)
      show('Ticket updated')
    } catch (err) {
      show(err.message)
    }
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this ticket?')) return
    deleteTicket(id)
    show('Ticket deleted')
  }

  return (
    <main className="page-dashboard container" style={{maxWidth: 1440, margin: '0 auto'}}>
      <h1>Ticket Management</h1>

      <section style={{marginBottom: 20}}>
        <h2>Create ticket</h2>
        <TicketForm onSubmit={handleCreate} />
      </section>

      <section>
        <h2>Existing tickets</h2>
        <div className="ticket-management-grid">
          {tickets.map((t) => (
            <div key={t.id} className="ticket-card">
              {editingId === t.id ? (
                <TicketForm initial={t} onSubmit={handleUpdate(t.id)} submitLabel="Update" />
              ) : (
                <>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                  <small>{t.status} • {t.priority}</small>
                  <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                    <button onClick={() => setEditingId(t.id)} className="btn">Edit</button>
                    <button onClick={() => handleDelete(t.id)} className="btn ghost">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
