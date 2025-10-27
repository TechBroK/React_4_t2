import React, { useMemo, useState } from 'react'
import TicketList from '../components/TicketList'
import TicketForm from '../components/TicketForm'
import { useTickets } from '../hooks/useTickets'
import { useNotification } from '../context/NotificationContext'
import '../styles/tickets.css'

export default function Dashboard() {
  const { tickets, createTicket } = useTickets()
  const { show } = useNotification()
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const total = tickets.length
  const open = tickets.filter((t) => t.status === 'open').length
  const inProgress = tickets.filter((t) => t.status === 'in_progress').length
  const closed = tickets.filter((t) => t.status === 'closed').length

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (filterStatus !== 'All' && t.status !== filterStatus) return false
      if (!query) return true
      const q = query.toLowerCase()
      return (
        (t.title || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        (t.priority || '').toLowerCase().includes(q)
      )
    })
  }, [tickets, query, filterStatus])

  return (
  <main className="page-dashboard container">
      <h1>Tickets</h1>

      <section className="stats" style={{display: 'flex', gap: 16, marginBottom: 20}}>
        <div className="stat-card">Total<br/><strong>{total}</strong></div>
        <div className="stat-card">Open<br/><strong>{open}</strong></div>
        <div className="stat-card">In Progress<br/><strong>{inProgress}</strong></div>
        <div className="stat-card">Closed<br/><strong>{closed}</strong></div>
      </section>

      <div className="dashboard-controls">
        <div style={{ flex: 1 }}>
          <input
            className="search-input"
            aria-label="Search tickets"
            placeholder="Search title, description or priority"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <select className="status-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <TicketForm onSubmit={(p) => { createTicket(p); show('Ticket created') }} />
      <TicketList tickets={filtered} />
    </main>
  )
}
