'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface MiniCalendarProps {
  onDateSelect?: (date: Date) => void;
}

export default function MiniCalendar({ onDateSelect }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const monthData = useMemo(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return {
      firstDayOfMonth: new Date(year, month, 1).getDay(),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      monthName: currentDate.toLocaleString('default', { month: 'long' }),
      year
    };
  }, [currentDate]);

  // Previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // Next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  // Create calendar grid
  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < monthData.firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-1" />);
  }
  // Add cells for each day of the month
  for (let day = 1; day <= monthData.daysInMonth; day++) {
    const isSelected = 
      selectedDate.getDate() === day && 
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();
    
    const isToday = 
      new Date().getDate() === day &&
      new Date().getMonth() === currentDate.getMonth() &&
      new Date().getFullYear() === currentDate.getFullYear();

    calendarDays.push(
      <motion.button
        key={day}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleDateSelect(day)}
        className={`p-1 rounded-lg transition-colors ${
          isSelected
            ? 'bg-primary text-primary-content'
            : isToday
            ? 'bg-primary/20 text-primary'
            : 'hover:bg-primary/10'
        }`}
      >
        {day}
      </motion.button>
    );
  }

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {monthData.monthName} {monthData.year}
          </h3>
          <div className="flex gap-1">
            <button 
              className="btn btn-ghost btn-xs"
              onClick={goToPreviousMonth}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="btn btn-ghost btn-xs"
              onClick={goToNextMonth}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-base-content/70">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays}
        </div>
      </div>
    </div>
  );
}
