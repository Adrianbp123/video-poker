import Card from "../components/Card/Card";
import { useGameStore } from "../store/useGameStore";
import PokerHand from "../components/PokerHand/PokerHand";
import getPokerHand from "../components/PokerHand/getPokerHand";


export default function GamePage() {

    const hand = useGameStore((state) => state.hand);
    const deal = useGameStore((state) => state.deal);
    const draw = useGameStore((state) => state.draw);

    const heldCards = useGameStore((state) => state.heldCards);
    const toggleHold = useGameStore((state) => state.toggleHold);
    


    return (
        <main className="game-page">
            <h1>Video Poker</h1>
            <section className="card-hand">
        {/* Går igjennom hand og lager en Card-komponent for hvert kort */}                     
            {hand.map((card, index) => (
                <button key={index} onClick={() => toggleHold(index)}>
                <Card card={card} faceDown={false} />
                {heldCards.includes(index) && (
                    <span>HOLD</span>
                )}
                </button>
            ))}
            </section>

        {/* Sjekker og viser pokerhånden når 5 kort er delt ut */} 
            {hand.length === 5 && (
                <PokerHand hand={getPokerHand(hand)} />
            )}

            <button onClick={deal}>Deal</button>
            <button onClick={draw}>Draw</button>

        </main>
    );
}