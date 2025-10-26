import React, { createContext, useEffect, useState } from 'react'

export const TicketContext = createContext(null)

const initialMock = [
  { id: '1', title: 'Sample bug', description: 'Something is broken', status: 'open', priority: 'High' },
  { id: '2', title: 'Feature request', description: 'Add dark mode', status: 'in_progress', priority: 'Medium' }
]

export function TicketProvider({ children }) {
  const STORAGE_KEY = 'tf:tickets:v1'

  const [tickets, setTickets] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {
      // ignore parse errors and fall back to mock
    }
    return initialMock
  })

  // persist tickets to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
    } catch (e) {
      // fail silently (storage might be full or denied)
    }
  }, [tickets])

  const createTicket = (payload) => {
    const allowed = ['open', 'in_progress', 'closed']
    const status = (payload.status && allowed.includes(payload.status)) ? payload.status : 'open'
    const t = { id: Date.now().toString(), status, ...payload }
    setTickets((s) => [t, ...s])
    return t
  }

  const updateTicket = (id, patch) => {
    let updated = null
    setTickets((s) => s.map((t) => {
      if (t.id === id) {
        // sanitize status if present
        const allowed = ['open', 'in_progress', 'closed']
        const next = { ...t, ...patch }
        if (patch.status && !allowed.includes(patch.status)) {
          // ignore invalid status changes
          return t
        }
        updated = next
        return next
      }
      return t
    }))
    return updated
  }

  const deleteTicket = (id) => {
    setTickets((s) => s.filter((t) => t.id !== id))
  }

  const getTicketById = (id) => tickets.find((t) => t.id === id) || null

  return (
    <TicketContext.Provider value={{ tickets, createTicket, updateTicket, deleteTicket, getTicketById }}>
      {children}
    </TicketContext.Provider>
  )
}
