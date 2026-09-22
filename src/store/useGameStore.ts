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
    players: Player[];
    currentPlayer: Player | null;
    deal: () => void;
    createPlayer: (name: string) => void;
    selectPlayer: (id: number) => void;
    deletePlayer: (id: number) => void;
}

/* Oppretter game store og lagrer spill-staten i localStorage */

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            deck: [],
            hand: [],
            discardedCards: [],
            players: [],
            currentPlayer: null,
/* Oppretter ny spiller med id og 100 coins, lagrer spilleren og setter den som aktiv */
            createPlayer: (name) => {

                set((state) => {
/* Finner høyeste spiller-id og bruker neste nummer til den nye spilleren */
                    let newId = 1;
                    
                    if (state.players.length > 0) {
                        const ids = state.players.map((player) => player.id);
                        newId = Math.max(...ids) + 1;
                    }
                
                    const newPlayer: Player = {
                    id: newId,
                    name: name,
                    coins: 100
                };

                return {
                    players: [...state.players, newPlayer],
                    currentPlayer: newPlayer
                };

            });
        },


/* Finner en eksisterende spiller basert på id og setter den som aktiv */
            selectPlayer: (id) => {
                set((state) => ({
                    currentPlayer: state.players.find((player) => player.id === id) || null
                }));
            },

/* Sletter en spiller basert på id og fjerner aktiv spiller hvis den samme spilleren slettes */
            deletePlayer: (id) => {
                set((state) => ({
                    players: state.players.filter((player) => player.id !== id),
                    currentPlayer: state.currentPlayer?.id === id ? null : state.currentPlayer
                }));
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


