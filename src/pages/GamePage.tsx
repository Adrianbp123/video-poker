import Card, { type PlayingCard } from "../components/Card/Card";


export default function GamePage() {
/* Midlertidige kort som brukes for å teste Card-komponenten */
    const testCards: PlayingCard[] = [
        { suit: "hearts", value: "A" },
        { suit: "spades", value: "K" },
        { suit: "diamonds", value: "Q" },
        { suit: "clubs", value: "7" },
        { suit: "hearts", value: "10" },
    ]
    


    return (
        <main className="game-page">
            <h1>Video Poker</h1>
            <section className="card-hand">
        {/* Går igjennom testCards og lager en Card-komponent for hvert kort */}                     
            {testCards.map((card, index) => (
                <Card key={index} card={card} faceDown={false} />
            ))}
            </section>
        </main>
    );
}