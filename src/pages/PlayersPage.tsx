import { useGameStore } from "../store/useGameStore";
import "./PlayersPage.css"

export default function PlayersPage() {

/* Henter spiller-state og funksjoner fra game store */
const createPlayer = useGameStore((state) => state.createPlayer);
const currentPlayer = useGameStore((state) => state.currentPlayer);

const players = useGameStore((state) => state.players);
const selectPlayer = useGameStore((state) => state.selectPlayer);
const deletePlayer = useGameStore((state) => state.deletePlayer);


/* Henter navnet fra skjemaet og oppretter en spiller hvis navnet er gyldig */
function registerPlayer(formData: FormData) {
    const name = formData.get("name");

    if (typeof name === "string" && name.trim()) {
        createPlayer(name.trim());
    }
}



    return (
        <main className="players-page">
            <h1>Spillere</h1>

            <form className="player-form" action={registerPlayer}>
                <label htmlFor="player-name">Spillernavn</label>

                <input 
                    className="player-input"
                    type="text"
                    id="player-name"
                    name="name"
                />

                <button className="create-player-button" type="submit">Opprett spiller</button>
            </form>

            {currentPlayer && (
                <p>
                    Spiller: {currentPlayer.name} | Coins: <span className="winnings">{currentPlayer.coins}</span>
                </p>
            )}

        {/* Viser alle lagrede spillere og lar brukeren velge aktiv spiller */}
            <section className="saved-players">
                <h2>Lagrede spillere</h2>

                {players.map((player) => (
                    <div className="player-card" key={player.id}>
                        <p>
                            {player.name} - <span className="winnings">{player.coins}</span> coins
                        </p>
                    <div className="player-actions">
                        <button className="select-button" onClick={() => selectPlayer(player.id)}>
                         Velg
                        </button>

                        <button className="delete-button" onClick={() => deletePlayer(player.id)}>
                            Slett
                        </button>
                        </div>
                    </div>
                ))}
            </section>



        </main>
    );
}