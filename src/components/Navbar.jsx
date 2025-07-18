import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/">
                        <span className={styles.logo}>🎯</span>
                        <span className={styles.brandText}>SankalpCA</span>
                    </Link>
                </div>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/subjects" className={styles.navLink}>
                            <span>Subjects</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className={styles.navLink}>
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
