import {Route, Routes} from "react-router-dom"
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import HomePage from "../pages/homePage/HomePage";
import Header from "../shared/components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../shared/components/footer/Footer";
import LoginPage from "../pages/loginPage/LoginPage";
import ProfilePage from "../pages/profilePage/ProfilePage";

function App() {
  return (
      <>
          <Header />
          <div className="container">
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/registration" element={<RegistrationPage />}/>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/profile" element={<ProfilePage />} />
              </Routes>
          </div>
          <Footer />
      </>
  );
}

export default App;


// <Navbar expand="lg" className={styles.header}> и файл css с классом header