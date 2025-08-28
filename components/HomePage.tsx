import React from 'react';

interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          Welcome to <span className="text-indigo-600">RateCraft</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          The simplest way for freelancers to build, customize, and share a professional digital rate card. No sign-up required.
        </p>
        <div className="mt-10">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Create Your Rate Card Now
          </button>
        </div>
        <div className="mt-12 text-gray-500">
          <p className="font-semibold">Features:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside inline-block text-left">
            <li>Add, edit, and delete services</li>
            <li>Auto-calculating total</li>
            <li>Custom branding with your logo</li>
            <li>Multiple color themes</li>
            <li>Export to PDF</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
