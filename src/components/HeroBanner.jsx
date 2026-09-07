function HeroBanner({ inProgressCount, resolvedCount }) {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-banner__inner">
          <div className="stat-card">
            <p className="stat-card__label">In-Progress</p>
            <p className="stat-card__value">{inProgressCount}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Resolved</p>
            <p className="stat-card__value">{resolvedCount}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
