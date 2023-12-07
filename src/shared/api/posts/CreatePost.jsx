import axios from 'axios';

const createPost = async (form) => {
    try {
        console.log(form)
        const response = await axios.post(`${process.env.REACT_APP_API}/community/${form.id}/post`, {
                title: form.title,
                description: form.text,
                readingTime: form.timeReading,
                image: form.pictureLink,
                addressId: form.addressGuid,
                tags: form.tags,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response.statusText)
            console.log(response.data)
        }
    } catch (error) {
        console.log(error) // fuck
        throw error;
    }
}

export default createPost;