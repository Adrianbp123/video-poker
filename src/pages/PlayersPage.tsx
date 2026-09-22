import { useGameStore } from "../store/useGameStore";

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
        <main>
            <h1>Spillere</h1>

            <form action={registerPlayer}>
                <label htmlFor="player-name">Navn</label>

                <input type="text"
                       id="player-name"
                       name="name"
                />

                <button type="submit">Opprett spiller</button>
            </form>

            {currentPlayer && (
                <p>
                    Spiller: {currentPlayer.name} | Coins: {currentPlayer.coins}
                </p>
            )}

        {/* Viser alle lagrede spillere og lar brukeren velge aktiv spiller */}
            <section>
                <h2>Lagrede spillere</h2>

                {players.map((player) => (
                    <div key={player.id}>
                        <p>
                            {player.name} - {player.coins} coins
                        </p>

                        <button onClick={() => selectPlayer(player.id)}>
                         Velg
                        </button>

                        <button onClick={() => deletePlayer(player.id)}>
                            Slett
                        </button>
                    </div>
                ))}
            </section>



        </main>
    );
}