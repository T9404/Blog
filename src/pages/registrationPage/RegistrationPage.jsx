import {useNavigate} from "react-router-dom";
import {useState} from "react";
import register from "../../shared/api/register/Registration";
import "react-datepicker/dist/react-datepicker.css";
import styles from './style.module.css';


const RegistrationPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        birthDate: '',
        gender: 'Male',
        phoneNumber: ''
    });
    
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setError(Object.values(validationErrors));
            return;
        }

        try {
            const result = await register(form);
            if (!result.error) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', form.email);
                await navigate('/');
            } else {
                setError(['Registration failed. Please check your data.']);
            }
        } catch (error) {
            setError(['Registration failed. Please check your data.']);
        }
    };

    const validate = (values)=>{
        const errors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/i;
        const passwordRegex = /^.*\d.*$/i;

        if (!emailRegex.test(values.email)) {
            errors.email = 'Неверный формат email\n';
        }

        if (!phoneRegex.test(values.phoneNumber)) {
            errors.phoneNumber = 'Неверный формат телефона\n';
        }

        if (!passwordRegex.test(values.password)) {
            errors.password = 'Пароль должен содержать хотя бы одну цифру\n';
        }

        return errors;
    };



    return (
        <div className={`mx-auto my-auto ${styles.registerForm}`}>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                <h3>Регистрация</h3>
                {error && (
                    <div className="error-message" style={{ color: 'red' }}>
                        {Object.values(error).map((errorMsg, index) => (
                            <p key={index}>{errorMsg}</p>
                        ))}
                    </div>
                )}
                <label htmlFor="exampleFullName1" className="form-label">ФИО</label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Иванов Иван Иванович"
                        name="fullName"
                        onChange={e => setForm({...form, fullName: e.currentTarget.value})}
                        required
                    />
                </div>

                <label htmlFor="exampleDateBirth1" className="form-label">
                    Дата рождения
                </label>
                <div className="mb-3">
                    <input
                        id="startDate"
                        className="form-control"
                        type="date"
                        onChange={e => setForm({...form, birthDate: e.currentTarget.value})}
                        required
                    />
                </div>

                <label htmlFor="exampleGender1" className="form-label">
                    Пол
                </label>
                <div className="mb-3">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={e => setForm({...form, gender: e.currentTarget.value})}
                    >
                        <option selected value="Male">Мужчина</option>
                        <option value="Female">Женщина</option>
                    </select>
                </div>


                <label htmlFor="phoneNumber1" className="form-label">
                    Телефон
                </label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="+7 (xxx) xxx-xx-xx"
                        onChange={e => setForm({...form, phoneNumber: e.currentTarget.value})}
                        required
                    />
                </div>

                <label htmlFor="email1" className="form-label">
                    Email
                </label>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => setForm({...form, email: e.currentTarget.value})}
                        required
                    />
                </div>

                <label htmlFor="email1" className="form-label">
                    Password
                </label>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setForm({...form, password: e.currentTarget.value})}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationPage;
