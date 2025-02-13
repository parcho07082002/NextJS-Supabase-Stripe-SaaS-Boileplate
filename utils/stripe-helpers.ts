import { stripe } from './stripe';
import { supabase } from './supabase';

export async function getOrCreateStripeCustomer(userId: string, email: string) {
  // Check if user already has a Stripe customer ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabaseUUID: userId,
    },
  });

  // Update user profile with Stripe customer ID
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);

  if (updateError) {
    console.error('Error updating user profile with Stripe customer ID:', updateError);
    throw updateError;
  }

  return customer.id;
}

export async function getUserSubscriptionStatus(userId: string) {
  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  return subscription;
}

export async function getUserPurchases(userId: string) {
  const { data: purchases } = await supabase
    .from('user_purchases')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return purchases;
}
