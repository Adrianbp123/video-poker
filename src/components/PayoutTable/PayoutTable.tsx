import { payouts } from "../../game/payouts";
import "./PayoutTable.css"


/* Viser en tabell med pokerhender og hvor mye hver hånd betaler */
export default function PayoutTable() {

    return (
        <table className="payout-table">
            <thead>
                <tr>
                    <th>Pokerhånd</th>
                    <th>Utbetaling</th>
                </tr>
            </thead>

            <tbody>
            {Object.entries(payouts).map(([hand, multiplier]) => (

                <tr key={hand}>
                    <td>{hand}</td>
                    <td>{multiplier}x</td>
                 </tr>
            ))}
            </tbody>
        </table>

    );
}