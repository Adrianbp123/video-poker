import { useGameStore } from "../../store/useGameStore";

export default function CurrentBet() {

    const currentBet = useGameStore((state) => state.currentBet);
    const increaseBet = useGameStore((state) => state.increaseBet);
    const decreaseBet = useGameStore((state) => state.decreaseBet);
    const gamePhase = useGameStore((state) => state.gamePhase);

    return (
        <div>
            <p>Innsats: {currentBet}</p>
            <button onClick={decreaseBet}
                    disabled={gamePhase !== "betting"}>
                -
                </button>

            <button onClick={increaseBet}
                    disabled={gamePhase !== "betting"}
            >
                +
                </button>
        </div>
    )

}