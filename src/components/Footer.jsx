import React from 'react'

export default function Footer() {
  function scrollTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="brand">TicketFlow</div>
          <div className="copyright">© {new Date().getFullYear()} TicketFlow</div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <a href="#" onClick={scrollTop}>Back to top</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>

        <div className="footer-social" aria-hidden="false">
          {}
          <a href="https://x.com/Adebayo25083860" aria-label="Twitter" className="social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.92c-.64.3-1.33.5-2.05.59.74-.44 1.3-1.13 1.56-1.96-.7.42-1.46.73-2.27.9A3.63 3.63 0 0 0 12.9 8.5c0 .28.03.55.09.82-3-.15-5.65-1.6-7.44-3.8-.31.55-.48 1.2-.48 1.88 0 1.3.66 2.45 1.67 3.13-.61-.02-1.18-.19-1.68-.46v.05c0 1.82 1.3 3.34 3.03 3.68-.32.09-.65.14-.99.14-.24 0-.48-.02-.71-.07.48 1.49 1.86 2.58 3.5 2.61A7.28 7.28 0 0 1 4 19.54 10.26 10.26 0 0 0 9.62 21c6.02 0 9.33-4.98 9.33-9.3v-.42c.64-.46 1.18-1.04 1.61-1.69-.59.26-1.22.44-1.87.52z" fill="#374151"/></svg>
          </a>

           <a href="https://github.com/TechBroK" aria-label="GitHub" className="social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" fill="#374151"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}