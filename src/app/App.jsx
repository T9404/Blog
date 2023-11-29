import {Route, Routes} from "react-router-dom"
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import HomePage from "../pages/homePage/HomePage";
import Header from "../shared/components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../shared/components/footer/Footer";
import LoginPage from "../pages/loginPage/LoginPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import PrivateRoute from "../util/PrivateRoute";
import IndividualPostPage from "../pages/individualPostPage/IndividualPostPage";
import GroupPage from "../pages/groupPage/GroupPage";
import AuthorPage from "../pages/authorPage/AuthorPage";
import PostCreationPage from "../pages/postCreationPage/PostCreationPage";

function App() {
  return (
      <>
          <Header/>
          <div className="container">
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/profile" element={<ProfilePage/>}/>
                      <Route path="/communities" element={<GroupPage/>}/>
                      <Route path="/authors" element={<AuthorPage/>}/>
                      <Route path="/post/create" element={<PostCreationPage/>}/>
                  </Route>
                  <Route path="/registration" element={<RegistrationPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/post/:id" element={<IndividualPostPage/>}/>
              </Routes>
          </div>
          <Footer/>
      </>
  );
}

export default App;


// <Navbar expand="lg" className={styles.header}> и файл css с классом header
// <footer className={`${styles.footer}`}>