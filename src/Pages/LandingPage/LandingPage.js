import './LandingPage.scss'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div class = "wrap">
        <main className = "landingPage">
            <h1 className = "landingPage__title">Response Bot</h1>
            <Link to = '/speak'><h2 className = "landingPage__nav">enter</h2></Link>
        </main>
        </div>
    )
}