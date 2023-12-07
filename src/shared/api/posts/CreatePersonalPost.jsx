import axios from 'axios';

const createPersonalPost = async (form) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/post`, {
                title: form.title,
                description: form.text,
                readingTime: form.timeReading,
                image: form.pictureLink,
                addressId: form.addressGuid,
                tags: form.tags,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export default createPersonalPost;