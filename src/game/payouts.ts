import type { PokerHand } from "../types/PokerHand";

/* Bestemmer hvor mye hver pokerhånd betaler */
export const payouts: Record<PokerHand, number> = {
  "Høyt kort": 0,
  "Ett par": 1,
  "To par": 2,
  "Tre like": 3,
  Straight: 4,
  Flush: 5,
  "Fullt hus": 7,
  "Fire like": 10,
  "Straight Flush": 20,
  "Royal Flush": 50,
};
/**
 * Regner ut gevinsten basert på pokerhånd og innsats
 * @param hand Pokerhånden spilleren fikk
 * @param bet Hvor mange coins spilleren satset
 * @returns Antall coins spilleren vinner
 */
export function calculatePayout(hand: PokerHand, bet: number) {
  return payouts[hand] * bet;
}
