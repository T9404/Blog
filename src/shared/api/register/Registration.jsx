import axios from "axios";

const register = async (form) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/account/register`, {
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            birthDate: form.birthDate,
            gender: form.gender,
            phoneNumber: form.phoneNumber
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default register;