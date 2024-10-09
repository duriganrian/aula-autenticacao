import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { MdLogout } from 'react-icons/md';
import style from './Navegacao.module.css';
import AuthRequests from '../../fetch/AuthRequests';

function Navegacao() {

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const [vizualizacaoLogin, setVizualizacaoLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setUsername(storedUsername || '');
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/login';
    };

    const handleLogout = () => {
        AuthRequests.removeToken();
        localStorage.clear(); // Limpa todo o LocalStorage
        setIsAuthenticated(false);
        window.location.href = '/'; // Redireciona para a home
    };

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    <Nav>
                        <Nav.Link href="/" className={style.navLink}>Home</Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link href="/pessoas" className={style.navLink}>Pessoas</Nav.Link>

                                <NavDropdown
                                    title={`Olá ${username.split(' ')[0]}`}
                                    id={style.collapsibleNavDropdown}
                                    show={vizualizacaoLogin}
                                    onMouseEnter={() => setVizualizacaoLogin(true)}
                                    onMouseLeave={() => setVizualizacaoLogin(false)}
                                >
                                    <NavDropdown.Item onClick={handleLogout} className={style.navDropdown}>
                                        <MdLogout /> Sair
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Button onClick={handleLogin} variant='light'>Login</Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;
