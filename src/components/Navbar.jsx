function Navbar() {
  const links = ['Home', 'FAQ', 'Changelog', 'Blog', 'Download', 'Contact']

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__inner">
          <span className="navbar__brand">CS — Ticket System</span>

          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link}>
                <a href="#" className="navbar__link">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button type="button" className="navbar__cta">
            New Ticket
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
