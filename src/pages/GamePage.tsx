import Card from "../components/Card/Card";
import { useGameStore } from "../store/useGameStore";
import PokerHand from "../components/PokerHand/PokerHand";
import getPokerHand from "../components/PokerHand/getPokerHand";


export default function GamePage() {

    const hand = useGameStore((state) => state.hand);
    const deal = useGameStore((state) => state.deal);
    


    return (
        <main className="game-page">
            <h1>Video Poker</h1>
            <section className="card-hand">
        {/* Går igjennom hand og lager en Card-komponent for hvert kort */}                     
            {hand.map((card, index) => (
                <Card key={index} card={card} faceDown={false} />
            ))}
            </section>

        {/* Sjekker og viser pokerhånden når 5 kort er delt ut */} 
            {hand.length === 5 && (
                <PokerHand hand={getPokerHand(hand)} />
            )}

            <button onClick={deal}>Deal</button>

        </main>
    );
}