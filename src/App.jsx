import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import TicketCard from './components/TicketCard'
import TaskStatusPanel from './components/TaskStatusPanel'
import NewTicketModal from './components/NewTicketModal'
import FAQSection from './components/FAQSection'
import ChangelogSection from './components/ChangelogSection'
import BlogSection from './components/BlogSection'
import DownloadSection from './components/DownloadSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import ticketsData from './data/tickets.json'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [tickets, setTickets] = useState(ticketsData)
  const [taskItems, setTaskItems] = useState([])
  const [resolvedItems, setResolvedItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [searchTicket, setSearchTicket] = useState('')
  const [filterPriority, setFilterPriority] = useState('ALL')

  const addedIds = new Set([
    ...taskItems.map((t) => t.id),
    ...resolvedItems.map((t) => t.id),
  ])

  function handleNavigate(page) {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNewTicket(formData) {
    const newId = `#${1013 + tickets.length + resolvedItems.length}`
    const newTicket = {
      id: newId,
      title: formData.title,
      description: formData.description,
      customer: formData.customer,
      priority: formData.priority,
      status: formData.status || 'Open',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setTickets((prev) => [newTicket, ...prev])
    setShowModal(false)
    setActivePage('home')

    toast.success(`Ticket ${newId} created successfully!`, {
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

  // Filtered tickets on Home page
  const displayedTickets = tickets.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTicket.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTicket.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTicket.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTicket.toLowerCase())

    const matchesPriority =
      filterPriority === 'ALL' || t.priority === filterPriority

    return matchesSearch && matchesPriority
  })

  return (
    <div className="app-layout">
      <ToastContainer />

      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onNewTicket={() => setShowModal(true)}
      />

      {showModal && (
        <NewTicketModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewTicket}
        />
      )}

      {/* View routing: Home | FAQ | Changelog | Blog | Download | Contact */}
      {activePage === 'home' && (
        <>
          <HeroBanner
            inProgressCount={taskItems.length}
            resolvedCount={resolvedItems.length}
          />

          <main className="main-content">
            <div className="container">
              <div className="content-grid">
                <section>
                  <div className="tickets-section-header">
                    <div>
                      <h2 className="section-title">Customer Tickets</h2>
                      <p className="section-subtitle">
                        Click a ticket card to assign it to your active task queue.
                      </p>
                    </div>

                    <div className="tickets-controls">
                      <input
                        type="text"
                        className="tickets-search-input"
                        placeholder="Search tickets, customers, #id..."
                        value={searchTicket}
                        onChange={(e) => setSearchTicket(e.target.value)}
                      />

                      <select
                        className="tickets-filter-select"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                      >
                        <option value="ALL">All Priorities</option>
                        <option value="HIGH">High Priority</option>
                        <option value="MEDIUM">Medium Priority</option>
                        <option value="LOW">Low Priority</option>
                      </select>
                    </div>
                  </div>

                  {displayedTickets.length === 0 ? (
                    <div className="tickets-empty">
                      {tickets.length === 0 ? (
                        <p>All tickets have been resolved!</p>
                      ) : (
                        <p>No tickets match your current search and filter criteria.</p>
                      )}
                    </div>
                  ) : (
                    <div className="tickets-list">
                      {displayedTickets.map((ticket) => (
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
        </>
      )}

      {activePage === 'faq' && (
        <FAQSection
          onNavigate={handleNavigate}
          onNewTicket={() => setShowModal(true)}
        />
      )}

      {activePage === 'changelog' && (
        <ChangelogSection
          onNavigate={handleNavigate}
        />
      )}

      {activePage === 'blog' && (
        <BlogSection
          onNavigate={handleNavigate}
        />
      )}

      {activePage === 'download' && (
        <DownloadSection
          onNavigate={handleNavigate}
        />
      )}

      {activePage === 'contact' && (
        <ContactSection
          onNewTicketFromContact={handleNewTicket}
        />
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
