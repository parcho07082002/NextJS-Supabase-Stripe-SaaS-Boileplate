"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleAboutClick = (e: React.MouseEvent) => {
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

  return (
    <nav className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 backdrop-blur-md">
            <li><a onClick={handleFeaturesClick} className="font-medium text-base-content">Features</a></li>
            <li><Link href="/pricing" className="font-medium text-base-content">Pricing</Link></li>
            <li><a onClick={handleAboutClick} className="font-medium text-base-content">About</a></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary hover:text-primary group">
          SaaSBP
          <div className="h-1 w-0 group-hover:w-full transition-all duration-300 bg-primary absolute bottom-0" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a 
              onClick={handleFeaturesClick}
              className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors cursor-pointer"
            >
              Features
            </a>
          </li>
          <li>
            <Link 
              href="/pricing"
              className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <a 
              onClick={handleAboutClick}
              className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors cursor-pointer"
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
