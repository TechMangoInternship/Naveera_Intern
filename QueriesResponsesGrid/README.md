# Queries & Responses Grid

A full-stack MERN module providing a dynamic, editable spreadsheet-like grid for managing queries and responses. Built with a schema-less data model so the same architecture can power any future grid.

## Architecture

```
server/                         # Express + MongoDB backend
├── config/db.js                # MongoDB connection
├── models/
│   ├── Grid.js                 # Grid metadata (columns definition)
│   └── GridRow.js              # Dynamic row data (schema-less Mixed)
├── services/gridService.js     # Business logic layer
├── controllers/gridController.js
├── routes/gridRoutes.js
├── middleware/errorHandler.js
└── server.js                   # Entry point

client/                         # React (Vite) frontend
├── src/
│   ├── api/gridApi.js          # Axios API integration
│   ├── hooks/useGrid.js        # Custom hook (state + CRUD + auto-save)
│   ├── components/
│   │   ├── Grid/               # Grid, GridRow, GridCell, GridToolbar
│   │   └── common/             # Loader, ErrorBanner, Toast
│   ├── App.jsx
│   └── index.css               # Dark theme design system
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Start MongoDB
```bash
mongod
```

### 2. Start the Backend
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:5000`.

### 3. Start the Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:3000` with an API proxy to the backend.

### 4. Seed the Default Grid
The grid auto-seeds on first load. You can also manually seed via:
```bash
curl -X POST http://localhost:5000/api/grids/seed
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grids` | List all grids |
| GET | `/api/grids/:id` | Get grid with all rows |
| POST | `/api/grids/seed` | Seed default grid |
| GET | `/api/grids/:id/rows?search=term` | Get rows with search |
| POST | `/api/grids/:id/rows` | Create a row |
| PUT | `/api/grids/rows/:rowId` | Update a row |
| DELETE | `/api/grids/rows/:rowId` | Delete a row |

## Features

- **Dynamic schema** — rows store any JSON shape via `mongoose.Schema.Types.Mixed`
- **Inline editing** — click any cell to edit, blur to auto-save
- **Auto-save** — 500ms debounced saves with optimistic UI updates
- **Search** — real-time filtering across all data fields
- **Keyboard navigation** — Enter to save, Escape to cancel, Shift+Enter for new lines
- **Toast notifications** — instant feedback on save/delete operations
- **Error handling** — retry banners, rollback on API failures
- **Dark theme** — premium UI with CSS custom properties
- **Responsive** — works on desktop and mobile

## Reusability

To create a new grid type (e.g., "Task Tracker"):

```javascript
// Call the seed endpoint with different columns
const grid = await gridService.getOrCreateGrid('Task Tracker', [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'assignee', label: 'Assignee', type: 'text' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'dueDate', label: 'Due Date', type: 'date' },
]);
```

The same React Grid component will render it automatically using the column definitions.

## Environment Variables

### Server (`.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dynamic-grid
NODE_ENV=development
```

### Client
The Vite dev server proxies `/api` to the backend. For production, set:
```
VITE_API_URL=https://your-api-domain.com/api
```
