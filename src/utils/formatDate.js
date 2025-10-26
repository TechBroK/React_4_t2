export function formatDate(ts) {
  const d = ts ? new Date(ts) : new Date()
  return d.toLocaleString()
}
