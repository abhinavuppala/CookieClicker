import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
    cookies: number,
    addCookies: (x: number) => void,
}

export const useGameStore = create<GameState>()(
    persist(
        // first parameter to persist is the initial state
        (set) => (
            {
                // initial values for cookies are 0
                cookies: 0,
                addCookies: (x: number) => set(
                    (state) => ({ cookies: state.cookies + x })
                )
            }
        ),
        // second parameter to persist is the options
        {
            'name': 'game-store'
        }
    )
)