import { useState } from 'react'

const CHANGELOG_DATA = [
  {
    version: 'v1.3.0',
    releaseDate: 'September 2024',
    badge: 'Latest Release',
    isCurrent: true,
    summary: 'Enhanced responsive experience, mobile hamburger navigation, and direct ticket creation modal.',
    items: [
      { type: 'feature', text: 'Added responsive mobile hamburger menu with smooth drawer transitions.' },
      { type: 'feature', text: 'Interactive New Ticket modal with validation, live queue injection, and auto ID generator.' },
      { type: 'improvement', text: 'Seamless tab routing without hash fragments for all main navigation destinations.' },
      { type: 'fix', text: 'Resolved task counter mismatch when removing tickets from active status.' },
      { type: 'security', text: 'Hardened input sanitization on ticket descriptions and customer identity fields.' },
    ],
  },
  {
    version: 'v1.2.0',
    releaseDate: 'August 2024',
    badge: 'Stable',
    isCurrent: false,
    summary: 'Optimized Task Status panel layout, live toast notifications, and priority color coding.',
    items: [
      { type: 'feature', text: 'Integrated real-time React-Toastify notifications for ticket actions.' },
      { type: 'improvement', text: 'High, Medium, and Low visual priority badges with distinct color themes.' },
      { type: 'improvement', text: 'Live In-Progress and Resolved metric cards in the hero dashboard.' },
      { type: 'fix', text: 'Prevented duplicate card selections in the active task status list.' },
    ],
  },
  {
    version: 'v1.1.0',
    releaseDate: 'July 2024',
    badge: 'Previous',
    isCurrent: false,
    summary: 'Added customer detail metadata, responsive card grid, and task completion workflow.',
    items: [
      { type: 'feature', text: 'Mark task complete button with instant status progression and card archiving.' },
      { type: 'improvement', text: 'Customer names and creation dates displayed cleanly on each card.' },
      { type: 'fix', text: 'Corrected flexbox wrapping behavior on tablet screens between 768px and 900px.' },
    ],
  },
  {
    version: 'v1.0.0',
    releaseDate: 'June 2024',
    badge: 'Initial Launch',
    isCurrent: false,
    summary: 'Foundational release of CS Ticket System with modern React and Vite.',
    items: [
      { type: 'feature', text: 'Initial core release of the Customer Support Ticket Management interface.' },
      { type: 'feature', text: 'JSON-driven ticket database with mock customer inquiries.' },
      { type: 'feature', text: 'Clean two-column dashboard layout with sidebar task queue.' },
    ],
  },
]

function ChangelogSection({ onNavigate }) {
  const [filterType, setFilterType] = useState('all')

  const filterLabels = [
    { id: 'all', label: 'All Changes' },
    { id: 'feature', label: 'Features' },
    { id: 'improvement', label: 'Improvements' },
    { id: 'fix', label: 'Fixes' },
  ]

  return (
    <section className="changelog-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <span className="page-badge">Product Updates</span>
          <h1 className="page-title">Release Changelog</h1>
          <p className="page-subtitle">
            Track product updates, new workflow tools, improvements, and bug fixes across every release.
          </p>

          <div className="changelog-filters">
            {filterLabels.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-btn ${filterType === f.id ? 'filter-btn--active' : ''}`}
                onClick={() => setFilterType(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="changelog-timeline">
          {CHANGELOG_DATA.map((release) => {
            const visibleItems = release.items.filter(
              (item) => filterType === 'all' || item.type === filterType
            )

            if (visibleItems.length === 0) return null

            return (
              <div
                key={release.version}
                className={`changelog-entry ${release.isCurrent ? 'changelog-entry--current' : ''}`}
              >
                <div className="changelog-entry__dot" />

                <div className="changelog-entry__card">
                  <div className="changelog-entry__header">
                    <div className="changelog-entry__title-group">
                      <h2 className="changelog-version-tag">{release.version}</h2>
                      <span className={`version-status-badge version-status-badge--${release.isCurrent ? 'current' : 'archived'}`}>
                        {release.badge}
                      </span>
                    </div>
                    <span className="changelog-date">{release.releaseDate}</span>
                  </div>

                  <p className="changelog-summary">{release.summary}</p>

                  <ul className="changelog-item-list">
                    {visibleItems.map((item, i) => (
                      <li key={i} className="changelog-item-row">
                        <span className={`item-tag item-tag--${item.type}`}>
                          {item.type}
                        </span>
                        <span className="item-description">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="changelog-bottom-card">
          <div className="changelog-bottom-card__info">
            <h3 className="card-title">Stay up to date</h3>
            <p className="card-desc">
              Have a feature request or noticed an unexpected bug? Let our development team know.
            </p>
          </div>
          {onNavigate && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onNavigate('contact')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Submit Feedback
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ChangelogSection
