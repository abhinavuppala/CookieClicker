'use client'
import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";
import { Cookie, Pointer, Trash } from "lucide-react";

export default function Home() {

  // cookies & autoclickers global state through custom hook
  // persists the cookie count through refreshing, tab closing, etc.
  const {
    cookies, addCookies,
    autoClickers, addAutoClickers,
    clear: clearCookies,
  } = useGameStore();

  // we want to create an interval that goes every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      addCookies(autoClickers);
    }, 1000)

    // delete interval when we unmount the useEffect
    // ex: closing tab, or re-running the effect
    return () => {
      clearInterval(intervalId);
    }
  }, [autoClickers]); // update interval whenever we buy an autoclicker
  
  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-row justify-center w-5/12 h-4/12 bg-slate-400">

        {/* display cookie count */}
        <div onClick={() => addCookies(1)} className="flex cursor-pointer select-none ml-5 mr-5 mt-20">
          <Cookie /> {cookies}
        </div>

        {/* display number of auto clickers */}
        {/* these are upgrades player can buy that give 1 click/second */}
        <div onClick={() => addAutoClickers(1)} className="flex cursor-pointer select-none ml-5 mr-5 mt-20">
          <Pointer /> {autoClickers}
        </div>

        {/* reset cookie count to 0 */}
        <div onClick={clearCookies} className="flex cursor-pointer select-none mt-20 ml-5 mr-5 mb-20">
          <Trash /> Reset
        </div>
      </div>
    </div>
    
  );
}
