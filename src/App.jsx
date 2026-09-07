import { useState } from 'react'
import './index.css'

import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import TicketCard from './components/TicketCard'
import TaskStatusPanel from './components/TaskStatusPanel'
import Footer from './components/Footer'

import ticketsData from './data/tickets.json'

function App() {
  const [tickets] = useState(ticketsData)
  const [taskItems, setTaskItems] = useState([])
  const [resolvedItems, setResolvedItems] = useState([])

  // Add ticket to Task Status when card is clicked
  function handleTicketClick(ticket) {
    const alreadyInTask = taskItems.some((t) => t.id === ticket.id)
    const alreadyResolved = resolvedItems.some((t) => t.id === ticket.id)
    if (!alreadyInTask && !alreadyResolved) {
      setTaskItems((prev) => [...prev, ticket])
    }
  }

  // Move task to Resolved when Complete is clicked
  function handleComplete(ticketId) {
    const ticket = taskItems.find((t) => t.id === ticketId)
    if (ticket) {
      setTaskItems((prev) => prev.filter((t) => t.id !== ticketId))
      setResolvedItems((prev) => [...prev, ticket])
    }
  }

  const selectedIds = new Set([
    ...taskItems.map((t) => t.id),
    ...resolvedItems.map((t) => t.id),
  ])

  return (
    <>
      <Navbar />

      <HeroBanner
        inProgressCount={taskItems.length}
        resolvedCount={resolvedItems.length}
      />

      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Left — Customer Tickets */}
            <section>
              <h2 className="section-title">Customer Tickets</h2>
              <div className="tickets-list">
                {tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    isSelected={selectedIds.has(ticket.id)}
                    onClick={() => handleTicketClick(ticket)}
                  />
                ))}
              </div>
            </section>

            {/* Right — Task Status */}
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
