import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../components/Card/Card";
import createDeck from "../game/createDeck";
import shuffleDeck from "../game/shuffleDeck";
import type { Player } from "../types/Player";

/* Bestemmer hvilken state og hvilke funksjoner game store skal inneholde */
type GameStore = {
    deck: PlayingCard[];
    hand: PlayingCard[];
    discardedCards: PlayingCard[];
    currentPlayer: Player | null;
    deal: () => void;
    createPlayer: (name: string) => void;
}

/* Oppretter game store og lagrer spill-staten i localStorage */

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            deck: [],
            hand: [],
            discardedCards: [],
            currentPlayer: null,
/* Oppretter ny spiller med 100 coins */
            createPlayer: (name) => {
                set({
                    currentPlayer: {
                        name: name,
                        coins: 100
                    }
                })
            },
            /* Lager og stokker en ny kortstokk, deler ut 5 kort og lagrer resten i decket */
            deal: () => {
                const newDeck = createDeck();
                const shuffledDeck = shuffleDeck(newDeck);

                const hand = shuffledDeck.slice(0, 5);
                const remainingDeck = shuffledDeck.slice(5);

                set({
                    deck: remainingDeck,
                    hand: hand,
                    discardedCards: []
                });

            }
        }),
        { name: "video-poker-game" }
    )
)


