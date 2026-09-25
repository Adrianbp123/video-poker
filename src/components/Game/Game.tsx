import Card from "../Card/Card";
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

  return (
    <>
      <h1>Video Poker</h1>
      {!currentPlayer && (
        <p>
          Du må velge eller opprette en spiller for å starte.{" "}
          <Link to="/players">Opprett spiller</Link>
        </p>
      )}
      <TotalCoins />
      <CurrentBet />
      <section className="card-hand">
        {/* Går igjennom hand og lager en Card-komponent for hvert kort */}
        {hand.map((card, index) => (
          <button
            key={index}
            onClick={() => toggleHold(index)}
            disabled={gamePhase !== "holding"}
          >
            <Card card={card} faceDown={false} />
            {heldCards.includes(index) && <span>HOLD</span>}
          </button>
        ))}
      </section>

      {/* Sjekker og viser pokerhånden når 5 kort er delt ut */}
      {hand.length === 5 && <PokerHand hand={getPokerHand(hand)} />}

      {/* Viser gevinst etter at runden er ferdig */}
      {gamePhase === "result" && <p>Du vant {winnings} coins!</p>}

      {/* Viser riktig knapp basert på hvilken fase spillrunden er i */}

      {gamePhase === "betting" && (
        <button onClick={deal} disabled={!currentPlayer}>
          Deal
        </button>
      )}

      {gamePhase === "holding" && <button onClick={draw}>Draw</button>}

      {gamePhase === "result" && <button onClick={newRound}>Ny runde</button>}
    </>
  );
}
