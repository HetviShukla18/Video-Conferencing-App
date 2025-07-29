"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const AuthDebugger = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Show debug info in development
    if (process.env.NODE_ENV === 'development') {
      setShowDebug(true);
    }
  }, []);

  if (!showDebug) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm text-sm">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <p><strong>Is Loaded:</strong> {isLoaded ? 'Yes' : 'No'}</p>
        <p><strong>Is Signed In:</strong> {isSignedIn ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {user?.id || 'None'}</p>
        <p><strong>Username:</strong> {user?.username || 'None'}</p>
        <p><strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress || 'None'}</p>
      </div>
      <div className="mt-2 text-xs text-gray-400">
        <p><strong>Env Vars:</strong></p>
        <p>• Clerk Pub Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Missing'}</p>
        <p>• Stream API Key: {process.env.NEXT_PUBLIC_STREAM_API_KEY ? 'Set' : 'Missing'}</p>
      </div>
    </div>
  );
};

export default AuthDebugger; 