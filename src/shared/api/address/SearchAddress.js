import axios from 'axios';

const searchAddress = async (parentObjectId, query) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/address/search`, {
            params: {
                parentObjectId: parentObjectId,
                query: query
            },
            headers: {
                'Accept': 'text/plain'
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default searchAddress;