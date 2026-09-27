import PayoutTable from "../components/PayoutTable/PayoutTable";
import "./RulesPage.css";

/* Viser spillregler og oversikt over utbetalinger */
export default function RulesPage() {
  return (
    <main className="rules-page">
      <h1>Regler</h1>

      <section className="rules-section">
        <h2>Hvordan spille</h2>
        <div className="rule-steps">
          <div className="rule-step">
            <h3>1. Velg innsats</h3>
            <p>
              Velg hvor mange coins du vil satse, og trykk Deal for å få utdelt
              fem kort.
            </p>
          </div>

          <div className="rule-step">
            <h3>2. Velg kort</h3>
            <p>Velg kortene du ønsker å beholde før du trykker Draw.</p>
          </div>

          <div className="rule-step">
            <h3>3. Trekk nye kort</h3>
            <p>Kortene du ikke velger å beholde blir byttet ut med nye kort.</p>
          </div>

          <div className="rule-step">
            <h3>4. Se resultatet</h3>
            <p>
              Pokerhånden og innsatsen din avgjør hvor mange coins du vinner.
            </p>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2>Utbetalinger</h2>
        <PayoutTable />
      </section>
    </main>
  );
}
