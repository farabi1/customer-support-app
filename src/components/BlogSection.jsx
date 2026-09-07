import { useState } from 'react'

const BLOG_POSTS = [
  {
    id: 'write-good-ticket',
    title: 'How to Write Clear and Actionable Support Tickets',
    date: 'Sep 04, 2024',
    readTime: '4 min read',
    category: 'Best Practices',
    author: 'Sarah Chen, Support Lead',
    summary:
      'Detailed, unambiguous tickets resolve up to 60% faster. Learn what reproduction steps, environment details, and logs make life easier for engineers.',
    content: [
      'Every support engineer has encountered the dreaded two-word ticket: "It broke." Without context, resolution stalls while back-and-forth messages accumulate.',
      'To expedite resolution, follow the 4-part structure: Expected Behavior, Observed Behavior, Exact Reproduction Steps, and Environment Specifications (browser, OS, device, account ID).',
      'Attaching system error logs, network traces, or console screenshots transforms vague reports into instantly actionable bug fixes.',
      'Always include the user impact rating. Is a customer completely blocked from checkout, or is a button misaligned by 2 pixels? Correct prioritization ensures critical path issues are resolved first.',
    ],
  },
  {
    id: 'ticket-prioritization-matrix',
    title: 'Mastering Ticket Prioritization: The High, Medium, Low Framework',
    date: 'Aug 22, 2024',
    readTime: '5 min read',
    category: 'Triage',
    author: 'Marcus Vance, Operations Director',
    summary:
      'Avoid triage fatigue by setting strict criteria for severity levels. Discover how our support framework categorizes incoming customer requests.',
    content: [
      'Prioritization determines which tickets receive immediate attention and which can wait for normal development cycles. When everything is urgent, nothing is urgent.',
      'HIGH Priority: Reserved exclusively for service outages, payment failures, data integrity risks, or widespread customer blockers. Response time target: < 15 minutes.',
      'MEDIUM Priority: Core features with available workarounds, intermittent performance regressions, or high-value customer inquiries.',
      'LOW Priority: Cosmetic layout defects, non-blocking UI quirks, feature enhancements, and documentation clarifications.',
      'Regularly review your backlog to ensure low-priority tickets do not linger indefinitely. Consider dedicated weekly sprint cleanup hours.',
    ],
  },
  {
    id: 'streamlining-support-queues',
    title: '5 Habits of High-Performing Support Teams',
    date: 'Aug 10, 2024',
    readTime: '6 min read',
    category: 'Customer Experience',
    author: 'Elena Rostova, CX Strategist',
    summary:
      'Explore the day-to-day habits, metrics, and automation techniques that top customer experience teams use to maintain near-zero response times.',
    content: [
      'Top-tier customer support is not just about typing quickly—it is about systematic workflow discipline and empathetic communication.',
      '1. Morning Queue Triage: Spend the first 15 minutes reviewing newly arrived high-priority tickets before diving into in-progress work.',
      '2. Centralized Status Tracking: Keep active tasks visible. When an agent accepts a ticket, marking it "In Progress" prevents conflicting efforts from teammates.',
      '3. Templated yet Human Responses: Leverage macros for repetitive technical instructions, but personalize the opening and closing remarks.',
      '4. Root-Cause Tagging: Label recurring issues so product and engineering teams can permanently eliminate frequent pain points.',
      '5. Celebrate Resolutions: Recognizing resolved tickets keeps morale high and promotes a culture of accountability.',
    ],
  },
  {
    id: 'mobile-support-workflows',
    title: 'Why Responsive Mobile Support Queues Matter for Distributed Teams',
    date: 'Jul 28, 2024',
    readTime: '3 min read',
    category: 'Product Guides',
    author: 'David Kim, Mobile Engineer',
    summary:
      'Support does not stop when you step away from your desk. How mobile-ready ticket queues empower on-call engineers to manage incidents on the go.',
    content: [
      'Modern support teams operate across multiple timezones and on-call rotations. When an urgent incident happens after hours, mobile responsiveness is vital.',
      'Our updated mobile drawer navigation and touch-optimized card layout allow on-call engineers to inspect ticket details, adjust priority levels, and mark tasks complete right from their smartphone.',
      'With quick status toggles and real-time notifications, teams maintain SLA commitments without being tethered to a desktop workstation.',
    ],
  },
]

const CATEGORIES = ['All', 'Best Practices', 'Triage', 'Customer Experience', 'Product Guides']

function BlogSection({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeArticle, setActiveArticle] = useState(null)

  const filteredPosts = BLOG_POSTS.filter((post) => {
    return selectedCategory === 'All' || post.category === selectedCategory
  })

  return (
    <section className="blog-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <span className="page-badge">Insights & Guides</span>
          <h1 className="page-title">Support Engineering Blog</h1>
          <p className="page-subtitle">
            Best practices, triage strategies, and operational guides from experienced customer experience professionals.
          </p>

          {/* Category Filter Pills */}
          <div className="faq-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq-cat-btn ${selectedCategory === cat ? 'faq-cat-btn--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="blog-posts-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-article-card">
              <div className="blog-card-header">
                <span className="blog-category-badge">{post.category}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>

              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.summary}</p>

              <div className="blog-card-footer">
                <div className="blog-author-meta">
                  <span className="blog-author-name">{post.author}</span>
                  <span className="blog-publish-date">{post.date}</span>
                </div>
                <button
                  type="button"
                  className="blog-read-btn"
                  onClick={() => setActiveArticle(post)}
                >
                  Read Article →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Modal */}
        {activeArticle && (
          <div
            className="modal-overlay"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="article-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="article-modal-header">
                <div className="article-modal-tags">
                  <span className="blog-category-badge">{activeArticle.category}</span>
                  <span className="blog-read-time">{activeArticle.readTime}</span>
                </div>
                <button
                  type="button"
                  className="modal__close"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close article"
                >
                  ✕
                </button>
              </div>

              <h1 className="article-modal-title">{activeArticle.title}</h1>

              <div className="article-modal-meta">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              <div className="article-modal-body">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="article-modal-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="article-modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveArticle(null)}
                >
                  Close Article
                </button>
                {onNavigate && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setActiveArticle(null)
                      onNavigate('contact')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Discuss in Support
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogSection
