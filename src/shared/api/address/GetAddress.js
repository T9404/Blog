import axios from 'axios';

const getAddressChain = async (objectGuid) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/address/chain`, {
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