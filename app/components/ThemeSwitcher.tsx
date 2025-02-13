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
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {theme === 'dark' ? (
          <Moon className="h-5 w-5" />
        ) : theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
        <li>
          <button
            className={`${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun className="h-4 w-4" /> Light
          </button>
        </li>
        <li>
          <button
            className={`${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon className="h-4 w-4" /> Dark
          </button>
        </li>
        <li>
          <button
            className={`${theme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <Monitor className="h-4 w-4" /> System
          </button>
        </li>
      </ul>
    </div>
  );
}
