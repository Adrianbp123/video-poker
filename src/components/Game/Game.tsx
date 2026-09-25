import Card from "../Card/Card";
import CardBack from "../CardBack/CardBack";
import { useGameStore } from "../../store/useGameStore";
import PokerHand from "../PokerHand/PokerHand";
import getPokerHand from "../PokerHand/getPokerHand";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import { Link } from "react-router";


/* Viser selve spillet og håndterer runden */
export default function Game() {
  const hand = useGameStore((state) => state.hand);
  const deal = useGameStore((state) => state.deal);
  const draw = useGameStore((state) => state.draw);
  const heldCards = useGameStore((state) => state.heldCards);
  const toggleHold = useGameStore((state) => state.toggleHold);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winnings = useGameStore((state) => state.winnings);
  const newRound = useGameStore((state) => state.newRound);

/* Viser bare spillet hvis en spiller ikke er opprettet/valgt */
if (!currentPlayer) {
    return (
        <>
        <h1>Video Poker</h1>
        <p>
            Du må velge eller opprette en spiller for å starte. <Link to="/players">Opprett spiller</Link>
        </p>
        </>
    )
}
  return (
    <>
    <h1>Video Poker</h1>

      <TotalCoins />
      <CurrentBet />

      <section className="card-hand">


{/* Viser kortbaksider før kortene er delt ut */}
        {gamePhase === "betting" ? (
            <>
            <CardBack />
            <CardBack />
            <CardBack />
            <CardBack />
            <CardBack />
            </>
        ) : (
        /* Går igjennom hand og lager en Card-komponent for hvert kort */
        hand.map((card, index) => (
          <button
            key={index}
            onClick={() => toggleHold(index)}
            disabled={gamePhase !== "holding"}
          >
            <Card card={card}/>
            {heldCards.includes(index) && <span>HOLD</span>}
          </button>
        ))
        )}

      </section>

      {/* Sjekker og viser pokerhånden når 5 kort er delt ut */}
      {hand.length === 5 && <PokerHand hand={getPokerHand(hand)} />}

      {/* Viser gevinst etter at runden er ferdig */}
      {gamePhase === "result" && <p>Du vant {winnings} coins!</p>}

      {/* Viser riktig knapp basert på hvilken fase spillrunden er i */}

      {gamePhase === "betting" && (
        <button onClick={deal}>
          Deal
        </button>
      )}

      {gamePhase === "holding" && <button onClick={draw}>Draw</button>}

      {gamePhase === "result" && <button onClick={newRound}>Ny runde</button>}
    </>
  );
}
