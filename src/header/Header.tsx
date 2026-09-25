import { NavLink } from "react-router";
import "./Header.css";


export default function Header() {
    return (
        <header className="Header">
            <nav>
                <NavLink className="nav-button" to="/game">Spill</NavLink>
                <NavLink className="nav-button" to="/rules">Regler</NavLink>
                <NavLink className="nav-button" to="/players">Spillere</NavLink>
            </nav>
        </header>
    )
}