const footerLinks = {
  Company: ['About Us', 'Our Mission', 'Contact Sales'],
  Services: ['Products & Services', 'Customer Stories', 'Download Apps'],
  Information: ['Privacy Policy', 'Terms & Conditions', 'Join Us'],
}

const socialLinks = [
  { icon: 'f', label: '@CS — Ticket System' },
  { icon: 'in', label: '@CS — Ticket System' },
  { icon: 'tw', label: '@CS — Ticket System' },
  { icon: 'yt', label: '@CS — Ticket System' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div>
            <p className="footer__brand">CS — Ticket System</p>
            <p className="footer__desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p className="footer__email">support@cst.com</p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="footer__col-title">{title}</p>
              <ul className="footer__links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <p className="footer__col-title">Social Links</p>
            {socialLinks.map((s) => (
              <div key={s.label + s.icon} className="footer__social-item">
                <span className="footer__social-icon">{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 CS — Ticket System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
