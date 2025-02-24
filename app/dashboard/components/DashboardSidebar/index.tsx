'use client';

import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import MiniCalendar from '../MiniCalendar';
import ApplicationStats from '../ApplicationStats';
import QuickActions from '../QuickActions/index';

export default function DashboardSidebar() {
  const { profile, signOut } = useAuth();

  const stats: Array<{
    status: string;
    count: number;
    percentage: number;
    color: 'primary' | 'secondary' | 'accent';
  }> = [
    { status: 'Applied', count: 12, percentage: 60, color: 'primary' },
    { status: 'Interview', count: 5, percentage: 25, color: 'secondary' },
    { status: 'Offer', count: 2, percentage: 10, color: 'accent' }
  ];

  const quickActions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'outline';
  }> = [
    {
      label: 'Add Application',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      onClick: () => console.log('Add Application clicked'),
      variant: 'primary'
    },
    {
      label: 'Generate Cover Letter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      onClick: () => console.log('Generate Cover Letter clicked'),
      variant: 'outline'
    }
  ];

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  return (
    <aside className="w-80 bg-base-200 min-h-screen p-6 flex flex-col gap-6">
      {/* User Profile */}
      <div className="flex items-center gap-4">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-12">
            <span className="text-lg">{profile?.email?.[0].toUpperCase()}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{profile?.email}</div>
          <div className="text-sm text-base-content/70">Job Seeker</div>
        </div>
      </div>

      {/* Mini Calendar */}
      <MiniCalendar onDateSelect={handleDateSelect} />

      {/* Application Categories */}
      <ApplicationStats stats={stats} />

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      <div className="mt-auto space-y-2">
        <ThemeSwitcher className="w-full btn btn-ghost justify-start gap-2" />
        <button onClick={signOut} className="w-full btn btn-ghost text-error justify-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}
