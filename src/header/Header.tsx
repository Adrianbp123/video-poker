import { NavLink } from "react-router";
import "./Header.css";


export default function Header() {
    return (
        <header className="Header">
            <nav>
                <NavLink to="/game">Spill</NavLink>
                <NavLink to="/rules">Regler</NavLink>
                <NavLink to="/players">Spillere</NavLink>
            </nav>
        </header>
    )
}