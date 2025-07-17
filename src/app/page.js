import Link from 'next/link'
import '@//styles/home.css'

export default function HomePage() {
  return (
      <main className="home-container">
        <h1 className="home-title">SankalpCA 💡</h1>
        <p className="home-subtitle">Your path to CA Foundation success starts here.</p>
        <Link href="/subjects" className="home-button">Start Practicing</Link>
      </main>
  )
}
