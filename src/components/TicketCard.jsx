function TicketCard({ ticket, isSelected, onClick }) {
  const priorityClass =
    ticket.priority === 'HIGH PRIORITY'
      ? 'priority--high'
      : ticket.priority === 'MEDIUM PRIORITY'
      ? 'priority--medium'
      : 'priority--low'

  const statusClass =
    ticket.status === 'Open' ? 'badge--open' : 'badge--inprogress'

  const statusLabel =
    ticket.status === 'In-Progress' ? 'In- Progress' : ticket.status

  return (
    <article
      className={`ticket-card${isSelected ? ' selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={isSelected}
    >
      <div className="ticket-card__header">
        <h3 className="ticket-card__title">{ticket.title}</h3>
        <span className={`badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <p className="ticket-card__desc">{ticket.description}</p>

      <div className="ticket-card__footer">
        <div className="ticket-card__meta">
          <span className="ticket-card__id">{ticket.id}</span>
          <span className={`priority-badge ${priorityClass}`}>
            {ticket.priority}
          </span>
        </div>
        <div className="ticket-card__info">
          <span>{ticket.customer}</span>
          <span>{ticket.date}</span>
        </div>
      </div>
    </article>
  )
}

export default TicketCard
