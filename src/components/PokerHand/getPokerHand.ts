import type { PlayingCard } from "../Card/Card";
import type { PokerHand } from "../../types/PokerHand";


/* Mottar en liste med spillkort og returnerer hvilken PokerHand kortene gir */
export default function getPokerHand(cards: PlayingCard[]): PokerHand {

/* Kortverdiene i stigende rekkefølge for å sjekke Straight */
    const valueOrder = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "J", "Q", "K", "A"
    ]

/* Henter ut verdien og suiten fra hvert kort */
    const values = cards.map((card) => card.value);
    const suits = cards.map((card) => card.suit);

    /* Gir hver kortverdi et tall for å kunne sjekke Straight */
    const valueIndexes = values.map((value) => valueOrder.indexOf(value));

    /* Sorterer kortverdiene fra lavest til høyest */
    const sortedValues = valueIndexes.sort((a, b) => a - b);

/* Sjekker om kortverdiene følger etter hverandre */
    const normalStraight = sortedValues.every((value, index) => {
        if (index === 0) {
            return true;
        }

        return value === sortedValues[index - 1] + 1;
    })

/* Sjekker Straight der ess brukes som laveste kort  */

    const isLowAceStraight =
    values.includes("A") &&
    values.includes("2") &&
    values.includes("3") &&
    values.includes("4") &&
    values.includes("5");

/* Hånden er Straight hvis en av Straight-sjekkene stemmer */
    const isStraight = normalStraight || isLowAceStraight;


/* Sjekker om hver suit er lik den første suiten */
    const isFlush = suits.every((suit) => suit === suits[0])

/* Sjekker om hånden har kortene som kreves for Royal Flush */
    const isRoyalFlush =
        isFlush &&
        values.includes("10") &&
        values.includes("J") &&
        values.includes("Q") &&
        values.includes("K") &&
        values.includes("A");

    let pairs = 0;
    let threeOfAKind = false;
    let fourOfAKind = false;

/* Holder styr på hvilke kortverdier som allerede er sjekket */
    const checkedValues: string[] = [];



/* Teller like kortverdier for å finne par / tre like og fire like */
    values.forEach((value) => {

        if (!checkedValues.includes(value)) {
            const sameValues = values.filter((cardValue) => cardValue === value);

            if (sameValues.length === 2) {
                pairs++;
            }

            if (sameValues.length === 3) {
                threeOfAKind = true;
            }

            if (sameValues.length === 4) {
                fourOfAKind = true;
            }

            checkedValues.push(value)
        }
    });

    /* Returnerer den høyest rangerte pokerhånden som passer */

    if (isRoyalFlush) {
        return "Royal Flush"
    }
  
    if (isStraight && isFlush) {
        return "Straight Flush"
    }

    if (fourOfAKind) {
        return "Fire like"
    }

    if (threeOfAKind && pairs === 1) {
        return "Fullt hus"
    }

    if (isFlush) {
        return "Flush"
    }

    if (isStraight) {
        return "Straight"
    }

    if (threeOfAKind) {
        return "Tre like"
    }

    if (pairs === 2) {
        return "To par";
    }

     if (pairs === 1) {
        return "Ett par";
    }

    return "Høyt kort";

}

