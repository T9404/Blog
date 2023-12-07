import {toast} from "react-toastify";

const notifyError = (message) => {
    toast.error(`${message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'success1',
    });
};

export default notifyError;