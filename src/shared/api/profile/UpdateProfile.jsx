import axios from "axios";

const BASE_URL = 'https://blog.kreosoft.space/api';

const updateProfile = async (form) => {
    try {
        const response = await axios.put(`${BASE_URL}/account/profile`, {
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
            throw new Error('Unauthorized');
        }
    } catch (error) {
        throw error;
    }
}

export default updateProfile;