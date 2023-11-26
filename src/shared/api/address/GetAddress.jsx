import axios from 'axios';

const BASE_URL = 'https://blog.kreosoft.space/api';

const getAddressChain = async (objectGuid) => {
    try {
        const response = await axios.get(`${BASE_URL}/address/chain`, {
            params: {
                objectGuid: objectGuid
            },
            headers: {
                'Accept': 'text/plain'
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default getAddressChain;