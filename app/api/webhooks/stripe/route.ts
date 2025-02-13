import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe, verifyStripeWebhookSignature } from '@/utils/stripe';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  try {
    const event = verifyStripeWebhookSignature(body, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (session.mode === 'subscription' && subscriptionId) {
          // Fetch subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0].price.id;

          // Update user's subscription status in Supabase
          const { error: updateError } = await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: session.client_reference_id,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              stripe_price_id: priceId,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000),
            });

          if (updateError) throw updateError;
        }

        if (session.mode === 'payment') {
          // Handle one-time payment completion
          const { error: insertError } = await supabase
            .from('user_purchases')
            .insert({
              user_id: session.client_reference_id,
              stripe_customer_id: customerId,
              stripe_checkout_session_id: session.id,
              amount_total: session.amount_total,
              payment_status: session.payment_status,
            });

          if (insertError) throw insertError;
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Update subscription status in database
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (updateError) throw updateError;
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        
        // Handle failed payment (e.g., notify user, update status)
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status: 'past_due',
          })
          .eq('stripe_subscription_id', invoice.subscription);

        if (updateError) throw updateError;
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
