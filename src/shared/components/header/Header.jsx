import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom";
import Logout from "../logout/Logout";

function Header() {
    const authenticated = !!localStorage.getItem('my-key');

    useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow p-3 mb-5 bg-body rounded">
            <Container>
                <Navbar.Brand>Блог №415</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {authenticated ? (
                            <>
                                <Nav.Link><Logout /></Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Вход</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;