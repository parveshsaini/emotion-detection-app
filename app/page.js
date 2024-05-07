"use client"
import React, { useContext, useEffect, useState, useRef } from 'react';
import FacialExpressionDetection from "@/components/face-detection";
import Link from 'next/link';
import { UserContext } from '@/helpers/context';

export default function Home() {
  const [isDetecting, setIsDetecting] = useState(false);

  const contextUser = useContext(UserContext);


  const handleStart = () => {
    setIsDetecting(true);
  };

  const handleEnd = () => {
    setIsDetecting(false);
  };

  return (
    <main className='min-h-screen p-8 flex flex-col justify-between'>
    <div>
    <div className='flex justify-between items-center mb-8'>
      <h1 className="font-extrabold md:text-4xl text-2xl tracking-tight ">
        Facial Expression Recognition  🎭 
      </h1>
      <nav>
        <ul className="flex space-x-10">
        <a href="/parent" target="_blank" rel="noopener noreferrer">
          <li className="text-xl md:text-2xl tracking-tight">Parent's Dashboard</li>
        </a>
        <Link href='/about'>
          <li className='text-xl md:text-2xl tracking-tight'>About Us</li>
          </Link>
        </ul>
    </nav>
    </div>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
  <div className="flex flex-col items-center justify-between">
    <div className="flex flex-col items-center">
    
      <h3 className="text-xl md:text-2xl lg:text-4xl tracking-tight text-center mb-8 text-slate-300">
        Welcome! <span className='font-semibold'>{contextUser} 👋</span>
      </h3>
      {isDetecting ? (
        <>
          <button className="text-gray-900 text-2xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={handleEnd}>Stop</button>
          <FacialExpressionDetection />
          
        </>
      ) : (
        <div className="flex flex-col items-center">
        <button className="text-gray-900 mt-8 text-3xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
        onClick={handleStart}>Start Detection</button>
        <h3 className='mt-4 rounded-lg py-20 px-6 border text-lg'>Enable monitoring your Child's Emotions by clicking START button</h3>
        </div>
      )}
    </div>
    
</div>
</div>
<h3 className="text-center">Relax, you're not being recorded. Everything happens in your browser.</h3>

</main>


  );
}

// text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
