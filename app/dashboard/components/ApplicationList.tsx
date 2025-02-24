'use client';

import { motion } from 'framer-motion';

interface Application {
  company: string;
  position: string;
  status: string;
  statusColor: string;
  location: string;
  date: string;
  logo: string;
}

interface ApplicationListProps {
  applications: Application[];
  view: 'grid' | 'list';
  onViewDetails: (id: number) => void;
  onTrackProgress: (id: number) => void;
}

export default function ApplicationList({ 
  applications, 
  view, 
  onViewDetails, 
  onTrackProgress 
}: ApplicationListProps) {
  return (
    <div className={`grid ${
      view === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
        : 'grid-cols-1'
    } gap-6`}>
      {applications.map((app, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`card bg-base-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
            view === 'list' ? 'flex-row' : ''
          }`}
        >
          <div className="card-body gap-4">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{app.logo}</div>
              <div className="flex-1 min-w-0">
                <h3 className="card-title text-lg group-hover:text-primary transition-colors">
                  {app.position}
                </h3>
                <p className="text-base-content/70">{app.company}</p>
              </div>
              <div className={`badge badge-${app.statusColor}`}>
                {app.status}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {app.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Applied on {app.date}
              </div>
            </div>

            <div className="card-actions justify-end mt-2">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => onViewDetails(i)}
              >
                View Details
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onTrackProgress(i)}
              >
                Track Progress
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
