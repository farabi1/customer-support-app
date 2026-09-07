# CS — Ticket System

A customer support ticket management app built with React and Vite. You can view customer issues, add them to a task panel, and mark them as complete.

## Live Demo

[https://customer-support-app-one.vercel.app](https://customer-support-app-one.vercel.app)

GitHub: [farabi1/customer-support-app](https://github.com/farabi1/customer-support-app)

---

## Features

- View all customer support tickets in a 2-column card layout
- Each card shows the ticket title, description, priority, status, customer name and date
- Click a card to add it to the Task Status panel — the In-Progress count goes up
- Click the Complete button to resolve a ticket — it disappears from the grid and moves to the Resolved section
- Toast notifications on every action using react-toastify
- Responsive layout for mobile and desktop

---

## Tech Stack

- React 19
- Vite
- Vanilla CSS
- react-toastify
- JSON for ticket data

---

## Project Structure

```
src/
  components/
    Navbar.jsx
    HeroBanner.jsx
    TicketCard.jsx
    TaskStatusPanel.jsx
    Footer.jsx
  data/
    tickets.json
  App.jsx
  index.css
```

---

## Running Locally

```bash
git clone https://github.com/farabi1/customer-support-app.git
cd customer-support-app
npm install
npm run dev
```

---

## Ticket Data

Tickets are stored in `src/data/tickets.json`. Each ticket has:

```json
{
  "id": "#1001",
  "title": "Login Issues - Can't Access Account",
  "description": "...",
  "customer": "John Smith",
  "priority": "HIGH",
  "status": "Open",
  "createdAt": "2024-01-15"
}
```

---

## React Q&A

### What is JSX, and why is it used?

JSX stands for JavaScript XML. It lets you write HTML-like code inside JavaScript. Instead of calling `React.createElement()` for every element, you can just write `<h1>Hello</h1>` directly in your JS file. It makes the code much easier to read and write, and you can still use JavaScript expressions inside `{}`.

```jsx
const element = <h1 className="title">Hello!</h1>
```

Babel converts this to regular JavaScript behind the scenes when you build the project.

---

### What is the difference between State and Props?

**Props** are values passed into a component from its parent. You can read them but not change them inside the child component.

**State** is data that lives inside a component and can change over time. When state changes, React re-renders the component.

```jsx
// title and priority come from props (passed by parent)
function TicketCard({ title, priority }) {
  // selected is state — this component owns it
  const [selected, setSelected] = useState(false)

  return <div onClick={() => setSelected(true)}>{title}</div>
}
```

The main difference is ownership. Props are owned by the parent, state is owned by the component itself.

---

### What is the useState hook, and how does it work?

`useState` is a built-in React hook that lets you add state to a functional component. You call it with an initial value and it gives you back the current value and a function to update it.

```jsx
const [count, setCount] = useState(0)
```

Every time you call `setCount`, React re-renders the component with the new value. In this project I used useState three times in App.jsx — one for the tickets list, one for the task items, and one for resolved items.

---

### How can you share state between components in React?

You lift the state up to the nearest common parent and pass it down as props. For example in this project, `App.jsx` owns all the state. It passes the ticket list to `TicketCard` and the task items to `TaskStatusPanel`. When a card is clicked, the function passed as a prop updates the state in App, which causes both components to re-render.

```jsx
function App() {
  const [taskItems, setTaskItems] = useState([])

  function handleClick(ticket) {
    setTaskItems(prev => [...prev, ticket])
  }

  return (
    <>
      <TicketCard onClick={handleClick} />
      <TaskStatusPanel taskItems={taskItems} />
    </>
  )
}
```

---

### How is event handling done in React?

In React you attach event handlers directly on JSX elements using camelCase names like `onClick`, `onChange`, `onSubmit`. You pass a function reference, not a string like in HTML.

```jsx
// HTML way
<button onclick="doSomething()">Click</button>

// React way
<button onClick={doSomething}>Click</button>

// With arguments
<button onClick={() => handleComplete(ticket.id)}>Complete</button>
```

React wraps the browser's native events in a SyntheticEvent so they work the same across all browsers.
