function TaskStatusPanel({ taskItems, resolvedItems, onComplete }) {
  return (
    <aside className="task-panel">
      <h2 className="section-title">Task Status</h2>

      {/* Active tasks */}
      {taskItems.length === 0 ? (
        <p className="task-panel__placeholder">
          Select a ticket to add to Task Status
        </p>
      ) : (
        taskItems.map((ticket) => (
          <div key={ticket.id} className="task-item">
            <span className="task-item__title">{ticket.title}</span>
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

      {/* Resolved section */}
      <p className="task-panel__resolved-title">Resolved Task</p>

      {resolvedItems.length === 0 ? (
        <p className="task-panel__empty">No resolved tasks yet.</p>
      ) : (
        resolvedItems.map((ticket) => (
          <div key={ticket.id} className="resolved-item">
            <span className="resolved-item__title">{ticket.title}</span>
          </div>
        ))
      )}
    </aside>
  )
}

export default TaskStatusPanel
