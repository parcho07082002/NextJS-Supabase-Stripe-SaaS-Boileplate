'use client';

import Navigation from "./components/Navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="hero min-h-[90vh] relative">
          {/* Gradient Decorations */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          
          <div className="hero-content text-center max-w-7xl px-4 relative">
            <div>
              {/* Social Proof */}
              <div className="flex items-center justify-center gap-8 mb-12 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="rating rating-sm">
                    <input type="radio" className="mask mask-star-2 bg-secondary" checked readOnly />
                    <input type="radio" className="mask mask-star-2 bg-secondary" checked readOnly />
                    <input type="radio" className="mask mask-star-2 bg-secondary" checked readOnly />
                    <input type="radio" className="mask mask-star-2 bg-secondary" checked readOnly />
                    <input type="radio" className="mask mask-star-2 bg-secondary" checked readOnly />
                  </div>
                  <span className="text-sm opacity-75">4.9/5 from 2,000+ reviews</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="user" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="user" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="user" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm opacity-75">Trusted by 50,000+ users</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold pb-4 animate-fade-in [text-wrap:balance]">
                Your Job Search,{" "}
                <span className="text-secondary">Simplified</span>
              </h1>
              <p className="py-8 text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto animate-fade-in-up [text-wrap:balance]">
                One platform to track applications, create AI-powered resumes, and land your dream job faster. Join thousands of successful job seekers today.
              </p>
              <div className="flex gap-4 justify-center items-center flex-col sm:flex-row animate-fade-in-up">
                <Link 
                  href="/register"
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 text-primary-content rounded-full group relative overflow-hidden"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link href="/pricing" className="btn btn-outline btn-lg rounded-full hover:bg-base-200 border-2 hover:border-primary hover:text-primary transition-all duration-300">
                  View Pricing
                </Link>
              </div>

              {/* Stats Section */}
              <div className="stats shadow-lg bg-base-200/50 backdrop-blur-sm mt-16 animate-fade-in-up">
                <div className="stat place-items-center">
                  <div className="stat-title">Applications Tracked</div>
                  <div className="stat-value text-primary">1M+</div>
                  <div className="stat-desc">Since 2024</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Success Rate</div>
                  <div className="stat-value text-secondary">89%</div>
                  <div className="stat-desc">Interview callbacks</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Time Saved</div>
                  <div className="stat-value text-accent">5hrs</div>
                  <div className="stat-desc">Per application</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative py-32">
          <div className="max-w-7xl mx-auto">
            {/* AI Resume Builder Feature */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative mb-40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-4">
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold mb-6">AI-Powered Resume Builder</h2>
                    <p className="text-xl text-base-content/70 mb-8 [text-wrap:balance]">
                      Our AI analyzes job descriptions and tailors your resume to match the requirements perfectly, increasing your chances of landing interviews.
                    </p>
                    <ul className="space-y-4">
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">✓</div>
                        <span className="text-lg">ATS-optimized formatting</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">✓</div>
                        <span className="text-lg">Keyword optimization</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">✓</div>
                        <span className="text-lg">Industry-specific templates</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                </div>
                <div className="relative lg:h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl"></div>
                  <div className="relative h-full rounded-3xl overflow-hidden bg-base-200 shadow-2xl">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-base-content/20"></div>
                        <div className="w-3 h-3 rounded-full bg-base-content/20"></div>
                        <div className="w-3 h-3 rounded-full bg-base-content/20"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-8 bg-base-content/10 rounded-lg w-3/4"></div>
                        <div className="h-4 bg-base-content/10 rounded-lg w-1/2"></div>
                        <div className="h-4 bg-base-content/10 rounded-lg w-5/6"></div>
                        <div className="h-32 bg-base-content/10 rounded-lg"></div>
                        <div className="h-4 bg-base-content/10 rounded-lg w-2/3"></div>
                        <div className="h-4 bg-base-content/10 rounded-lg w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interview AI Coach Feature */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative mb-40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-4">
                <div className="relative lg:h-[600px] order-2 lg:order-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-3xl"></div>
                  <div className="relative h-full rounded-3xl overflow-hidden bg-base-200 shadow-2xl">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-base-content/10"></div>
                          <div>
                            <div className="h-4 bg-base-content/10 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-base-content/10 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-base-content/10"></div>
                          <div className="w-8 h-8 rounded-full bg-base-content/10"></div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-base-content/10 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="h-20 bg-base-content/10 rounded-2xl"></div>
                          </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                          <div className="flex-1">
                            <div className="h-16 bg-primary/10 rounded-2xl"></div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-base-content/10 flex-shrink-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 order-1 lg:order-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold mb-6">Interview AI Coach</h2>
                    <p className="text-xl text-base-content/70 mb-8 [text-wrap:balance]">
                      Practice with our AI interviewer that provides real-time feedback and helps you improve your interview skills.
                    </p>
                    <ul className="space-y-4">
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">✓</div>
                        <span className="text-lg">Real-time feedback</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">✓</div>
                        <span className="text-lg">Industry-specific questions</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">✓</div>
                        <span className="text-lg">Performance analytics</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Application Tracking Feature */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-4">
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold mb-6">Smart Application Tracking</h2>
                    <p className="text-xl text-base-content/70 mb-8 [text-wrap:balance]">
                      Keep track of all your job applications, interviews, and follow-ups in one organized dashboard.
                    </p>
                    <ul className="space-y-4">
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                        <span className="text-lg">Visual timeline view</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                        <span className="text-lg">Automated reminders</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                        <span className="text-lg">Progress analytics</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                </div>
                <div className="relative lg:h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 rounded-3xl"></div>
                  <div className="relative h-full rounded-3xl overflow-hidden bg-base-200 shadow-2xl">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-8">
                        <div className="space-y-2">
                          <div className="h-6 bg-base-content/10 rounded-lg w-32"></div>
                          <div className="h-4 bg-base-content/10 rounded-lg w-24"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg bg-base-content/10"></div>
                          <div className="w-8 h-8 rounded-lg bg-base-content/10"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="h-24 bg-base-content/10 rounded-xl"></div>
                        <div className="h-24 bg-base-content/10 rounded-xl"></div>
                        <div className="h-24 bg-base-content/10 rounded-xl"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-12 bg-base-content/10 rounded-xl"></div>
                        <div className="h-12 bg-base-content/10 rounded-xl"></div>
                        <div className="h-12 bg-base-content/10 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="max-w-7xl mx-auto px-4 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Join thousands who have transformed their job search journey
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="relative px-4 mb-8">
                <div className="text-4xl text-base-content/20 absolute -top-6 -left-2">&ldquo;</div>
                <div className="text-4xl text-base-content/20 absolute -bottom-8 -right-2">&rdquo;</div>
                <p className="text-lg leading-relaxed">
                  The AI resume tailoring helped me land interviews at top tech companies. Secured my dream role in just 6 weeks!
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-2 ring-base-content/5">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Sarah K.</div>
                  <div className="text-sm text-base-content/60">Software Engineer</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative px-4 mb-8">
                <div className="text-4xl text-base-content/20 absolute -top-6 -left-2">&ldquo;</div>
                <div className="text-4xl text-base-content/20 absolute -bottom-8 -right-2">&rdquo;</div>
                <p className="text-lg leading-relaxed">
                  The interview AI coach was a game-changer. Practiced regularly and felt super confident in my actual interviews.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-2 ring-base-content/5">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" alt="Michael" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Michael R.</div>
                  <div className="text-sm text-base-content/60">Product Manager</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative px-4 mb-8">
                <div className="text-4xl text-base-content/20 absolute -top-6 -left-2">&ldquo;</div>
                <div className="text-4xl text-base-content/20 absolute -bottom-8 -right-2">&rdquo;</div>
                <p className="text-lg leading-relaxed">
                  Keeping track of multiple applications was so easy. The automated reminders helped me never miss a follow-up.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-2 ring-base-content/5">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" alt="Emily" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Emily L.</div>
                  <div className="text-sm text-base-content/60">Marketing Director</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
              <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
                Join thousands of successful job seekers who have already landed their dream jobs using our platform.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/register"
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 text-primary-content rounded-full"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/login"
                  className="btn btn-outline btn-lg rounded-full"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-base-content/60">
        <div className="h-px w-full max-w-xl mx-auto mb-8 bg-gradient-to-r from-transparent via-base-content/10 to-transparent" />
        © {new Date().getFullYear()} Joblio. All rights reserved.
      </footer>
    </div>
  );
}
