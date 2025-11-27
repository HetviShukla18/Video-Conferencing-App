"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log('User not signed in, showing sign-in option');
      setShowSignIn(true);
    } else if (isLoaded && isSignedIn) {
      console.log('User is signed in, showing main app');
      setShowSignIn(false);
    }
  }, [isLoaded, isSignedIn]);

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 animate-spin-reverse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 blur-xl opacity-50 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-xl font-semibold">Initializing ZinkUp</p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show sign-in page if user is not authenticated
  if (!isSignedIn || showSignIn) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-[#0a0a0f] overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-float-slow"></div>
        </div>

        {/* Main content - with proper z-index */}
        <div className="relative z-50 w-full max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Logo and branding */}
            <div className="mb-12 animate-fade-in-down">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-blue-700 p-6 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
                <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  ZinkUp
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light animate-fade-in">
                Where Connections Come Alive
              </p>
              
              <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
                Experience the future of video conferencing with crystal-clear quality, 
                enterprise-grade security, and seamless collaboration tools
              </p>
            </div>

            {/* CTA Buttons - with proper pointer-events */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up">
              <Link 
                href="/sign-in"
                className="relative group w-full sm:w-auto pointer-events-auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-xl"></div>
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-semibold text-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                  <span>Sign In</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              
              <Link 
                href="/sign-up"
                className="relative group w-full sm:w-auto pointer-events-auto"
              >
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl text-white font-semibold text-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                  <span>Create Account</span>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up-delayed">
              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">End-to-End Encrypted</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Your conversations stay private with military-grade encryption</p>
              </div>

              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">4K Video Quality</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Crystal-clear video with adaptive streaming technology</p>
              </div>

              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Connect instantly with optimized global infrastructure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">All Systems Operational</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-gray-400 text-sm">99.9% Uptime</span>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% {
              background-size: 200% 200%;
              background-position: 0% 50%;
            }
            50% {
              background-size: 200% 200%;
              background-position: 100% 50%;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(30px, -30px) rotate(120deg);
            }
            66% {
              transform: translate(-20px, 20px) rotate(240deg);
            }
          }
          
          @keyframes float-delayed {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(-30px, 30px) rotate(-120deg);
            }
            66% {
              transform: translate(20px, -20px) rotate(-240deg);
            }
          }
          
          @keyframes float-slow {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            50% {
              transform: translate(-20px, -20px) scale(1.1);
            }
          }
          
          @keyframes spin-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 25s ease-in-out infinite;
          }
          
          .animate-float-slow {
            animation: float-slow 30s ease-in-out infinite;
          }
          
          .animate-spin-reverse {
            animation: spin-reverse 1.5s linear infinite;
          }
          
          .animate-fade-in-down {
            animation: fadeInDown 1s ease-out;
          }
          
          .animate-fade-in {
            animation: fadeIn 1s ease-out 0.3s both;
          }
          
          .animate-fade-in-delayed {
            animation: fadeIn 1s ease-out 0.6s both;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out 0.4s both;
          }
          
          .animate-fade-in-up-delayed {
            animation: fadeInUp 1s ease-out 0.8s both;
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // User is signed in, render children (main app)
  return <>{children}</>;
};

export default AuthGuard;