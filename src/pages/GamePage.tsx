import Card, { type PlayingCard } from "../components/Card/Card";
import PokerHand from "../components/PokerHand/PokerHand";
import getPokerHand from "../components/PokerHand/getPokerHand";


export default function GamePage() {
/* Midlertidige kort som brukes for å teste Card-komponenten */
    const testCards: PlayingCard[] = [
        { suit: "hearts", value: "10" },
        { suit: "hearts", value: "J" },
        { suit: "hearts", value: "Q" },
        { suit: "hearts", value: "K" },
        { suit: "hearts", value: "A" },
    ]

    const currentHand = getPokerHand(testCards);
    


    return (
        <main className="game-page">
            <h1>Video Poker</h1>
            <section className="card-hand">
        {/* Går igjennom testCards og lager en Card-komponent for hvert kort */}                     
            {testCards.map((card, index) => (
                <Card key={index} card={card} faceDown={false} />
            ))}
            </section>

            <PokerHand hand={currentHand}/>
        </main>
    );
}