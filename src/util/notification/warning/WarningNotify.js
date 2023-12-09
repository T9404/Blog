import {toast} from "react-toastify";

const notifyWarning = (message) => {
    toast.warning(`${message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'success1',
    });
};

export default notifyWarning;