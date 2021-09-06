import React from 'react';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from 'context/auth-context-provider';
import { Link, useHistory } from 'react-router-dom';
import HackathonImage from 'assets/hackathon.png';
import styles from './app-header.module.css';

function AppHeader() {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth.removeUserAuth(() => {
      history.push('/');
    });
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as='div'>
          <Link className={styles.anchor} to='/'>
            <img
              alt='hackathon'
              src={HackathonImage}
              width='30'
              height='30'
              className='d-inline-block align-top'
              style={{ marginRight: 4 }}
            />
            Hack Ideas
          </Link>
        </Navbar.Brand>
        {auth.user.isAuthenticated && (
          <div className='d-inline-flex'>
            <Navbar.Text className='display-at-576'>Logged in as:</Navbar.Text>
            <NavDropdown
              align='end'
              title={
                <Navbar.Text>
                  <u className='text-white'>{auth.user.data.name}</u>
                </Navbar.Text>
              }
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default AppHeader;
