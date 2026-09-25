import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../components/Card/Card";
import createDeck from "../game/createDeck";
import shuffleDeck from "../game/shuffleDeck";
import type { Player } from "../types/Player";
import { calculatePayout } from "../game/payouts";
import getPokerHand from "../components/PokerHand/getPokerHand";

/* Bestemmer hvilken state og hvilke funksjoner game store skal inneholde */
type GameStore = {
  deck: PlayingCard[];
  hand: PlayingCard[];
  heldCards: number[];
  discardedCards: PlayingCard[];
  players: Player[];
  currentPlayer: Player | null;
  currentBet: number;
  gamePhase: "betting" | "holding" | "result";
  winnings: number;

  increaseBet: () => void;
  decreaseBet: () => void;


  deal: () => void;
  draw: () => void;
  newRound: () => void;
  toggleHold: (index: number) => void;
  createPlayer: (name: string) => void;
  selectPlayer: (id: number) => void;
  deletePlayer: (id: number) => void;
};

/* Oppretter game store og lagrer spill-staten i localStorage */

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      deck: [],
      hand: [],
      heldCards: [],
      discardedCards: [],
      players: [],
      currentPlayer: null,
      gamePhase:  "betting",
      winnings: 0,
      currentBet: 1,
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
            coins: 100,
          };

          return {
            players: [...state.players, newPlayer],
            currentPlayer: newPlayer,
            gamePhase: "betting",
            currentBet: 1,
            winnings: 0,
            hand: [],
            deck: [],
            heldCards: [],
            discardedCards: [],
          };
        });
      },

      /* Finner en eksisterende spiller basert på id og setter den som aktiv */
      selectPlayer: (id) => {
        set((state) => ({
          currentPlayer:
            state.players.find((player) => player.id === id) || null,
            gamePhase: "betting",
            currentBet: 1,
            winnings: 0,
            hand: [],
            deck: [],
            heldCards: [],
            discardedCards: [],
        }));
      },

      /* Sletter en spiller basert på id og fjerner aktiv spiller hvis den samme spilleren slettes */
      deletePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((player) => player.id !== id),
          currentPlayer:
            state.currentPlayer?.id === id ? null : state.currentPlayer,
        }));
      },

      /* Legger til eller fjerner et kort fra listen over kort som skal holdes */

      toggleHold: (index) => {
        set((state) => ({
          heldCards: state.heldCards.includes(index)
            ? state.heldCards.filter((heldIndex) => heldIndex !== index)
            : [...state.heldCards, index],
        }));
      },

      /* Lager og stokker en ny kortstokk, deler ut 5 kort og lagrer resten i decket */
      deal: () => {
        const newDeck = createDeck();
        const shuffledDeck = shuffleDeck(newDeck);

        const hand = shuffledDeck.slice(0, 5);
        const remainingDeck = shuffledDeck.slice(5);

        set((state) => {

            if (!state.currentPlayer) {
                return state;
            }

            if (state.currentPlayer.coins < state.currentBet) {
                return state;
            }

/* Trekker coins fra spilleren ut fra hvor stort bettet er  */
            const updatedPlayer = {
                ...state.currentPlayer,
                coins: state.currentPlayer.coins - state.currentBet
            }


            return {
          deck: remainingDeck,
          hand: hand,
          discardedCards: [],
          heldCards: [],
          gamePhase: "holding",
          winnings: 0,
          currentPlayer: updatedPlayer,

          players: state.players.map((player) => {
            if (player.id === updatedPlayer.id) {
                return updatedPlayer;
            }
            return player;
          })
            };
        });
      },

      /* Bytter ut kort som ikke er valgt med nye kort fra kortstokken */
      draw: () => {
        set((state) => {
            if (!state.currentPlayer) {
                return state;
            }
          /* Holder styr på hvilket kort som skal hentes fra kortstokken */
          let deckIndex = 0;

          /* Finner kortene som ikke ble holdt og legger dem i kastbunken */
          const discardedCards = state.hand.filter((_, index) =>
            !state.heldCards.includes(index)
        )

          /* Beholder valgte kort og erstatter resten med nye kort */
          const newHand = state.hand.map((card, index) => {
            if (state.heldCards.includes(index)) {
              return card;
            }

            const newCard = state.deck[deckIndex];
            deckIndex++;
            return newCard;
          });

          const pokerHand = getPokerHand(newHand);
          const winnings = calculatePayout(pokerHand, state.currentBet);
          /* Lager en oppdatert spiller og legger på gevinsten på spillerens coins */
          const updatedPlayer = {
            ...state.currentPlayer,
            coins: state.currentPlayer.coins + winnings
          };

          /* Fjerner kortene som ble brukt fra kortstokken */
          const remainingDeck = state.deck.slice(deckIndex);

          return {
            hand: newHand,
            deck: remainingDeck,
            heldCards: [],
            discardedCards: discardedCards,
            gamePhase: "result",
            currentPlayer: updatedPlayer,
            winnings: winnings,

            players: state.players.map((player) => {
                if (player.id === updatedPlayer.id) {
                    return updatedPlayer;
                }
                return player;
            })
          };
        });

      },

    /* Setter spillfasen tilbake til betting før neste runde */
      newRound: () => {
        set({
            gamePhase: "betting",
            hand: [],
            deck: [],
            heldCards: [],
            discardedCards: [],
            winnings: 0,
        });
      },



      /* Øker current bet med 1, maks 5 */
increaseBet: () => {
        set((state) => {
            if (
                state.currentPlayer &&
                state.currentBet < 5 &&
                state.currentBet < state.currentPlayer.coins
            ) {
                return {
                    currentBet: state.currentBet + 1
                };
            }

            return {
                currentBet: state.currentBet
            };
        });
    },
/* Reduserer current bet med 1, minimum 1 */
    decreaseBet: () => {
        set((state) => {
            if (state.currentBet > 1) {
                return {
                    currentBet: state.currentBet - 1
                };
            }

            return {
                currentBet: state.currentBet
            };
        })
    }

    

    }),

    

    { name: "video-poker-game" },
  ),
);
