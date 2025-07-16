'use client'
import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";

export default function Home() {

  // cookies global state through custom hook
  const { cookies, addCookies } = useGameStore();
  
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
    </div>
  );
}
