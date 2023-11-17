import {Route, Routes} from "react-router-dom"
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import HomePage from "../pages/HomePage/HomePage";

function App() {
  return (
      <div className="container">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registration" element={<RegistrationPage />}/>
          </Routes>
      </div>
  );
}

export default App;
