# Modern SaaS Boilerplate

A production-ready SaaS boilerplate built with modern technologies to help you kickstart your next SaaS project quickly.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Authentication & Database**: [Supabase](https://supabase.com)
- **Payments**: [Stripe](https://stripe.com)
- **Styling**: [TailwindCSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)

## Features

- 🔐 Authentication with Supabase (Email + Google OAuth)
- 💳 Subscription payments with Stripe
- 🎨 Modern UI with TailwindCSS and DaisyUI
- 📱 Fully responsive design
- 🔒 Type-safe with TypeScript
- 🚀 Fast builds with Turbopack

## Getting Started

1. Clone this repository
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials
   - Fill in your Stripe credentials
   - Configure Google OAuth (optional)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=

# Google OAuth (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
