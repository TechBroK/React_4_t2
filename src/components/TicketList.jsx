import React from 'react'
import TicketItem from './TicketItem'

export default function TicketList({ tickets = [] }) {
  if (!tickets || tickets.length === 0) return <p className="empty">No tickets yet.</p>

  return (
    <div className="ticket-table-wrap">
      <table className="ticket-table" role="table">
        <thead>
          <tr>
            <th style={{width: 48}}>#</th>
            <th>Title</th>
            <th style={{width: '40%'}}>Description</th>
            <th style={{width: 110}}>Priority</th>
            <th style={{width: 120}}>Status</th>
            <th style={{width: 180}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <TicketItem key={t.id} ticket={t} index={i + 1} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
