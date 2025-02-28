import { loadStripe } from '@stripe/stripe-js';

// Client-side Stripe promise
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};
