import './App.css'
import { Link } from 'react-router'

function App() {

  return (

    <main className="start-page">
      <h1>Video Poker</h1>

      <Link className="nav-button" to="/players">
      START
      </Link>
    </main>

  )
}

export default App
