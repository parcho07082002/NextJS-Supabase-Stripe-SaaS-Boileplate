'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get the hash if it exists
        const hashParams = window.location.hash
          ? Object.fromEntries(
              new URLSearchParams(
                window.location.hash.substring(1) // Remove the # character
              ).entries()
            )
          : null;

        if (hashParams?.access_token) {
          // Set the session with the hash parameters
          const { error } = await supabase.auth.setSession({
            access_token: hashParams.access_token,
            refresh_token: hashParams.refresh_token,
          });
          if (error) throw error;
        }

        // Get the user after setting the session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (user) {
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select()
            .eq('id', user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }

          // If profile doesn't exist, create it
          if (!profile) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  email: user.email,
                },
              ]);

            if (insertError) throw insertError;
          }
        }

        // Redirect to dashboard after successful authentication and profile creation
        router.push('/dashboard');
      } catch (error) {
        console.error('Error during auth redirect:', error);
        router.push('/login?error=Authentication%20failed');
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );
}
