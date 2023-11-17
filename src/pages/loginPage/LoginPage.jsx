import {useState} from "react";
import {useNavigate} from "react-router-dom";
import login from "../../shared/api/login/Login";
import styles from './style.module.css';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async e => {
        e.preventDefault();
        console.log("handleSubmit")
        try {
            const result = await login(email, password);

            if (result.accesstoken) {
                localStorage.setItem('my-key', result.accesstoken);
                localStorage.setItem('username', 'user');
                await navigate('/');
            } else {
                setError('Authentication failed. Please check your email and password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleChange = e => {
        console.log("handleChange")
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
    };

    return (
        <div className={`mx-auto my-auto ${styles.loginForm}`}>
            <form onSubmit={handleChange} className="shadow p-3 mb-5 bg-body rounded">
                <h3>Вход</h3>
                {error && <p className="error-message">{error}</p>} {}
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        autoComplete="email"
                        className="form-control"
                        placeholder="name@example.com"
                    />
                </div>
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <div className="mb-3">
                    <input
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className="form-control"
                    />
                </div>

                <div className="d-grid">
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-primary m-1">
                        Войти
                    </button>
                </div>
                <div className="d-grid">
                    <button onClick={() => navigate("/registration")} type="button" className="btn btn-secondary m-1">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;