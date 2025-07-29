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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // Show sign-in page if user is not authenticated
  if (!isSignedIn || showSignIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark2">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to ZinkUp</h1>
          <p className="text-lg mb-8">Your video conferencing solution</p>
          <div className="space-x-4">
            <Link 
              href="/sign-in" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is signed in, render children (main app)
  return <>{children}</>;
};

export default AuthGuard; 