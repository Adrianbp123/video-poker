import type { PokerHand } from "../../types/PokerHand";
import styles from "./PokerHand.module.css";

/* Bestemmer at PokerHand-komponenten skal motta en PokerHand */
type PokerHandProps = {
    hand: PokerHand;
}

/* Viser spillerens nåværende pokerhånd */
export default function PokerHand({ hand }: PokerHandProps) {
    return (
        <div className={styles.pokerHand}>
            <p className={styles.title}>Nåværende hånd</p>
            <p className={styles.hand}>{hand}</p>
        </div>
    )
}