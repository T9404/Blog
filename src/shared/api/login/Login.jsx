const BASE_URL = 'https://blog.kreosoft.space/api';

const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
};

export default login;