import { NextResponse } from 'next/server';
import { createCustomerPortalSession } from '@/utils/stripe';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No associated Stripe customer found' },
        { status: 400 }
      );
    }

    // Create customer portal session
    const { url } = await createCustomerPortalSession(
      profile.stripe_customer_id,
      new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL).toString()
    );

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json(
      { error: 'Error creating customer portal session' },
      { status: 500 }
    );
  }
}
