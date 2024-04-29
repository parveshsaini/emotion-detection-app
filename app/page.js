"use client"
import React, { useState } from 'react';
import FacialExpressionDetection from "@/components/face-detection";

export default function Home() {
  const [isDetecting, setIsDetecting] = useState(false);

  const handleStart = () => {
    setIsDetecting(true);
  };

  const handleEnd = () => {
    setIsDetecting(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        Facial expression recognition
      </h1>
      <h3 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        (IOT Final Project)
      </h3>
      {isDetecting ? (
        <>
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleEnd}>Pause/End</button>
          <FacialExpressionDetection />
        </>
      ) : (
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleStart}>Start</button>
      )}
    </main>
  );
}
