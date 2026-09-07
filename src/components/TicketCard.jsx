function TicketCard({ ticket, isSelected, onClick }) {
  const priorityClass =
    ticket.priority === 'HIGH'
      ? 'priority--high'
      : ticket.priority === 'MEDIUM'
      ? 'priority--medium'
      : 'priority--low'

  const statusClass =
    ticket.status === 'Open' ? 'badge--open' : 'badge--inprogress'

  const statusLabel =
    ticket.status === 'In-Progress' ? 'In-Progress' : ticket.status

  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article
      className={`ticket-card${isSelected ? ' selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={isSelected}
      title={isSelected ? 'Already added to Task Status' : 'Click to add to Task Status'}
    >
      {/* Card Header: title + status badge */}
      <div className="ticket-card__header">
        <h3 className="ticket-card__title">{ticket.title}</h3>
        <span className={`badge ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Description */}
      <p className="ticket-card__desc">{ticket.description}</p>

      {/* Footer metadata */}
      <div className="ticket-card__footer">
        <div className="ticket-card__meta">
          <span className="ticket-card__id">{ticket.id}</span>
          <span className={`priority-badge ${priorityClass}`}>
            {ticket.priority} PRIORITY
          </span>
        </div>
        <div className="ticket-card__info">
          <span className="ticket-card__customer">{ticket.customer}</span>
          <span className="ticket-card__date">{formattedDate}</span>
        </div>
      </div>
    </article>
  )
}

export default TicketCard
