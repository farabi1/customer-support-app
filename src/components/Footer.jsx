function Footer({ onNavigate }) {
  const companyLinks = [
    { label: 'About Us', action: () => onNavigate?.('home') },
    { label: 'Our Mission', action: () => onNavigate?.('blog') },
    { label: 'Contact Sales', action: () => onNavigate?.('contact') },
  ]

  const servicesLinks = [
    { label: 'Products & Services', action: () => onNavigate?.('home') },
    { label: 'Customer Stories', action: () => onNavigate?.('blog') },
    { label: 'Download Apps', action: () => onNavigate?.('download') },
  ]

  const informationLinks = [
    { label: 'Privacy Policy', action: () => onNavigate?.('faq') },
    { label: 'Terms & Conditions', action: () => onNavigate?.('faq') },
    { label: 'Join Us', action: () => onNavigate?.('changelog') },
  ]

  const socialLinks = [
    { icon: 'f', label: '@CS — Ticket System' },
    { icon: 'in', label: '@CS — Ticket System' },
    { icon: 'tw', label: '@CS — Ticket System' },
    { icon: '✉', label: 'support@cst.com', isEmail: true },
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
              <span className="footer__brand">CS — Ticket System</span>
            </button>
            <p className="footer__desc">
              A modern customer support management platform engineered to streamline issue tracking, triage tickets efficiently, and help teams resolve customer problems faster.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <p className="footer__col-title">Company</p>
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

          {/* Services Column */}
          <div>
            <p className="footer__col-title">Services</p>
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

          {/* Information Column */}
          <div>
            <p className="footer__col-title">Information</p>
            <ul className="footer__links">
              {informationLinks.map((item) => (
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

          {/* Social Links Column */}
          <div>
            <p className="footer__col-title">Social Links</p>
            <div className="footer__socials">
              {socialLinks.map((s) => (
                <div key={s.label + s.icon} className="footer__social-item">
                  <span className="footer__social-icon">{s.icon}</span>
                  {s.isEmail ? (
                    <a href="mailto:support@cst.com" className="footer__email-link">
                      {s.label}
                    </a>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered copyright matching Figma */}
        <div className="footer__bottom">
          <p>© 2025 CS — Ticket System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
