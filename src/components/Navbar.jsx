import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'faq', label: 'FAQ' },
  { id: 'changelog', label: 'Changelog' },
  { id: 'blog', label: 'Blog' },
  { id: 'download', label: 'Download' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ activePage = 'home', onNavigate, onNewTicket }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleLinkClick(pageId) {
    onNavigate(pageId)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLogoClick(e) {
    e.preventDefault()
    onNavigate('home')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNewTicketClick() {
    setMenuOpen(false)
    onNewTicket()
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand on the left */}
          <button
            type="button"
            className="navbar__brand-btn"
            onClick={handleLogoClick}
          >
            <span className="navbar__brand-text">CS — Ticket System</span>
          </button>

          {/* Right section: Navigation items and New Ticket button */}
          <div className="navbar__right-group">
            <nav className="navbar__nav-desktop" aria-label="Main navigation">
              <ul className="navbar__links">
                {navLinks.map((link) => {
                  const isActive = activePage === link.id
                  return (
                    <li key={link.id}>
                      <button
                        type="button"
                        className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                        onClick={() => handleLinkClick(link.id)}
                      >
                        {link.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <button
              type="button"
              className="navbar__cta"
              onClick={onNewTicket}
            >
              + New Ticket
            </button>

            {/* Responsive Hamburger Toggle */}
            <button
              type="button"
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className="navbar__mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Navigation */}
      <div
        className={`navbar__mobile-drawer ${menuOpen ? 'navbar__mobile-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="navbar__mobile-header">
          <span className="navbar__mobile-title">CS — Ticket System</span>
          <button
            type="button"
            className="navbar__mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => {
              const isActive = activePage === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="mobile-link-badge">Current</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="navbar__mobile-footer">
          <button
            type="button"
            className="navbar__mobile-cta"
            onClick={handleNewTicketClick}
          >
            + Create New Ticket
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
