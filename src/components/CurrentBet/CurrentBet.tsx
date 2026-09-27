import { useGameStore } from "../../store/useGameStore";
import "./CurrentBet.css";

/* Viser og lar spilleren endre innsatsen */
export default function CurrentBet() {
  const currentBet = useGameStore((state) => state.currentBet);
  const increaseBet = useGameStore((state) => state.increaseBet);
  const decreaseBet = useGameStore((state) => state.decreaseBet);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const currentPlayer = useGameStore((state) => state.currentPlayer);

  return (
    <div className="current-bet">
      <p>Innsats:</p>

      <div className="bet-controls">
        <button
          className="bet-button"
          onClick={decreaseBet}
          disabled={gamePhase !== "betting" || !currentPlayer}
          aria-label="Reduser innsats"
        >
          -
        </button>

        <p className="bet-amount">{currentBet}</p>

        <button
          className="bet-button"
          onClick={increaseBet}
          disabled={gamePhase !== "betting" || !currentPlayer}
          aria-label="Øk innsats"
        >
          +
        </button>
      </div>
    </div>
  );
}
