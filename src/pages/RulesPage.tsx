import PayoutTable from "../components/PayoutTable/PayoutTable";


/* Viser spillregler og oversikt over utbetalinger */
export default function RulesPage() {
    return (
        <main>
            <h1>Regler</h1>

            <section>
                <h2>Hvordan spille</h2>
                <p>
                    Velg hvor mange coins du vil satse, og trykk Deal for å få utdelt fem kort.
                    Velg kortene du ønsker å beholde før du trykker Draw.
                    Kortene du ikke velger å beholde blir byttet ut med nye kort.
                    Pokerhånden og innsatsen din avgjør hvor mange coins du vinner.
                </p>
            </section>

            <section>
                <h2>Utbetalinger</h2>
                <p>
                    Tabellen under viser utbetalingen for hver pokerhånd.
                </p>
                <PayoutTable />
            </section>

            
        </main>
    );
}