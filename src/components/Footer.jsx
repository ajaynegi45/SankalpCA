
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/*/!* Security Highlight Section *!/*/}
                {/*<div className={styles.securityBanner}>*/}
                {/*    <div className={styles.securityContent}>*/}
                {/*        <div className={styles.securityIcon}>🔐</div>*/}
                {/*        <div className={styles.securityText}>*/}
                {/*            <h3>100% Secure & Private</h3>*/}
                {/*            <p>All your data is stored locally on your device. No servers, no third parties, complete privacy guaranteed.</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <div className={styles.brandSection}>
                            <h3>🎯 SankalpCA</h3>
                            <p>Your trusted companion for CA Foundation success. Practice with confidence, knowing your data stays with you.</p>
                            {/*<div className={styles.features}>*/}
                            {/*    <span className={styles.feature}>🔓 No Login Required</span>*/}
                            {/*    <span className={styles.feature}>💾 Local Storage</span>*/}
                            {/*    <span className={styles.feature}>📊 Smart Analytics</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Quick Access</h4>
                        <ul className={styles.linkList}>
                            <li><a href="/subjects">📚 All Subjects</a></li>
                            <li><a href="/profile">👤 Your Profile</a></li>
                            <li><a href="/contact">💬 Contact Us</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>CA Foundation Subjects</h4>
                        <ul className={styles.linkList}>
                            <li><a href="/subject/accounting">💼 Accounting</a></li>
                            <li><a href="/subject/business-laws">⚖️ Business Laws</a></li>
                            <li><a href="/subject/quantitative-aptitude">🔢 Mathematics</a></li>
                            <li><a href="/subject/business-economics">📈 Economics</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.copyright}>
                        <p>&copy; 2025 SankalpCA. All rights reserved.</p>
                    </div>
                    <div className={styles.privacy}>
                        <span className={styles.privacyBadge}>Built with ❤️ for CA aspirants</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
