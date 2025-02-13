'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { getStripe } from '@/utils/stripe-client';
import Navigation from '@/app/components/Navigation';
import AnnouncementBanner from '@/app/components/AnnouncementBanner';

const PRICING_PLANS = [
  {
    name: 'Basic',
    price: '$9',
    interval: 'month',
    description: 'Perfect for getting started',
    features: [
      'Basic features',
      'Up to 1000 requests/month',
      'Community support',
      'Basic analytics'
    ],
    // TODO: Replace with your actual Stripe price ID from your Stripe dashboard
    priceId: 'price_1QrwNMQ5RsfiegveKQbXTJSy', // e.g. price_H5ggYwtDq4fbrJ
  },
  {
    name: 'Pro',
    price: '$29',
    interval: 'month',
    description: 'Best for growing businesses',
    features: [
      'All Basic features',
      'Up to 10,000 requests/month',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ],
    // TODO: Replace with your actual Stripe price ID from your Stripe dashboard
    priceId: 'price_1QrwNgQ5RsfiegveQx0Z7RBW', // e.g. price_H5ggYwtDq4fbrJ
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    interval: 'month',
    description: 'For large scale operations',
    features: [
      'All Pro features',
      'Unlimited requests',
      'Dedicated support',
      'Custom solutions',
      'SLA guarantee',
      'On-premise deployment'
    ],
    // TODO: Replace with your actual Stripe price ID from your Stripe dashboard
    priceId: 'price_1QrwNtQ5RsfiegvelMdykF55', // e.g. price_H5ggYwtDq4fbrJ
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (priceId: string) => {
    try {
      if (!priceId) {
        alert('This plan is not available yet. Please check back later.');
        return;
      }

      setLoading(priceId);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          mode: 'subscription',
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (!data.sessionId) throw new Error('No session ID returned from checkout');
      
      const { sessionId } = data;
      
      // Redirect to checkout using Stripe client
      const stripe = await getStripe();
      if (!stripe) throw new Error('Failed to load Stripe');
      
      const { error: checkoutError } = await stripe.redirectToCheckout({ sessionId });
      if (checkoutError) throw checkoutError;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <AnnouncementBanner />
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-base-content">Simple, Transparent Pricing</h1>
          <p className="text-xl text-base-content opacity-70">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card bg-base-200 shadow-xl ${
                plan.popular ? 'border-2 border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="badge badge-primary">Most Popular</span>
                </div>
              )}

              <div className="card-body">
                <h2 className="card-title text-2xl justify-center mb-2 text-base-content">
                  {plan.name}
                </h2>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-base-content">{plan.price}</span>
                  <span className="text-base-content opacity-70">/{plan.interval}</span>
                </div>
                <p className="text-center text-base-content opacity-70 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-base-content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="card-actions justify-center mt-auto">
                  <button
                    className={`btn btn-primary w-full ${
                      plan.popular ? '' : 'btn-outline'
                    }`}
                    onClick={() => handleSubscribe(plan.priceId)}
                    disabled={loading === plan.priceId}
                  >
                    {loading === plan.priceId ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
