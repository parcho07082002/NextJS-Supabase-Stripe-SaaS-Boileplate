import Navigation from "./components/Navigation";
import Link from "next/link";
import AnnouncementBanner from "./components/AnnouncementBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      <AnnouncementBanner />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      <Navigation />

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
                <Link 
                  href="/login"
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 text-primary-content rounded-full group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <button className="btn btn-outline btn-lg rounded-full hover:bg-base-200 border-2 hover:border-primary hover:text-primary transition-all duration-300">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div id="features" className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Powered by Modern Tech Stack
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Built with the latest technologies to ensure scalability, performance, and developer productivity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Next.js 15",
                description: "Latest Next.js features including App Router, Server Components, and Turbopack",
                gradient: "from-primary/20 to-secondary/20",
                icon: "🚀"
              },
              {
                title: "Supabase",
                description: "Powerful PostgreSQL database with built-in authentication and real-time subscriptions",
                gradient: "from-secondary/20 to-accent/20",
                icon: "🔐"
              },
              {
                title: "Stripe Payments",
                description: "Complete subscription management and payment processing integration",
                gradient: "from-accent/20 to-primary/20",
                icon: "💳"
              },
              {
                title: "TypeScript",
                description: "Full type safety and enhanced developer experience with TypeScript",
                gradient: "from-primary/20 to-accent/20",
                icon: "📘"
              },
              {
                title: "TailwindCSS + DaisyUI",
                description: "Beautiful, responsive UI with utility-first CSS and component library",
                gradient: "from-secondary/20 to-primary/20",
                icon: "🎨"
              },
              {
                title: "React 19",
                description: "Latest React features including concurrent rendering and hooks",
                gradient: "from-accent/20 to-secondary/20",
                icon: "⚛️"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="card-body relative overflow-hidden p-6">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <h2 className="card-title text-primary text-xl">{feature.title}</h2>
                    </div>
                    <p className="text-base-content/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-base-content/60">
        <div className="h-px w-full max-w-xl mx-auto mb-8 bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />
        © {new Date().getFullYear()} SaaSBP. All rights reserved.
      </footer>
    </div>
  );
}
