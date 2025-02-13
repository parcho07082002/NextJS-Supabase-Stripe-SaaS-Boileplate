import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { getUserSubscriptionStatus } from '@/utils/stripe-helpers';

export async function GET() {
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

    // Get subscription status
    const subscription = await getUserSubscriptionStatus(session.user.id);

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Error fetching subscription status' },
      { status: 500 }
    );
  }
}
