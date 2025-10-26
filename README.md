# TicketFlow (React)

This repository contains the React implementation of the TicketFlow demo application — a small, self-contained ticketing UI used for prototyping and demos.

## Frameworks & libraries
- React
- Vite (dev server / build)
- react-router-dom (routing)

## Quick start
1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open the app in your browser (default):

http://localhost:5173

## Important app rules (implemented)

- Authentication is simulated with localStorage. The session token is stored under the key `ticketapp_session`. User info is stored under `ticketapp_user`.
- Protected routes: `/dashboard` and `/tickets/:id` are guarded and will redirect unauthenticated users to `/auth/login`.
- Tickets persist to localStorage using the key `tf:tickets:v1` so they survive page reloads.

## Data model and validation

- Ticket status values (canonical): `open`, `in_progress`, `closed`.
	- UI colors are mapped as: `open` → green, `in_progress` → amber, `closed` → gray.
- Validation rules enforced in `TicketForm`:
	- `title` (required)
	- `status` (required, must be one of `open`, `in_progress`, `closed`)
	- `priority` (optional, must be one of `Low`, `Medium`, `High`)
	- `description` (optional, max length 1000 chars)
- Validation errors display inline beneath the relevant field. Critical errors (auth failure, load failures) are shown as toasts.

## Error handling & UX

- Invalid form inputs: displayed inline in the form and surfaced as a toast when appropriate.
- Unauthorized access: protected routes redirect to `/auth/login`. The Login page shows a message when redirected from a protected page.
- Simulated network/API failures are surfaced as friendly messages via the Notification (toast) system, e.g.:
	- “Your session has expired — please log in again.”
	- “Failed to load tickets. Please retry.”

## Security & authorization notes

- This is a demo. The localStorage-based session token is not secure for production use. The demo stores the session token under `ticketapp_session` only to satisfy project constraints.
- Logout clears the session token and redirects users to the landing page.

## Layout & design rules (applies to this React app)

These visual/layout rules are implemented to match the project requirements and are intended to be consistent across other framework ports (Vue, Twig):

- Max Width: Content is centered with a global `.container` rule set to `max-width: 1440px` and automatic horizontal centering. (See `src/index.css`.)
- Hero: the landing hero includes a bottom SVG wave and decorative circle elements overlapping the hero area.
- Card layout: stats, tickets and feature blocks use card-like boxes with subtle shadows and rounded corners.
- Decorative elements: at least two circular decorations are present across the layout.
- Responsive:
	- Mobile — stacked layout and collapsible navigation.
	- Tablet/Desktop — multi-column grid and consistent spacing.

## Files & structure (of interest)

- `src/services/auth.js` — mock authentication (signup/login/logout) using `ticketapp_session` key
- `src/context/TicketContext.jsx` — ticket CRUD, local validation, localStorage persistence
- `src/context/NotificationContext.jsx` — toast notification provider and renderer
- `src/components/TicketForm.jsx` — ticket create/update form with validation
- `src/components/TicketList.jsx`, `TicketItem.jsx` — table/list rendering, actions
- `src/pages/Dashboard.jsx` — dashboard + search/filter + table
- `src/pages/TicketPage.jsx` — ticket detail page

## Accessibility

- The app uses semantic HTML, visible focus states, and color-coded badges. The design aims for adequate contrast; please run an accessibility audit (axe/lighthouse) if you will use this beyond a demo.

## Testing and future improvements

- The project does not include automated tests by default. Recommended next steps:
	- Add unit tests for `TicketForm` validation (vitest/jest).
	- Add integration tests for auth flow and protected routes.
	- Add an undo action for destructive operations (delete/close) as a UX improvement.

## Notes

- This repository is a demo and intentionally simple. For production usage, replace localStorage auth with a real backend, secure tokens, and server-side validation.

## License

- MIT
