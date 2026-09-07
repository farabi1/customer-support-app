function TaskStatusPanel({ taskItems = [], resolvedItems = [], onComplete }) {
  return (
    <aside className="task-panel">
      {/* Active Tasks Section */}
      <div className="task-panel__section">
        <h2 className="task-panel__heading">Task Status</h2>

        {taskItems.length === 0 ? (
          <p className="task-panel__placeholder">
            Select a ticket to add to Task Status
          </p>
        ) : (
          <div className="task-items-list">
            {taskItems.map((ticket) => (
              <div key={ticket.id} className="task-item-card">
                <h3 className="task-item-title">{ticket.title}</h3>
                <button
                  type="button"
                  className="btn-complete-task"
                  onClick={() => onComplete(ticket.id)}
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Tasks Section */}
      <div className="task-panel__section task-panel__resolved-section">
        <h2 className="task-panel__heading">Resolved Task</h2>

        {resolvedItems.length === 0 ? (
          <p className="task-panel__placeholder">
            No resolved tasks yet.
          </p>
        ) : (
          <div className="resolved-items-list">
            {resolvedItems.map((ticket) => (
              <div key={ticket.id} className="resolved-item-card">
                <p className="resolved-item-title">{ticket.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default TaskStatusPanel
