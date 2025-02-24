'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import ApplicationList from './components/ApplicationList';
import DashboardSidebar from './components/DashboardSidebar/index';

export default function Dashboard() {
  const { loading } = useAuth();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const exampleApplications = [
    {
      company: 'Google',
      position: 'Senior Frontend Developer',
      status: 'Applied',
      statusColor: 'primary',
      location: 'Remote',
      date: 'Feb 20, 2025',
      logo: '🔍'
    },
    {
      company: 'Microsoft',
      position: 'Full Stack Engineer',
      status: 'Interview',
      statusColor: 'secondary',
      location: 'Hybrid',
      date: 'Feb 18, 2025',
      logo: '🪟'
    },
    {
      company: 'Apple',
      position: 'Software Engineer',
      status: 'Offer',
      statusColor: 'accent',
      location: 'On-site',
      date: 'Feb 15, 2025',
      logo: '🍎'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-base-content"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Applications</h1>
            <p className="text-base-content/70">Track and manage your job applications</p>
          </div>
          <div className="join">
            <button 
              className={`join-item btn btn-sm ${view === 'grid' ? 'btn-active' : ''}`}
              onClick={() => setView('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              className={`join-item btn btn-sm ${view === 'list' ? 'btn-active' : ''}`}
              onClick={() => setView('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <ApplicationList 
          applications={exampleApplications}
          view={view}
          onViewDetails={(id) => console.log('View details:', id)}
          onTrackProgress={(id) => console.log('Track progress:', id)}
        />
      </main>
    </div>
  );
}
