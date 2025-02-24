"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAboutClick = (e: React.MouseEvent) => {
    if (!mounted) return;
    e.preventDefault();
    if (!isHome) {
      router.push("/#features");
      return;
    }
    
    const featuresSection = document.querySelector("#features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeaturesClick = (e: React.MouseEvent) => {
    if (!mounted) return;
    e.preventDefault();
    if (!isHome) {
      router.push("/#features");
      return;
    }

    const featuresSection = document.querySelector("#features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) {
    return (
      <nav className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="text-xl font-bold text-base-content">
            Joblio
          </div>
        </div>
        <div className="navbar-end">
          <div className="btn btn-ghost btn-circle">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
          <div className="btn btn-primary ml-4 font-medium text-primary-content rounded-full">
            Get Started
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
            <li><a onClick={handleFeaturesClick} className="font-medium text-base-content hover:text-primary transition-colors">Features</a></li>
            <li><Link href="/pricing" className="font-medium text-base-content hover:text-primary transition-colors">Pricing</Link></li>
            <li><a onClick={handleAboutClick} className="font-medium text-base-content hover:text-primary transition-colors">About</a></li>
          </ul>
        </div>
        <Link href="/" className="px-4 py-2 text-xl font-bold text-base-content hover:text-base-content/80 cursor-pointer transition-colors">
          Joblio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a 
              onClick={handleFeaturesClick}
              className="font-medium text-base-content hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </a>
          </li>
          <li>
            <Link 
              href="/pricing"
              className="font-medium text-base-content hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <a 
              onClick={handleAboutClick}
              className="font-medium text-base-content hover:text-primary transition-colors cursor-pointer"
            >
              About
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <Link 
          href="/pricing"
          className="btn btn-primary ml-4 font-medium text-primary-content rounded-full"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
