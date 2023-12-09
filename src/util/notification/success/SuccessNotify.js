import {toast} from "react-toastify";

const notifySuccess = (message) => {
    toast.success(`${message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'success1',
    });
};

export default notifySuccess;