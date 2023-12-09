import axios from "axios";

const updateProfile = async (form) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/account/profile`, {
            email: form.email,
            fullName: form.fullName,
            birthDate: form.birthDate,
            gender: form.gender,
            phoneNumber: form.phoneNumber
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return Promise.reject(Error('Вы не авторизованы'));
        }
    } catch (error) {
        throw error;
    }
}

export default updateProfile;