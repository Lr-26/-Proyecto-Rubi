# Rubi Lentes

Luxury e-commerce catalog for an Argentine boutique selling sunglasses, bags, and wallets.

**Live site:** [proyecto-rubi.vercel.app](https://proyecto-rubi.vercel.app)

## Features

- **AI Chatbot** — Google Gemini-powered assistant to help customers find products
- **WhatsApp Commerce** — Direct integration with WhatsApp for sales conversations
- **Product Management** — Admin dashboard for inventory, stock status, and product CRUD
- **Multi-categoría** — Organized in Lentes, Carteras, and Billeteras with subcategories
- **Lead Capture** — Backend API with Supabase for customer registration and contact forms
- **Responsive Design** — Mobile-first luxury aesthetic with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Express.js (Vercel Serverless) |
| Database | Supabase (PostgreSQL) |
| Auth & Storage | Firebase |
| AI | Google Gemini |
| Email | Resend |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_ADMIN_PASSWORD=your_secure_password
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
```

### Install & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Product catalog and initial data
├── pages/          # Route-level page components
├── utils/          # Helpers and AI tool definitions
├── firebase/       # Firebase configuration
└── App.tsx         # Root component with routing
api/
└── index.js        # Express serverless backend
public/
└── assets/         # Static images and product photos
```

## Deployment

Deploys to [Vercel](https://vercel.com) via Git push. The `api/` directory is auto-detected as a serverless function.

## License

Private — All rights reserved.