# longhollow-web

Next.js 13 app using the `pages` router, plus Jest.

## Requirements

- Node.js 20 (see `package.json` engine)
- npm (bundled with Node.js)

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Common scripts

```bash
npm run dev          # Start the Next.js dev server
npm run build        # Production build
npm run start        # Run the production server
npm run lint         # ESLint
npm run format       # Prettier (writes files)
npm run test         # Jest in watch mode
```

## Project layout

- `pages` Routes and top-level screens (pages router)
- `components` App-specific UI components
- `ui-kit` Reusable, generic UI components
- `providers` App providers (state, GraphQL, etc.)
- `hooks` Custom React hooks
- `lib` Shared library code
- `config` Theme and app configuration
- `public` Static assets
- `__tests__` High-level smoke tests
