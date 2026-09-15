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
/* Bestemmer hvilke props Card-komponenten skal motta */
type CardProps = {
    card: PlayingCard;
    faceDown: boolean;
}

/* Mottar informasjon om et kort og viser spillkort med riktig verdi, symbol og farge.
Viser også riktig iforhold til om det er forsiden eller baksiden av kortet. */ 
export default function Card({ card, faceDown }: CardProps) {

    if (faceDown) {
        return (
            <div className="card card-back">
                <p>VP</p>
            </div>
        )
    }

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

