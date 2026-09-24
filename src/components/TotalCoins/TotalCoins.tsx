import { useGameStore } from "../../store/useGameStore";

/* Viser hvor mange coins den valgte spilleren har */
export default function TotalCoins() {
    const currentPlayer = useGameStore((state) => state.currentPlayer);

    return (
        <div>
            <p>Coins: {currentPlayer ? currentPlayer.coins : "-"}</p>
        </div>
    )

}