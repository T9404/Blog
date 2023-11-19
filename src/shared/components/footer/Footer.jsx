import styles from './style.module.css';
function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <div className="container">
                <span className="text-muted">&copy; 2022 - Блок №415{' '}</span>
            </div>
        </footer>
    );
}

export default Footer;

// <div class="col-6 col-sm-3">.col-6 .col-sm-3</div> от 0 до 576 px 1/2 экрана, а от 576px  1/4 экрана