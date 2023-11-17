import {redirect} from "react-router-dom";
import {useState} from "react";
import register from "../../shared/api/register/Registration";

const RegistrationPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        birthDate: '',
        gender: '',
        phoneNumber: ''
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = register(fullName, email, password, birthDate, gender, phoneNumber);
        if (!result.error) {
            console.log(result.message);
            redirect('/');
        } else {
            setError('Authentication failed.')
            console.log(result.error);
        }
    };

    /*const handleChange = e => {
        switch (e.currentTarget.name) {
            case 'email':
                setEmail(e.currentTarget.value);
                break;
            case 'fullName':
                setFullName(e.currentTarget.value);
                break;
            case 'password':
                setForm({...form, password:e.currentTarget.value});
                break;
            case 'birthDate':
                setBirthDate(e.currentTarget.value);
                break;
            case 'gender':
                setGender(e.currentTarget.value);
                break;
            case 'phoneNumber':
                setPhoneNumber(e.currentTarget.value);
                break;
        }
    };*/

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            {error && <p className="error-message">{error}</p>}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstname"
                    onChange={e => setForm({...form, fullName:e.currentTarget.value})}
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    placeholder="Last name"
                    onChange={e => setForm({...form, fullName:e.currentTarget.value})}
                />
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setForm({...form, email:e.currentTarget.value})}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    onChange={handleChange}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/login">sign in?</a>
            </p>
        </form>
    );
}

export default RegistrationPage;
