import {Route, Routes} from "react-router-dom"
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import HomePage from "../pages/homePage/HomePage";
import Header from "../shared/components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
          <Header />
          <div className="container">
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/registration" element={<RegistrationPage />}/>
              </Routes>
          </div>
      </>
  );
}

export default App;


// <Navbar expand="lg" className={styles.header}> и файл css с классом header