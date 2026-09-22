import type { PlayingCard } from "../components/Card/Card";


/* Mottar en kortstokk og returnerer kortene i tilfeldig rekkefølge */
export default function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {

/* Lager en kopi av kortstokken slik at den orginale ikke endres */
    const shuffledDeck = [...deck];
/* Bruker Fisher-Yates-algoritmen og går baklengs gjennom kortstokken for å stokke kortene */
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
/* Velger en tilfeldig index fra starten av kortstokken til nåverende index  */
        const randomIndex = Math.floor(Math.random() * (i + 1));

/* Lagrer kortet og bytter plass med det tilfeldige kortet */
const temporaryCard = shuffledDeck[i];

shuffledDeck[i] = shuffledDeck[randomIndex];

shuffledDeck[randomIndex] = temporaryCard;
    }

    return shuffledDeck;

}