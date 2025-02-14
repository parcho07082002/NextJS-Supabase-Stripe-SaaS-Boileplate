'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Calendar
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={previousMonth}
              className="btn btn-ghost btn-sm btn-square text-base-content"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-base-content font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={nextMonth}
              className="btn btn-ghost btn-sm btn-square text-base-content"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2 text-base-content/70">
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <button key={`empty-${index}`} className="btn btn-ghost btn-sm p-1 h-8 min-h-0 text-base-content/20 cursor-default">
              {" "}
            </button>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            return (
              <button
                key={day}
                className={`btn btn-sm p-1 h-8 min-h-0 ${
                  isToday(day)
                    ? 'btn-primary text-primary-content'
                    : 'btn-ghost text-base-content hover:bg-base-300'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 