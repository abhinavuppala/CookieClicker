'use client'
import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";

export default function Home() {

  // cookies & autoclickers global state through custom hook
  // persists the cookie count through refreshing, tab closing, etc.
  const {
    cookies, addCookies,
    autoClickers, addAutoClickers,
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
    <div>
      {/* display cookie count */}
      <div>
        Cookies: {cookies}
      </div>

      {/* clicker - add cookies */}
      <div>
        <button onClick={() => addCookies(1)}>Click</button>
      </div>

      {/* display number of auto clickers */}
      {/* these are upgrades player can buy that give 1 click/second */}
      <div>
        Auto Clickers: {}
      </div>

      {/* buy autoclickers (10 cookies each) */}
      <div>
        <button onClick={() => addAutoClickers(1)}>Buy Autoclicker (10 cookies)</button>
      </div>
    </div>
  );
}
