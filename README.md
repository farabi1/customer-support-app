# CS — Ticket System

A customer support ticket management web application built with **React** and **Vite**. This app allows support agents to view, track, and manage customer-reported issues in a clean and intuitive interface.

---

## 🚀 Live Demo

> _Deploy link will be added after Vercel deployment_

---

## 📸 Preview

The app has three main sections:

- **Navbar** — Quick navigation across the app with a "New Ticket" call-to-action
- **Stats Banner** — A gradient hero banner showing the live count of In-Progress and Resolved tasks
- **Ticket Grid + Task Status Panel** — Browse customer tickets on the left, manage task progress on the right

---

## 🧩 Features

- 📋 **Ticket List** — Displays 10 fake customer support tickets with title, description, status, priority, customer name, and date
- 🏷️ **Priority Badges** — Each ticket shows HIGH, MEDIUM, or LOW priority
- ✅ **Task Status Panel** — Click any ticket to add it to the Task Status panel
- 🟢 **Complete & Resolve** — Mark tasks as complete to move them into the Resolved section
- 📊 **Live Counters** — The hero banner updates dynamically as tasks move through In-Progress → Resolved
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile screens

---

## 🗂️ Project Structure

```
customer-support-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── HeroBanner.jsx      # Stats banner with In-Progress / Resolved counts
│   │   ├── TicketCard.jsx      # Individual ticket card component
│   │   ├── TaskStatusPanel.jsx # Right-side task management panel
│   │   └── Footer.jsx          # Page footer with links and social info
│   ├── data/
│   │   └── tickets.json        # Fake customer support ticket dataset (JSON)
│   ├── App.jsx                 # Root component with state management
│   ├── App.css                 # Component-level styles
│   ├── index.css               # Global design system and layout styles
│   └── main.jsx                # React entry point
├── index.html                  # HTML template with page title and meta tags
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel SPA routing config
└── package.json                # Project dependencies and scripts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| Vanilla CSS | Styling (custom design system) |
| JSON | Fake data source for tickets |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/farabi1/customer-support-app.git

# Navigate into the project folder
cd customer-support-app

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production-ready output will be in the `dist/` folder.

---

## ☁️ Deployment

This project is configured for **Vercel** deployment.

### Deploy via Vercel Dashboard

1. Push code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — just click **Deploy**

The `vercel.json` file handles SPA routing so page refreshes work correctly.

---

## 📊 Fake Data

All ticket data is stored in `src/data/tickets.json`. The dataset includes 10 customer support scenarios:

| Ticket ID | Issue | Priority | Status |
|---|---|---|---|
| #1001 | Login Issues — Can't Access Account | HIGH | Open |
| #1002 | Payment Failed — Card Declined | HIGH | Open |
| #1003 | Unable to Download Invoice | MEDIUM | In-Progress |
| #1004 | Incorrect Billing Address | LOW | Open |
| #1005 | App Crash on Launch | HIGH | Open |
| #1006 | Refund Not Processed | MEDIUM | In-Progress |
| #1007 | Two-Factor Authentication Issue | HIGH | Open |
| #1008 | Unable to Update Profile Picture | LOW | Open |
| #1009 | Subscription Auto-Renewal | MEDIUM | In-Progress |
| #1010 | Missing Order Confirmation Email | MEDIUM | Open |

---

## 📄 License

This project was built as a course assignment. All fake data and content is for demonstration purposes only.
