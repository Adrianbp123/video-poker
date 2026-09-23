import Card from "../components/Card/Card";
import { useGameStore } from "../store/useGameStore";
import PokerHand from "../components/PokerHand/PokerHand";
import getPokerHand from "../components/PokerHand/getPokerHand";
import CurrentBet from "../components/CurrentBet/CurrentBet";


export default function GamePage() {

    const hand = useGameStore((state) => state.hand);
    const deal = useGameStore((state) => state.deal);
    const draw = useGameStore((state) => state.draw);
    const heldCards = useGameStore((state) => state.heldCards);
    const toggleHold = useGameStore((state) => state.toggleHold);
    const gamePhase = useGameStore((state) => state.gamePhase);
    


    return (
        <main className="game-page">
            <h1>Video Poker</h1>
            <CurrentBet />
            <section className="card-hand">
        {/* Går igjennom hand og lager en Card-komponent for hvert kort */}                     
            {hand.map((card, index) => (
                <button key={index}
                onClick={() => toggleHold(index)}
                disabled={gamePhase !== "holding"
                }>
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
        {/* Viser riktig knapp basert på hvilken fase spillrunden er i */} 
            {gamePhase === "holding" ? (
                <button onClick={draw}>Draw</button>
            ) : (
                <button onClick={deal}>Deal</button>
            )}

            
           

        </main>
    );
}