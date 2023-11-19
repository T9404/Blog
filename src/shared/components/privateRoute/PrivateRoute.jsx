import { Navigate, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuth = localStorage.getItem('token');

    return isAuth ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" />;
};

export default observer(PrivateRoute);