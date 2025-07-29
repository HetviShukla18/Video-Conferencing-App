"use client";

import { useEffect, useState } from 'react';

const EnvChecker = () => {
  const [envStatus, setEnvStatus] = useState<{
    NEXT_PUBLIC_STREAM_API_KEY: boolean;
    STREAM_SECRET_KEY: boolean;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: boolean;
    CLERK_SECRET_KEY: boolean;
  }>({
    NEXT_PUBLIC_STREAM_API_KEY: false,
    STREAM_SECRET_KEY: false,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: false,
    CLERK_SECRET_KEY: false,
  });

  useEffect(() => {
    // Check client-side environment variables
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    
    setEnvStatus({
      NEXT_PUBLIC_STREAM_API_KEY: !!apiKey,
      STREAM_SECRET_KEY: false, // This is server-side only, we can't check it client-side
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!clerkPublishableKey,
      CLERK_SECRET_KEY: false, // This is server-side only, we can't check it client-side
    });
  }, []);

  const missingVars = Object.entries(envStatus)
    .filter(([_, exists]) => !exists)
    .map(([key]) => key);

  if (missingVars.length === 0) {
    return null; // Don't show anything if all client-side vars are present
  }

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Missing Environment Variables</h3>
      <ul className="text-sm">
        {missingVars.map((varName) => (
          <li key={varName} className="mb-1">
            • {varName}
          </li>
        ))}
      </ul>
      <p className="text-xs mt-2 opacity-90">
        Add these to your .env.local file. You need both Stream and Clerk keys.
      </p>
      <div className="text-xs mt-2 opacity-75">
        <p>Required variables:</p>
        <ul className="mt-1">
          <li>• NEXT_PUBLIC_STREAM_API_KEY (from Stream)</li>
          <li>• STREAM_SECRET_KEY (from Stream)</li>
          <li>• NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk)</li>
          <li>• CLERK_SECRET_KEY (from Clerk)</li>
        </ul>
      </div>
    </div>
  );
};

export default EnvChecker; 