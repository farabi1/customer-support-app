function TaskStatusPanel({ taskItems, resolvedItems, onComplete }) {
  return (
    <aside className="task-panel">
      <h2 className="section-title">Task Status</h2>

      {/* ── Active Tasks ───────────────────────────────────────── */}
      {taskItems.length === 0 ? (
        <p className="task-panel__placeholder">
          Select a ticket to add it to Task Status
        </p>
      ) : (
        taskItems.map((ticket) => (
          <div key={ticket.id} className="task-item">
            <div className="task-item__info">
              <span className="task-item__title">{ticket.title}</span>
              <span className="task-item__customer">{ticket.customer}</span>
            </div>
            <button
              type="button"
              className="task-item__btn"
              onClick={() => onComplete(ticket.id)}
            >
              Complete
            </button>
          </div>
        ))
      )}

      {/* ── Resolved Section ───────────────────────────────────── */}
      <div className="task-panel__resolved-section">
        <p className="task-panel__resolved-title">Resolved Task</p>

        {resolvedItems.length === 0 ? (
          <p className="task-panel__empty">No resolved tasks yet.</p>
        ) : (
          resolvedItems.map((ticket) => (
            <div key={ticket.id} className="resolved-item">
              <span className="resolved-item__check">✓</span>
              <span className="resolved-item__title">{ticket.title}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default TaskStatusPanel
