import { useGameStore } from "../../store/useGameStore";
import "./TotalCoins.css";

/* Viser hvor mange coins den valgte spilleren har */
export default function TotalCoins() {
    const currentPlayer = useGameStore((state) => state.currentPlayer);

    return (
        <div className="total-coins">
            <p>Coins:</p> 
            <p className="coin-amount">
              {currentPlayer ? currentPlayer.coins : "-"}
              </p>
        </div>
    )

}