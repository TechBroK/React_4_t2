

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

let store = [
  { id: '1', title: 'Sample bug', description: 'Something is broken', status: 'Open', priority: 'High' },
  { id: '2', title: 'Feature request', description: 'Add dark mode', status: 'Open', priority: 'Medium' }
]

export async function fetchTickets() {
  await delay()
  return [...store]
}

export async function createTicket(payload) {
  await delay()
  const t = { id: Date.now().toString(), status: 'Open', ...payload }
  store = [t, ...store]
  return t
}

export async function fetchTicketById(id) {
  await delay()
  return store.find((s) => s.id === id) || null
}
