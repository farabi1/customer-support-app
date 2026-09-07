import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import TicketCard from './components/TicketCard'
import TaskStatusPanel from './components/TaskStatusPanel'
import Footer from './components/Footer'

import ticketsData from './data/tickets.json'

function App() {
  // All tickets shown in the customer tickets grid
  const [tickets, setTickets] = useState(ticketsData)
  // Tickets currently sitting in the Task Status panel (in-progress)
  const [taskItems, setTaskItems] = useState([])
  // Tickets that have been completed and resolved
  const [resolvedItems, setResolvedItems] = useState([])

  // IDs of tickets already added (to prevent duplicates & show visual state)
  const addedIds = new Set([
    ...taskItems.map((t) => t.id),
    ...resolvedItems.map((t) => t.id),
  ])

  // ── Click ticket card → add to Task Status ──────────────────────────────
  function handleTicketClick(ticket) {
    if (addedIds.has(ticket.id)) {
      toast.info(`"${ticket.title}" is already in Task Status.`, {
        position: 'top-right',
        autoClose: 2500,
      })
      return
    }

    setTaskItems((prev) => [...prev, ticket])

    toast.success(`Ticket added to Task Status!`, {
      position: 'top-right',
      autoClose: 3000,
    })
  }

  // ── Click Complete → resolve ticket and remove from grid ─────────────────
  function handleComplete(ticketId) {
    const ticket = taskItems.find((t) => t.id === ticketId)
    if (!ticket) return

    // Remove from Task Status panel
    setTaskItems((prev) => prev.filter((t) => t.id !== ticketId))
    // Add to Resolved list
    setResolvedItems((prev) => [...prev, ticket])
    // Remove from Customer Tickets grid
    setTickets((prev) => prev.filter((t) => t.id !== ticketId))

    toast.success(`"${ticket.title}" has been resolved! ✅`, {
      position: 'top-right',
      autoClose: 3500,
    })
  }

  return (
    <>
      {/* Toast container — renders notifications */}
      <ToastContainer />

      <Navbar />

      <HeroBanner
        inProgressCount={taskItems.length}
        resolvedCount={resolvedItems.length}
      />

      <main className="main-content">
        <div className="container">
          <div className="content-grid">

            {/* ── Left: Customer Tickets grid ─────────────────────────── */}
            <section>
              <h2 className="section-title">Customer Tickets</h2>

              {tickets.length === 0 ? (
                <div className="tickets-empty">
                  <p>🎉 All tickets have been resolved!</p>
                </div>
              ) : (
                <div className="tickets-list">
                  {tickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      isSelected={addedIds.has(ticket.id)}
                      onClick={() => handleTicketClick(ticket)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* ── Right: Task Status panel ─────────────────────────────── */}
            <TaskStatusPanel
              taskItems={taskItems}
              resolvedItems={resolvedItems}
              onComplete={handleComplete}
            />

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
