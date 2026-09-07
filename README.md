# CS — Ticket System

A customer support ticket management web application built with **React** and **Vite**. Support agents can view incoming customer issues, add them to a Task Status panel, and complete them — removing them from the live ticket grid and incrementing the resolved count.

---

## 🚀 Live Demo

🔗 **[https://customer-support-app-one.vercel.app](https://customer-support-app-one.vercel.app)**

> GitHub Repository: [farabi1/customer-support-app](https://github.com/farabi1/customer-support-app)

---

## 📸 Features

- 📋 **Ticket Grid** — 12 real customer support issues displayed in a responsive 2-column card layout
- 🏷️ **Priority & Status Badges** — HIGH / MEDIUM / LOW priority and Open / In-Progress status on every card
- ➕ **Add to Task Status** — Clicking a card adds it to the right-hand Task Status panel and shows a toast notification; the In-Progress counter increments automatically
- ✅ **Complete & Resolve** — Clicking Complete shows a toast, removes the ticket from the grid and Task Status panel, moves it to the Resolved list, and updates both counters
- 📊 **Live Banner Counters** — The hero banner always reflects the current In-Progress and Resolved counts
- 🔔 **Toast Notifications** — Powered by React-Toastify, replacing native alerts with styled notifications
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
customer-support-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar with menu links
│   │   ├── HeroBanner.jsx      # Gradient banner with In-Progress/Resolved counts
│   │   ├── TicketCard.jsx      # Individual ticket card (id, title, description, customer, priority, status, createdAt)
│   │   ├── TaskStatusPanel.jsx # Right panel — active tasks + resolved section
│   │   └── Footer.jsx          # Page footer with company, services, social links
│   ├── data/
│   │   └── tickets.json        # 12 fake customer support tickets (JSON)
│   ├── App.jsx                 # Root component — all state lives here
│   ├── App.css                 # Component-level placeholder
│   ├── index.css               # Full design system, layout, and responsive CSS
│   └── main.jsx                # React entry point
├── index.html                  # HTML shell with page title and meta description
├── vite.config.js              # Vite build configuration
├── vercel.json                 # SPA routing rewrites for Vercel
└── package.json                # Dependencies and scripts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| [React-Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| Vanilla CSS | Custom design system and styling |
| JSON | Fake data source for tickets |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

### Installation

```bash
git clone https://github.com/farabi1/customer-support-app.git
cd customer-support-app
npm install
```

### Run Locally

```bash
npm run dev
# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## ☁️ Deployment (Vercel)

1. Push code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — click **Deploy**

The `vercel.json` handles SPA routing so page refreshes work correctly.

---

## 📊 Ticket Dataset

All data lives in `src/data/tickets.json`. Schema per ticket:

```json
{
  "id": "#1001",
  "title": "Login Issues - Can't Access Account",
  "description": "Full description of the customer issue...",
  "customer": "John Smith",
  "priority": "HIGH",
  "status": "Open",
  "createdAt": "2024-01-15"
}
```

| ID | Issue | Customer | Priority | Status |
|---|---|---|---|---|
| #1001 | Login Issues — Can't Access Account | John Smith | HIGH | Open |
| #1002 | Payment Failed — Card Declined | Sarah Johnson | HIGH | Open |
| #1003 | Unable to Download Invoice | Michael Brown | MEDIUM | In-Progress |
| #1004 | Incorrect Billing Address | Emily Davis | LOW | Open |
| #1005 | App Crash on Launch — Android 13 | David Wilson | HIGH | Open |
| #1006 | Refund Not Processed After 14 Days | Sophia Taylor | MEDIUM | In-Progress |
| #1007 | Two-Factor Authentication Not Working | James Anderson | HIGH | Open |
| #1008 | Unable to Update Profile Picture | Olivia Martinez | LOW | Open |
| #1009 | Subscription Auto-Renewal Toggle Disabled | Liam Thomas | MEDIUM | In-Progress |
| #1010 | Missing Order Confirmation Email | Isabella Garcia | MEDIUM | Open |
| #1011 | Account Locked After Too Many Login Attempts | Noah Williams | HIGH | Open |
| #1012 | Dark Mode Not Saving Preference | Ava Robinson | LOW | Open |

---

## 🧠 React Concepts — Q&A

### 1. What is JSX, and why is it used?

**JSX (JavaScript XML)** is a syntax extension for JavaScript that lets you write HTML-like markup directly inside JavaScript code. It was introduced by the React team to make component code more readable and intuitive.

```jsx
// JSX
const element = <h1 className="title">Hello, World!</h1>

// What Babel compiles it to
const element = React.createElement('h1', { className: 'title' }, 'Hello, World!')
```

JSX is used because:
- It visually resembles the output it produces, making UI code easier to reason about
- It keeps structure (HTML) and behaviour (JS) co-located inside a single component
- It has full JavaScript power — you can embed expressions, call functions, and map over arrays directly inside markup using `{}`

---

### 2. What is the difference between State and Props?

| | State | Props |
|---|---|---|
| **Owned by** | The component itself | The parent component |
| **Mutable?** | Yes — via `setState` / `useState` | No — read-only inside the receiving component |
| **Purpose** | Stores data that changes over time (counts, form inputs, lists) | Passes data and callbacks down from parent to child |
| **Triggers re-render?** | Yes, when updated | Yes, when the parent re-renders with new props |

```jsx
// Parent passes props; child owns its own state
function Parent() {
  return <TicketCard title="Login Issue" priority="HIGH" />
}

function TicketCard({ title, priority }) {       // props (read-only)
  const [selected, setSelected] = useState(false) // state (mutable)
  return <div onClick={() => setSelected(true)}>{title}</div>
}
```

---

### 3. What is the useState hook, and how does it work?

`useState` is a React hook that adds a reactive state variable to a functional component. When the state value changes, React re-renders the component with the new value.

```jsx
const [count, setCount] = useState(0)
//     ^value  ^setter    ^initial value
```

- `count` — the current state value (read it in JSX)
- `setCount(newValue)` — call this to update the state; React re-renders automatically
- `0` — the initial value, used only on the first render

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

In this project, `useState` manages: the `tickets` array (grid data), `taskItems` (in-progress panel), and `resolvedItems` (resolved list).

---

### 4. How can you share state between components in React?

The standard pattern is **lifting state up** — moving the shared state to the nearest common ancestor component and passing it down as props.

```jsx
function App() {
  // State lives here — the parent
  const [taskItems, setTaskItems] = useState([])

  function handleTicketClick(ticket) {
    setTaskItems(prev => [...prev, ticket])
  }

  return (
    <>
      {/* Both components receive what they need */}
      <TicketCard onClick={handleTicketClick} />
      <TaskStatusPanel taskItems={taskItems} />
    </>
  )
}
```

In this project, `App.jsx` owns all state and passes:
- `taskItems` and `resolvedItems` → `HeroBanner` (for counts) and `TaskStatusPanel` (for display)
- `handleTicketClick` and `handleComplete` → child components as callback props

For larger apps, state management libraries like Redux or React Context can replace manual lifting.

---

### 5. How is event handling done in React?

React uses **camelCase synthetic event handlers** attached directly to JSX elements as props. These wrap the browser's native events in a cross-browser consistent interface.

```jsx
// Native HTML (string handler)
<button onclick="handleClick()">Click</button>

// React (function reference)
<button onClick={handleClick}>Click</button>
```

Common patterns:

```jsx
// Inline arrow function (for passing arguments)
<button onClick={() => handleComplete(ticket.id)}>Complete</button>

// Preventing default behaviour
function handleSubmit(event) {
  event.preventDefault()
  // ...
}
<form onSubmit={handleSubmit}>...</form>
```

In this project, `onClick` handlers on `<article>` (ticket cards) and `<button>` (Complete) drive all interactivity. The event bubbles up through props to the `App` component where state is updated.

---

## 📄 License

Built as a course assignment. Fake data used for demonstration purposes only.
