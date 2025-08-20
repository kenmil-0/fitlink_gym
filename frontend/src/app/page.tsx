import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Your Fitness Journey
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From discovering the perfect gym to managing your subscriptions, 
              Fitlink makes fitness accessible and convenient.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gym Discovery */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Smart Gym Discovery</h3>
              <p className="text-neutral-600">
                Find the perfect gym near you with detailed information, ratings, 
                and real-time availability.
              </p>
            </div>

            {/* Flexible Subscriptions */}
            <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Flexible Plans</h3>
              <p className="text-neutral-600">
                Choose from daily, weekly, monthly, or yearly plans that fit 
                your schedule and budget.
              </p>
            </div>

            {/* Instructor Booking */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Expert Instructors</h3>
              <p className="text-neutral-600">
                Book sessions with certified fitness professionals and 
                get personalized training plans.
              </p>
            </div>

            {/* Workout Routines */}
            <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Curated Routines</h3>
              <p className="text-neutral-600">
                Access professionally designed workout routines tailored 
                to your fitness level and goals.
              </p>
            </div>

            {/* Real-time Chat */}
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Stay Connected</h3>
              <p className="text-neutral-600">
                Chat with instructors, gym staff, and fellow members 
                in real-time for support and motivation.
              </p>
            </div>

            {/* Push Notifications */}
            <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100 hover:shadow-fitness-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.22A9 9 0 0117.8 15.8M4.19 4.22L9 9m0 0v5m0-5h5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Smart Reminders</h3>
              <p className="text-neutral-600">
                Get timely notifications about your sessions, 
                subscription renewals, and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of fitness enthusiasts in Asaba and beyond. 
            Download Fitlink today and start your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.fitlink.app"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-100 transition-colors duration-200 shadow-fitness-lg"
            >
              Download for Android
            </a>
            <a
              href="/become-partner"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Join as Gym Owner
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
