import { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

export default function AccountCard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg font-sans">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Account Details
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-5">
          Your current active account session.
        </p>

        {/* Label & Static Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1.5 text-left">
            Email address
          </label>
          <input
            type="email"
            readOnly
            value={user?.primaryEmailAddress?.emailAddress || ''}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-gray-50 text-sm focus:outline-none cursor-default"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => signOut()}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}