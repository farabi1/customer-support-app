function TicketCard({ ticket, isSelected, onClick }) {
  const isHigh = ticket.priority === 'HIGH'
  const isMedium = ticket.priority === 'MEDIUM'
  const isOpen = ticket.status === 'Open'

  const priorityColorClass = isHigh
    ? 'priority-text--high'
    : isMedium
    ? 'priority-text--medium'
    : 'priority-text--low'

  // Format date as 1/15/2024 matching Figma
  const [year, month, day] = ticket.createdAt.split('-')
  const formattedDate = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`

  return (
    <article
      className={`ticket-card ${isSelected ? 'ticket-card--selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={isSelected}
    >
      <div className="ticket-card__header">
        <h3 className="ticket-card__title">{ticket.title}</h3>
        <span className={`status-badge ${isOpen ? 'status-badge--open' : 'status-badge--inprogress'}`}>
          <span className="status-badge__dot">●</span>
          <span>{ticket.status}</span>
        </span>
      </div>

      <p className="ticket-card__desc">{ticket.description}</p>

      <div className="ticket-card__footer">
        <div className="ticket-card__meta-left">
          <span className="ticket-card__id">{ticket.id}</span>
          <span className={`ticket-card__priority ${priorityColorClass}`}>
            {ticket.priority} PRIORITY
          </span>
        </div>

        <div className="ticket-card__meta-right">
          <span className="ticket-card__customer">{ticket.customer}</span>
          <span className="ticket-card__date-group">
            <svg
              className="calendar-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default TicketCard
