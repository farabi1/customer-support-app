import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import TicketCard from './components/TicketCard'
import TaskStatusPanel from './components/TaskStatusPanel'
import NewTicketModal from './components/NewTicketModal'
import Footer from './components/Footer'

import ticketsData from './data/tickets.json'

function App() {
  const [tickets, setTickets] = useState(ticketsData)
  const [taskItems, setTaskItems] = useState([])
  const [resolvedItems, setResolvedItems] = useState([])
  const [showModal, setShowModal] = useState(false)

  const addedIds = new Set([
    ...taskItems.map((t) => t.id),
    ...resolvedItems.map((t) => t.id),
  ])

  function handleNewTicket(formData) {
    const newTicket = {
      id: `#${1013 + tickets.length}`,
      title: formData.title,
      description: formData.description,
      customer: formData.customer,
      priority: formData.priority,
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setTickets((prev) => [newTicket, ...prev])
    setShowModal(false)

    toast.success('New ticket created!', {
      position: 'top-right',
      autoClose: 3000,
    })
  }

  function handleTicketClick(ticket) {
    if (addedIds.has(ticket.id)) {
      toast.info('This ticket is already in Task Status.', {
        position: 'top-right',
        autoClose: 2500,
      })
      return
    }

    setTaskItems((prev) => [...prev, ticket])

    toast.success('Ticket added to Task Status!', {
      position: 'top-right',
      autoClose: 3000,
    })
  }

  function handleComplete(ticketId) {
    const ticket = taskItems.find((t) => t.id === ticketId)
    if (!ticket) return

    setTaskItems((prev) => prev.filter((t) => t.id !== ticketId))
    setResolvedItems((prev) => [...prev, ticket])
    setTickets((prev) => prev.filter((t) => t.id !== ticketId))

    toast.success('Task marked as complete!', {
      position: 'top-right',
      autoClose: 3000,
    })
  }

  return (
    <>
      <ToastContainer />

      <Navbar onNewTicket={() => setShowModal(true)} />

      {showModal && (
        <NewTicketModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewTicket}
        />
      )}

      <HeroBanner
        inProgressCount={taskItems.length}
        resolvedCount={resolvedItems.length}
      />

      <main className="main-content">
        <div className="container">
          <div className="content-grid">

            <section>
              <h2 className="section-title">Customer Tickets</h2>

              {tickets.length === 0 ? (
                <div className="tickets-empty">
                  <p>All tickets have been resolved!</p>
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
