import { useState, useMemo } from 'react'

const FAQ_DATA = [
  {
    category: 'Getting Started',
    q: 'How do I submit a new support ticket?',
    a: 'Click the "+ New Ticket" button in the navigation bar. Provide a clear title, detailed description, customer name, and choose the priority and status. Your ticket will appear at the top of the queue immediately.',
  },
  {
    category: 'Tickets & Tasks',
    q: 'What do the priority levels mean?',
    a: 'HIGH is for mission-critical issues requiring immediate triage (e.g. outages, payment failures). MEDIUM is for important workflow blockers. LOW is for non-critical bugs, feature suggestions, or minor UI tweaks.',
  },
  {
    category: 'Tickets & Tasks',
    q: 'How does the Task Status workflow operate?',
    a: 'Clicking any ticket card moves it to your active Task Status panel on the right. This changes its tracking to in-progress and updates the top stat counter. Once work is finished, click "Complete" to resolve it.',
  },
  {
    category: 'Workflow',
    q: 'Can I re-add a ticket that is already in progress?',
    a: 'No. The system prevents duplicate entries to keep task counts accurate. If you click a ticket that is already active or completed, an informational notification will let you know.',
  },
  {
    category: 'Workflow',
    q: 'What happens when a ticket is marked Complete?',
    a: 'The ticket is removed from the active queue and placed into the Resolved list at the bottom of the Task Status panel. The banner updates the resolved count in real time.',
  },
  {
    category: 'Account & Security',
    q: 'Is customer data kept private and encrypted?',
    a: 'Yes. All ticket communications, customer names, and system logs are securely handled following strict data isolation and industry standard TLS 1.3 encryption protocols.',
  },
  {
    category: 'Account & Security',
    q: 'Can multiple support agents collaborate on the same queue?',
    a: 'Yes, our platform supports multi-seat agent distribution with real-time state synchronization, preventing duplicate replies and ticket collision.',
  },
  {
    category: 'Getting Started',
    q: 'Are there keyboard shortcuts available?',
    a: 'Press Esc to close any active modal or menu. Fast search and quick keyboard ticket actions can be accessed directly through the command palette in the desktop app.',
  },
]

const CATEGORIES = ['All', 'Getting Started', 'Tickets & Tasks', 'Workflow', 'Account & Security']

function FAQSection({ onNavigate, onNewTicket }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  function toggleFaq(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <span className="page-badge">Help & Support</span>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find quick answers to common questions about ticket workflows, status tracking, and platform features.
          </p>

          {/* Search bar */}
          <div className="faq-search-wrapper">
            <span className="faq-search-icon">🔍</span>
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search help articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="faq-search-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="faq-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq-cat-btn ${activeCategory === cat ? 'faq-cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-container">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <p className="faq-empty-title">No matching questions found</p>
              <p className="faq-empty-desc">
                Try searching with different keywords or browse all categories.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('All')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={idx}
                    className={`faq-card ${isOpen ? 'faq-card--open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-left">
                        <span className="faq-category-tag">{faq.category}</span>
                        <span className="faq-question-text">{faq.q}</span>
                      </div>
                      <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                    </button>

                    {isOpen && (
                      <div className="faq-answer-pane">
                        <p className="faq-answer-text">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="faq-contact-cta">
          <div className="faq-contact-cta__content">
            <h3 className="faq-contact-cta__title">Still need assistance?</h3>
            <p className="faq-contact-cta__text">
              Our support team is available Monday through Friday to help resolve your issues quickly.
            </p>
          </div>
          <div className="faq-contact-cta__actions">
            {onNavigate && (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onNavigate('contact')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Contact Support Team
              </button>
            )}
            {onNewTicket && (
              <button
                type="button"
                className="btn-secondary"
                onClick={onNewTicket}
              >
                Create a Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
