function HeroBanner({ inProgressCount = 0, resolvedCount = 0 }) {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-banner__grid">
          {/* In-Progress Stat Card */}
          <div className="stat-card stat-card--inprogress">
            <div className="stat-card__content">
              <span className="stat-card__label">In-Progress</span>
              <span className="stat-card__value">{inProgressCount}</span>
            </div>
            <svg
              className="stat-card__wave"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M40 0 C90 40, 110 80, 200 120 M70 0 C110 35, 130 75, 200 100 M100 0 C130 30, 150 70, 200 80 M130 0 C150 25, 170 65, 200 60"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Resolved Stat Card */}
          <div className="stat-card stat-card--resolved">
            <div className="stat-card__content">
              <span className="stat-card__label">Resolved</span>
              <span className="stat-card__value">{resolvedCount}</span>
            </div>
            <svg
              className="stat-card__wave"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M40 0 C90 40, 110 80, 200 120 M70 0 C110 35, 130 75, 200 100 M100 0 C130 30, 150 70, 200 80 M130 0 C150 25, 170 65, 200 60"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
