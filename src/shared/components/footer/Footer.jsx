import styles from './style.module.css';
function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <span className="text-muted">&copy; 2022 - Блок №415{' '}</span>
            </div>
        </footer>
    );
}

export default Footer;