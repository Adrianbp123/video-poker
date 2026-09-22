import { useGameStore } from "../store/useGameStore";

export default function PlayersPage() {

/* Henter createPlayer og currentPlayer fra game store */
const createPlayer = useGameStore((state) => state.createPlayer);
const currentPlayer = useGameStore((state) => state.currentPlayer);


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



        </main>
    );
}