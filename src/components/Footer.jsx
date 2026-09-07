function Footer({ onNavigate }) {
  const companyLinks = [
    { label: 'Home', action: () => onNavigate?.('home') },
    { label: 'FAQ', action: () => onNavigate?.('faq') },
    { label: 'Changelog', action: () => onNavigate?.('changelog') },
  ]

  const servicesLinks = [
    { label: 'Ticket Queue', action: () => onNavigate?.('home') },
    { label: 'Blog & Articles', action: () => onNavigate?.('blog') },
    { label: 'Download Apps', action: () => onNavigate?.('download') },
  ]

  const supportLinks = [
    { label: 'Contact Support', action: () => onNavigate?.('contact') },
    { label: 'Frequently Asked', action: () => onNavigate?.('faq') },
    { label: 'System Status', action: () => onNavigate?.('changelog') },
  ]

  const socialLinks = [
    { icon: '𝕏', label: '@CSTicketApp' },
    { icon: '💼', label: 'CS Ticket System' },
    { icon: '🐙', label: 'github.com/farabi1' },
  ]

  function handleClick(e, action) {
    e.preventDefault()
    if (action) {
      action()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand-col">
            <button
              type="button"
              className="footer__brand-link"
              onClick={(e) => handleClick(e, () => onNavigate?.('home'))}
            >
              <span className="footer__brand-icon">🎫</span>
              <span className="footer__brand">CS — Ticket System</span>
            </button>
            <p className="footer__desc">
              A modern customer support management platform engineered to streamline issue tracking, triage tickets efficiently, and help teams resolve customer problems faster.
            </p>
            <div className="footer__contact-quick">
              <span className="footer__email-icon">✉️</span>
              <a
                href="mailto:support@cst.com"
                className="footer__email"
              >
                support@cst.com
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <p className="footer__col-title">Navigation</p>
            <ul className="footer__links">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={(e) => handleClick(e, item.action)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <p className="footer__col-title">Resources</p>
            <ul className="footer__links">
              {servicesLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={(e) => handleClick(e, item.action)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social Column */}
          <div>
            <p className="footer__col-title">Help & Social</p>
            <ul className="footer__links" style={{ marginBottom: '16px' }}>
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={(e) => handleClick(e, item.action)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="footer__socials">
              {socialLinks.map((s) => (
                <div key={s.label} className="footer__social-item">
                  <span className="footer__social-icon">{s.icon}</span>
                  <span className="footer__social-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} CS — Ticket System. All rights reserved.</p>
          <div className="footer__bottom-links">
            <button
              type="button"
              className="footer__link-btn"
              onClick={(e) => handleClick(e, () => onNavigate?.('faq'))}
            >
              Privacy &amp; Terms
            </button>
            <span className="footer__sep">•</span>
            <button
              type="button"
              className="footer__link-btn"
              onClick={(e) => handleClick(e, () => onNavigate?.('contact'))}
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
