import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link href="/">SankalpCA</Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/subjects">Subjects</Link>
                </li>
                <li>
                    <Link href="/profile" >Profile</Link>
                </li>
            </ul>
        </nav>
    )
}
