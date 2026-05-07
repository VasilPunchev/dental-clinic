# Dental Clinic Website

A modern dental clinic website built with Next.js, Tailwind CSS and Supabase.

The project includes a public website for a dental practice, an online appointment request form, a protected admin panel, appointment status management and WhatsApp contact actions.

## Features

- Modern responsive landing page
- Services section
- Real results gallery
- Contact section with Google Maps navigation
- Online appointment request form
- Frontend and backend validation
- Supabase database integration
- Protected admin panel
- Admin login/logout
- Appointment status management
  - New
  - Confirmed
  - Cancelled
- WhatsApp button with pre-filled patient message
- SEO metadata
- Sitemap and robots.txt
- Mobile-friendly layout

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Supabase
- Vercel-ready deployment

## Project Structure

```txt
src/app
├── page.js
├── layout.js
├── zapazi-chas
│   ├── page.js
│   └── layout.js
├── admin
│   ├── page.js
│   ├── login/page.js
│   ├── AppointmentActions.jsx
│   └── LogoutButton.jsx
├── api
│   ├── appointments/route.js
│   ├── appointments/[id]/route.js
│   └── admin
│       ├── login/route.js
│       └── logout/route.js
├── ResultsGallery.jsx
├── robots.js
└── sitemap.js
```

## Environment Variables

Create a `.env.local` file in the root of the project:

```env
SUPABASE_URL=
SUPABASE_SECRET_KEY=
ADMIN_PASSWORD=
```

Use `.env.example` as a template.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

## Admin Panel

The admin panel is available at:

```txt
/admin
```

It is protected with a password using `ADMIN_PASSWORD`.

Admins can:

- View appointment requests
- Confirm appointments
- Cancel appointments
- Open WhatsApp with a pre-filled message to the patient

## Database

The project uses Supabase for storing appointment requests.

Main table:

```txt
appointments
```

Example fields:

- id
- name
- phone
- service
- preferred_date
- preferred_hour
- message
- status
- created_at

## Appointment Flow

The appointment request flow works like this:

```txt
Patient submits the appointment form
↓
The request is validated on the frontend and backend
↓
The appointment request is saved in Supabase
↓
The admin sees the request in the protected admin panel
↓
The admin can confirm, cancel or contact the patient via WhatsApp
```

## Security Notes

Sensitive environment variables are not committed to GitHub.

The following files are ignored:

```txt
.env.local
node_modules
.next
.vercel
```

The admin panel is protected with an HTTP-only cookie after successful login.

## SEO

The project includes:

- Metadata
- Bulgarian language setting
- Sitemap
- Robots.txt
- Open Graph metadata

## Future Improvements

Planned improvements:

- Appointment availability system
- Working schedule management
- Blocked time slots
- Prevent double booking for confirmed appointments
- Better image optimization
- Final deployment with a custom domain

## Project Purpose

This project is designed as a real-world dental clinic appointment system and portfolio project.

It demonstrates:

- Building a modern frontend with Next.js
- Creating backend API routes
- Working with a real database
- Handling form validation
- Building a protected admin dashboard
- Managing appointment statuses
- Preparing a project for production deployment
