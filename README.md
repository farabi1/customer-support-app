# Customer Support Zone (CS — Ticket System)

A React-based Customer Support Zone designed to display customer tickets, track progress, and mark them as resolved according to Figma design specifications. Includes status management, responsive mobile hamburger navigation, and toast notifications using React-Toastify.

## Submission Links
- **Live Link**: [https://customer-support-app-one.vercel.app](https://customer-support-app-one.vercel.app)
- **GitHub Repository**: [https://github.com/farabi1/customer-support-app](https://github.com/farabi1/customer-support-app)

---

## Key Features

- **Live Ticket Dashboard**: 2-column card grid displaying real customer support tickets with status, priority, customer details, and timestamp.
- **Interactive Search & Priority Filter**: Real-time keyword search across tickets, customer names, and IDs, paired with a priority filter (High, Medium, Low).
- **Task Status Panel**: Click any ticket card to assign it to your active queue, updating live In-Progress metric counters in the hero banner.
- **Task Completion Workflow**: Mark tasks complete to remove them from the active queue, record them in the Resolved section, and increment the resolved counter.
- **New Ticket Creation Modal**: Accessible dialog with client-side form validation to submit tickets that prepend immediately to the live queue.
- **Help & FAQ Section**: Interactive accordion with category filtering and instant search for support questions and triage guidelines.
- **Release Changelog**: Chronological release notes timeline (v1.3.0 through v1.0.0) with category badges (Feature, Improvement, Fix, Security).
- **Support Engineering Blog**: Curated industry guides, triage frameworks, and best practices with a modal reader.
- **Cross-Platform Download Center**: Native app downloads for Windows, macOS, Linux, and Mobile with dynamic release manifest generation and CLI setup instructions.
- **Direct Contact Portal**: Support form with category routing, email copy tool, business hours, and SLA response guarantees.
- **Responsive Navigation**: Smooth mobile drawer navigation powered by an animated hamburger icon for screen widths under 768px.
- **Toast Notifications**: Real-time feedback alerts for creation, assignment, resolution, and clipboard actions via `react-toastify`.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Modern CSS with CSS custom properties and flex/grid responsive design
- **Notifications**: React-Toastify
- **Data Source**: Structured JSON ticket database

---

## Project Architecture

```
src/
  components/
    Navbar.jsx             # Top bar with clean tab routing and animated mobile hamburger
    HeroBanner.jsx         # Live metric counter cards (In-Progress & Resolved)
    TicketCard.jsx         # Accessible ticket card with priority badges and metadata
    TaskStatusPanel.jsx    # Sidebar task tracker with completion progression
    NewTicketModal.jsx     # Validated ticket creation modal
    FAQSection.jsx         # Searchable FAQ accordion with category chips
    ChangelogSection.jsx   # Timeline of version history and improvements
    BlogSection.jsx        # Support guides and articles with reader modal
    DownloadSection.jsx    # Cross-platform download center with installer manifests
    ContactSection.jsx     # Direct contact form and support availability details
    Footer.jsx             # Footer with direct navigation and contact details
  data/
    tickets.json           # Realistic support inquiries and ticket records
  App.jsx                  # Main application state, search, and page routing
  index.css                # Global design system, typography, and responsive styles
  main.jsx                 # Application entry point
```

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/farabi1/customer-support-app.git

# Navigate to project directory
cd customer-support-app

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## Ticket Schema

Tickets are stored and managed with the following structure:

```json
{
  "id": "#1001",
  "title": "Login Issues - Can't Access Account",
  "description": "Customer is unable to log in to their account. They've tried resetting their password multiple times but still can't access their account.",
  "customer": "John Smith",
  "priority": "HIGH",
  "status": "Open",
  "createdAt": "2024-01-15"
}
```

---

## React Concepts & Implementation Q&A

### What is JSX, and why is it used?

JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write markup directly within your component logic. Instead of imperatively constructing DOM nodes using `React.createElement()` or `document.createElement()`, JSX enables declarative UI definitions that closely match HTML while preserving the full expressive power of JavaScript.

```jsx
const element = <h1 className="title">Support Queue</h1>
```

Vite/Babel compiles JSX into standard JavaScript function calls during the build process, resulting in cleaner, more maintainable component structures.

---

### What is the difference between State and Props?

- **Props** (short for properties) are read-only inputs passed from a parent component down to a child component. They allow components to be reusable and configurable from the outside. A component must never modify its own props.
- **State** is mutable data managed internally by a component. When state values update via setter functions, React triggers a re-render of the component and its children to reflect the latest values in the DOM.

```jsx
// Priority and status are passed down as Props
function TicketCard({ ticket, onSelect }) {
  // isHovered is internal component State
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={`card ${isHovered ? 'card--hover' : ''}`}
      onClick={() => onSelect(ticket.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{ticket.title}</h3>
      <span>{ticket.priority}</span>
    </article>
  )
}
```

---

### What is the `useState` hook, and how does it work?

`useState` is React's fundamental Hook for declaring local state variables in functional components. It takes an initial value and returns an array containing exactly two elements: the current state value, and an updater function.

```jsx
const [tickets, setTickets] = useState(initialTickets)
```

Calling the updater function schedules a re-render with the new state. When updating based on previous state values (such as prepending or filtering lists), using the callback form `setTickets(prev => [...prev, newTicket])` guarantees access to the most up-to-date state snapshot.

---

### How can you share state between components in React?

State is shared across components by **lifting state up** to their closest common ancestor. The ancestor component holds the state and provides both the current state data (via props) and callback functions (via props) to child components.

In this project, `App.jsx` manages the global ticket queue, the in-progress list, and the resolved items. It passes the data down to `TicketCard`, `TaskStatusPanel`, and `HeroBanner`, while passing callback handlers (`handleTicketClick`, `handleComplete`) so child interactions propagate back up to synchronize state across the whole interface.

---

### How is event handling done in React?

Event handling in React utilizes camelCase prop conventions (such as `onClick`, `onChange`, `onSubmit`, `onKeyDown`) rather than lowercase HTML attributes. Instead of passing strings, you pass actual JavaScript functions.

React wraps native browser events in a cross-browser `SyntheticEvent` system, providing consistent behavior across Safari, Chrome, Firefox, and Edge.

```jsx
// Form submission with validation and event prevention
function handleFormSubmit(e) {
  e.preventDefault()
  if (!title.trim()) return
  onSubmit({ title })
}

<form onSubmit={handleFormSubmit}>
  <input value={title} onChange={(e) => setTitle(e.target.value)} />
  <button type="submit">Submit Ticket</button>
</form>
```
