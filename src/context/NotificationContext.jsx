import React, { createContext, useCallback, useContext, useState } from 'react'
import '../styles/notification.css'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, options = {}) => {
    const id = Date.now().toString()
    const toast = { id, message, ...options }
    setToasts((t) => [...t, toast])
    const ttl = options.duration ?? 3500
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl)
  }, [])

  const value = { show }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="tf-toasts">
        {toasts.map((t) => (
          <div key={t.id} className="tf-toast-wrap">
            <div className={`toast ${t.type || ''}`.trim()}>{t.message}</div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider')
  return ctx
}

export default NotificationContext
