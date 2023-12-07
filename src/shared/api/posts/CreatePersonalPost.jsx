import axios from 'axios';
import statusErrorMessages from "../../../util/notification/error/StatusErrorMessages";
import parseAllErrors from "../../../util/notification/error/ParseAllErrors";

const createPersonalPost = async (form) => {
    try {
        const requestData = {
            title: form.title,
            description: form.text,
            readingTime: form.timeReading,
            tags: form.tags,
            ...(form.addressGuid !== '' && { addressId: form.addressGuid }),
            ...(form.pictureLink !== '' && { image: form.pictureLink }),
        };
        
        const response = await axios.post(`${process.env.REACT_APP_API}/post`, requestData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
        if (response.status === 200) {
            return response.data;
        } else {
            const errorMessage = statusErrorMessages[response.status] || `Unexpected status code: ${response.status}`;
            return Promise.reject(Error(errorMessage));
        }
    } catch (error) {
        throw new Error(parseAllErrors(error));
    }
}

export default createPersonalPost;