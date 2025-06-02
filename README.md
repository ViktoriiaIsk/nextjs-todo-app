# Next.js Todo App with Supabase

A modern todo application built with Next.js 15, React 19, useActionState, and Supabase database.

## Features

- ✅ **useActionState Integration**: Server-side validation with React 19
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🚀 **Performance**: Optimized with Next.js 15 and Turbopack
- 🗄️ **Supabase Database**: Cloud PostgreSQL with real-time features
- 📱 **Responsive Design**: Works on mobile and desktop
- 🔒 **Type Safety**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 15.3.2
- **React**: React 19 with useActionState
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v3.4.0 + shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. Supabase account (free)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ViktoriiaIsk/nextjs-todo-app.git
   cd nextjs-todo-app
   git checkout data-source-replacement
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Supabase:**

   - Create a new project at [supabase.com](https://supabase.com)
   - Run this SQL in the SQL Editor:

   ```sql
   CREATE TABLE todos (
     id BIGSERIAL PRIMARY KEY,
     task TEXT NOT NULL CHECK (char_length(task) <= 100),
     checked BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow all operations" ON todos FOR ALL USING (true);

   CREATE INDEX idx_todos_created_at ON todos(created_at DESC);
   CREATE INDEX idx_todos_checked ON todos(checked);
   ```

4. **Environment Variables:**
   Create `.env.local` file:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## Deployment

The app is deployed on Vercel and automatically updates when changes are pushed to the `data-source-replacement` branch.

### Deploy Your Own

1. Fork this repository
2. Connect your fork to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Architecture

- **Server Actions**: Handle form submissions and database operations
- **Client Components**: Interactive UI with useActionState validation
- **Supabase**: PostgreSQL database with automatic APIs
- **Type Safety**: Full TypeScript implementation with auto-generated types

## Teacher Assignment

This project fulfills the requirements:

1. ✅ **Mandatory**: useActionState implementation with validation
2. ✅ **Optional**: MySQL replacement with Supabase + Vercel deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
