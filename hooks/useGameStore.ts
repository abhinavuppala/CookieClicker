import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
    cookies: number,
    addCookies: (x: number) => void,

    autoClickers: number,
    addAutoClickers: (x: number) => void,

    // reset all values to 0
    clear: () => void,
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
                ),
                
                // initial num autoclickers are 0
                autoClickers: 0,

                // we only add autoclickers if we have enough money (10 cookies per)
                addAutoClickers: (x: number) => set(
                    (state) => {
                        if (state.cookies >= x * 10)
                        {
                            return { cookies: state.cookies - (x * 10), autoClickers: state.autoClickers + x }
                        }
                        return { }
                    },
                ),

                // reset cookies & autoclickers to 0. Could be useful for debugging
                clear: () => set(
                    (state) => ({ cookies: 0, autoClickers: 0 })
                )
            }
        ),
        // second parameter to persist is the options
        {
            'name': 'game-store'
        }
    )
)