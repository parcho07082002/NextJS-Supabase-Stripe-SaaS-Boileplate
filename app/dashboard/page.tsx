'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

interface UserProfile {
  email: string;
  stripe_customer_id?: string;
}

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
  stripe_price_id: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [managingSubscription, setManagingSubscription] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          throw new Error('Not authenticated');
        }

        // Fetch user profile and subscription
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        
        setProfile(profileData);

        // Fetch subscription status from API
        const response = await fetch('/api/stripe/subscription');
        const { subscription: subscriptionData } = await response.json();
        setSubscription(subscriptionData);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleManageSubscription = async () => {
    try {
      setManagingSubscription(true);
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setManagingSubscription(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-100">
      <nav className="navbar bg-base-200">
        <div className="flex-1">
          <span className="text-xl font-bold">Dashboard</span>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <span>{profile?.email}</span>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
              <li><button onClick={handleSignOut}>Sign out</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="card bg-base-200 shadow-xl col-span-full">
            <div className="card-body">
              <h2 className="card-title">Welcome! 👋</h2>
              <p>This is your dashboard where you can manage your account and access all features.</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Profile Information</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> {profile?.email}</p>
                <p>
                  <span className="font-semibold">Subscription Status:</span>{' '}
                  <span className={`badge ${subscription?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {subscription?.status || 'No active subscription'}
                  </span>
                </p>
                {subscription?.current_period_end && (
                  <p>
                    <span className="font-semibold">Next Billing Date:</span>{' '}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <button className="btn btn-primary w-full">Update Profile</button>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Subscription Management</h2>
              <div className="space-y-4">
                {subscription?.status === 'active' ? (
                  <>
                    <p className="text-success">Your subscription is active</p>
                    <button
                      className="btn btn-primary w-full"
                      onClick={handleManageSubscription}
                      disabled={managingSubscription}
                    >
                      {managingSubscription ? (
                        <span className="loading loading-spinner" />
                      ) : (
                        'Manage Subscription'
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-warning">No active subscription</p>
                    <a
                      href="/pricing"
                      className="btn btn-primary w-full"
                    >
                      View Plans
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Quick Actions</h2>
              <div className="space-y-2">
                <button className="btn btn-outline w-full">View Settings</button>
                <button className="btn btn-outline w-full">View Documentation</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
