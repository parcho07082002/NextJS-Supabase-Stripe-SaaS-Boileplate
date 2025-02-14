'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    try {
      // Get initial theme from localStorage
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      
      // If no theme is set, default to system and save it
      if (!savedTheme) {
        localStorage.setItem('theme', 'system');
        setTheme('system');
        return;
      }
      
      setTheme(savedTheme);
    } catch (e) {
      console.error('Failed to get initial theme:', e);
      setTheme('system');
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    try {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Let the layout script handle the theme application
      const finalTheme = newTheme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : newTheme;
      
      document.documentElement.setAttribute('data-theme', finalTheme);
    } catch (e) {
      console.error('Failed to change theme:', e);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-base-content hover:bg-base-200">
        {theme === 'dark' ? (
          <Moon className="h-5 w-5" />
        ) : theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52">
        <li>
          <button
            className={`flex items-center gap-2 text-base-content hover:bg-base-300 ${theme === 'light' ? 'active bg-base-300' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun className="h-4 w-4" /> Light
          </button>
        </li>
        <li>
          <button
            className={`flex items-center gap-2 text-base-content hover:bg-base-300 ${theme === 'dark' ? 'active bg-base-300' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon className="h-4 w-4" /> Dark
          </button>
        </li>
        <li>
          <button
            className={`flex items-center gap-2 text-base-content hover:bg-base-300 ${theme === 'system' ? 'active bg-base-300' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <Monitor className="h-4 w-4" /> System
          </button>
        </li>
      </ul>
    </div>
  );
}
