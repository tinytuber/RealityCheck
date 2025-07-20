import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-5xl font-bold mb-4">Picture Duel</h1>
      <p className="text-lg mb-6 text-gray-700 text-center max-w-md">
        Can you spot which images are real photos and which are AI-generated? Test your skills with 20 images!
      </p>
      {/* TODO: Add reCAPTCHA here for human verification */}
      <Link href="/play" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Start Game
      </Link>
    </div>
  );
}
