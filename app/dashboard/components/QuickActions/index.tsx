'use client';

import React from 'react';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'outline';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="space-y-2">
      {actions.map((action, index) => (
        <button 
          key={index}
          onClick={action.onClick}
          className={`btn ${
            action.variant === 'outline' ? 'btn-outline' : 'btn-primary'
          } w-full justify-start gap-2`}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
