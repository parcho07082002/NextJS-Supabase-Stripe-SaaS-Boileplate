import ThemeSwitcher from "./components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 backdrop-blur-md">
              <li><a className="font-medium text-base-content">Features</a></li>
              <li><a className="font-medium text-base-content">Pricing</a></li>
              <li><a className="font-medium text-base-content">About</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold text-primary hover:text-primary group">
            SaaSBP
            <div className="h-1 w-0 group-hover:w-full transition-all duration-300 bg-primary absolute bottom-0" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a className="font-medium text-base-content hover:text-primary rounded-full hover:bg-base-200 transition-colors">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeSwitcher />
          <a className="btn btn-primary ml-4 font-medium text-primary-content rounded-full">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="hero min-h-[90vh] relative">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          
          <div className="hero-content text-center max-w-6xl px-4 relative">
            <div>
              <div className="flex items-center justify-center mb-8 animate-fade-in">
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-base-200 text-base-content/80">
                  🚀 Launching Soon
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-4 animate-fade-in [text-wrap:balance]">
                Your Ultimate SaaS Boilerplate
              </h1>
              <p className="py-8 text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto animate-fade-in-up [text-wrap:balance]">
                Launch your SaaS project faster with our production-ready boilerplate.
                Includes authentication, billing, user management, and more.
              </p>
              <div className="flex gap-4 justify-center items-center flex-col sm:flex-row animate-fade-in-up">
                <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 text-primary-content rounded-full group relative overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button className="btn btn-outline btn-lg rounded-full hover:bg-base-200 border-2 hover:border-primary hover:text-primary transition-all duration-300">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentication",
                description: "Secure user authentication with multiple providers",
                gradient: "from-primary/20 to-secondary/20"
              },
              {
                title: "Billing",
                description: "Integrated payment processing and subscription management",
                gradient: "from-secondary/20 to-accent/20"
              },
              {
                title: "User Management",
                description: "Complete user management and role-based access control",
                gradient: "from-accent/20 to-primary/20"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="card-body relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <h2 className="card-title text-primary text-2xl">{feature.title}</h2>
                    <p className="text-base-content/70">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="footer-title opacity-100">Services</span> 
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Branding</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Design</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Marketing</a>
          </div> 
          <div>
            <span className="footer-title opacity-100">Company</span> 
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">About us</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Contact</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Jobs</a>
          </div> 
          <div>
            <span className="footer-title opacity-100">Legal</span> 
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Terms of use</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Privacy policy</a>
            <a className="link link-hover opacity-80 hover:opacity-100 transition-opacity">Cookie policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
