const BASE_URL = 'https://blog.kreosoft.space/api';

const register = async (form) => {
    try {
        const response = await fetch(`${BASE_URL}/account/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: form.fullName,
                password: form.password,
                email: form.email,
                birthDate: form.birthDate,
                gender: form.gender,
                phoneNumber: form.phoneNumber
            }),
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
}

export default register;