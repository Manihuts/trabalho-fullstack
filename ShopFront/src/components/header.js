import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { AuthServices } from '../services/authServices'; 

const CustomNavbar = () => {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();
const userObj = JSON.parse(user);
  const handleLogout = () => {
    logout();
    AuthServices.logout();
    navigate('/login'); 
  };

 
  // const getCartIcon = () => {
  //   const cartImage = user?.carrinho && user.carrinho.length > 0
  //     ? '/assets/carrinho_com_itens.png'
  //     : '/assets/carrinho_sem_itens.png';

  //   return <img src={cartImage} alt="Carrinho" style={{ width: '35px', height: '35px' }} />;
  // };


  const getPageName = () => {
    const path = window.location.pathname;
    if (path === '/store') return 'Store';
    if (path === '/cart') return 'Carrinho';
    if (path === '/inventario') return 'Inventário';
    
  };

  return (
    <Navbar bg="dark" expand="lg" className="shadow-sm mb-4 py-3">
      <Container>
        <Navbar.Brand href="/">
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            {getPageName()}
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
   
            {authToken && user && (
              <span className="mr-3" style={{ fontSize: '1.2rem', color: '#fff' }}>
                Bem-vindo, {userObj.Nome}!
              </span>
            )}

       
            {/* <Button
              variant="link"
              onClick={() => navigate('/cart')}
              className="mr-3 d-flex align-items-center"
              style={{ fontSize: '1.2rem', color: '#fff' }}
            >
              {getCartIcon()}
            </Button> */}

            {authToken && user && (
              <Button
                variant="link"
                onClick={() => navigate('/inventario')}
                className="mr-3"
                style={{ fontSize: '1.2rem', color: '#fff' }}
              >
                Inventário
              </Button>
            )}

            {/* <Button
              variant="link"
              onClick={() => navigate(authToken ? '/store' : '/login')}
              style={{
                fontSize: '1.2rem',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {authToken ? 'Store' : 'Login'}
            </Button> */}

            {authToken && (
              <Button
                variant="link"
                onClick={handleLogout}
                style={{
                  fontSize: '1.2rem',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
