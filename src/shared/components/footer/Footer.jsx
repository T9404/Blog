import styles from './style.module.css';
function Footer() {

    /*const [place, setPlace] = useState({
        subject: '',
        city: '',
    });*/

    return (
        <footer className={`position-fixed ${styles.footer}`}>
            <div className="container">
                <span className="text-muted">&copy; 2022 - Блок №415{' '}</span>
            </div>
        </footer>
        /*<footer className={styles.footer}>
            <div className="container">
                <span className="text-muted">&copy; 2022 - Блок №415{' '}</span>
            </div>
            <input value={place.subject}/>
            {
                place.subject && <input value={place.city}/>
            }
            <input value={place.city}/>
            {
                place.city && <input value={place.subject}/>
            }


        </footer>*/
    );
}

export default Footer;

// <div class="col-6 col-sm-3">.col-6 .col-sm-3</div> от 0 до 576 px 1/2 экрана, а от 576px  1/4 экрана