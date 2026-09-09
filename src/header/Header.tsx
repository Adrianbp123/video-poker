import { NavLink } from "react-router";


export default function Header() {
    return (
        <header className="Header">
            <nav>
                <NavLink to="/">Hjem</NavLink>
                <NavLink to="/game">Spill</NavLink>
                <NavLink to="/rules">Regler</NavLink>
                <NavLink to="/players">Spillere</NavLink>
            </nav>
        </header>
    )
}