
import Link from 'next/link'
import '../styles/home.css'

export default function HomePage() {
    return (
        <main className="home-container">
            <div className="hero-section">
                <h1 className="home-title">SankalpCA 🎯</h1>
                <p className="home-subtitle">Your trusted path to CA Foundation success starts here.</p>

                <div className="cta-section">
                    <p className="privacy-note">
                        Your privacy is our priority. No registration, no data collection, no tracking.
                        Everything stays on your device, giving you complete control over your learning data.
                    </p>
                    <Link href="/subjects" className="home-button">
                        <span>Start Practicing Now</span><span>🚀</span>
                    </Link>
                </div>

                <div className="security-highlight">
                    <div className="security-icon">🔐</div>
                    <h2 className="security-title">100% Secure & Private</h2>
                    <p className="security-description">
                        All your data is completely secure and stored locally on your device — no servers, no third parties.
                    </p>
                    <div className="privacy-badges">
                        <span className="privacy-badge">🛡️ No Data Collection</span>
                        <span className="privacy-badge">💾 Local Storage Only</span>
                        <span className="privacy-badge">🔒 Complete Privacy</span>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">🔓</span>
                        <h3 className="feature-title">No Login Required</h3>
                        <p className="feature-description">
                            Simply enter your name, email, and CA level — all saved locally using localStorage.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">📚</span>
                        <h3 className="feature-title">Organized MCQ Tests</h3>
                        <p className="feature-description">
                            Subject-wise and Chapter-wise multiple-choice questions for comprehensive practice.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">⏱️</span>
                        <h3 className="feature-title">Realistic Test Interface</h3>
                        <p className="feature-description">
                            Live timer and exam-like environment to simulate actual CA Foundation tests.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">🧠</span>
                        <h3 className="feature-title">Smart Result Analysis</h3>
                        <p className="feature-description">
                            Detailed explanations for incorrect answers and comprehensive performance insights.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">📈</span>
                        <h3 className="feature-title">Performance Analytics</h3>
                        <p className="feature-description">
                            Visual charts showing overall and subject-wise performance with detailed statistics.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">💾</span>
                        <h3 className="feature-title">Local Data Storage</h3>
                        <p className="feature-description">
                            All test results and progress stored securely on your device using localStorage.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
