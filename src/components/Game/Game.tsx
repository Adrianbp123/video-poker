import Card from "../Card/Card";
import CardBack from "../CardBack/CardBack";
import { useGameStore } from "../../store/useGameStore";
import PokerHand from "../PokerHand/PokerHand";
import getPokerHand from "../PokerHand/getPokerHand";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import { Link } from "react-router";
import "./Game.css"

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

/* Viser melding hvis ingen spiller er opprettet eller valgt */
if (!currentPlayer) {
  
    return (
      <section className="no-player">

        <h1>Video Poker</h1>
        <p>
            Du må velge eller opprette en spiller for å starte.
            </p> 
            <Link className="nav-button" to="/players">Opprett spiller</Link>

        </section>
    )
}
  return (
    <section className="game">
    <h1>Video Poker</h1>
<div className="game-info">
      <TotalCoins />
      <CurrentBet />
      </div>

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
            className={`card-button ${heldCards.includes(index) ? "held" : ""}`}
            key={index}
            onClick={() => toggleHold(index)}
            disabled={gamePhase !== "holding"}
          >
            <Card card={card}/>
            <span className={`hold-label ${heldCards.includes(index) ? "show" : ""}`}>
            HOLD
            </span>
          </button>
        ))
        )}

      </section>

      {/* Sjekker og viser pokerhånden når 5 kort er delt ut */}
      {hand.length === 5 && <PokerHand hand={getPokerHand(hand)} />}

      {/* Viser gevinst etter at runden er ferdig */}
      {gamePhase === "result" && ( 

        <p>Du vant <span className="winnings">{winnings}</span> coins!</p>

    )}

      {/* Viser riktig knapp basert på hvilken fase spillrunden er i */}

      {gamePhase === "betting" && (
        <button onClick={deal}
                className="game-button"
        >
          Deal
        </button>
      )}

      {gamePhase === "holding" && <button onClick={draw} className="game-button">Draw</button>}

      {gamePhase === "result" && <button onClick={newRound} className="game-button">Ny runde</button>}
    </section>
  );
}
