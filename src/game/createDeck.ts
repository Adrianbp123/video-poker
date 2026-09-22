import type { PlayingCard } from "../components/Card/Card";

/* Lager et array med alle suitene som kan brukes i kortstokken */
const suits: PlayingCard["suit"][] = [
    "hearts",
    "diamonds",
    "clubs",
    "spades"
];

/* Lager et array med alle verdiene som kan brukes i kortstokken */
const values: PlayingCard["value"][] = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "J", "Q", "K", "A"
];


/* Lager og returnerer en kortstokk med 52 spillkort */
export default function createDeck(): PlayingCard[] {
    const deck: PlayingCard[] = [];

/* Kombinerer hver suit med hver kortverdi og legger kortet i kortstokken */
    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({
                suit,
                value
            });
        })
    })

    return deck;
}