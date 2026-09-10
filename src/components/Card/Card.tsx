import "./Card.css"

/* Gjør om kortets suit til riktig symbol */
const suitSymbols = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠"
}
/* Bestemmer hvilke typer og verdier et spillkort kan ha */ 
export type PlayingCard = {
    suit: "hearts" | "diamonds" | "clubs" | "spades";
    value: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
}
/* Bestemmer at card-komponenten skal motta et PlayingCard */
type CardProps = {
    card: PlayingCard;
}

/* Mottar informasjon om et kort og viser spillkort med riktig verdi, symbol og farge */ 
export default function Card({ card }: CardProps) {
/* Sjekker om kortet skal være rødt / Gjør om hearts og diamonds til rød */
    const isRed = card.suit === "hearts" || card.suit === "diamonds";

/* Viser kortet og gir det riktig farge basert på isRed */
    return (
        <div className={`card ${isRed ? "red" : "black"}`}>
            <p className="card-value">{card.value}</p>
            <p className="card-suit">{suitSymbols[card.suit]}</p>

        </div>
    );
}

