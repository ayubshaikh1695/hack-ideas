import React, { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { get } from 'services/api';
import { useAuth } from 'context/auth-context-provider';
import Jumbotron from 'components/Jumbotron/jumbotron.component';
import AppHeader from 'components/AppHeader/app-header.component';
import LoginImage from 'assets/undraw-login.svg';
import styles from './login.module.css';

const HELPER_TEXT = {
  default: '',
  employeeIdRequired: 'Employee id is required.',
  employeeIdInvalid: 'Employee does not exist.',
};

function Login() {
  let auth = useAuth();
  let history = useHistory();

  const [employeeId, setEmployeeId] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState(HELPER_TEXT.default);

  useLayoutEffect(() => {
    if (auth.user.isAuthenticated) {
      history.push('/');
    }

    // eslint-disable-next-line
  }, [auth.user.isAuthenticated]);

  const handleInput = (e) => {
    const value = e.target.value;
    setEmployeeId(value);

    setHasError(value.length === 0);
    setErrorText(
      value.length === 0 ? HELPER_TEXT.employeeIdRequired : HELPER_TEXT.default
    );
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!employeeId.trim()) {
      setHasError(true);
      setErrorText(HELPER_TEXT.employeeIdRequired);
    } else {
      const res = await get('/employees/' + employeeId);

      if (res.ok) {
        auth.setUserAuth(res.data, () => {
          history.push('/');
        });
      } else {
        setHasError(true);
        setErrorText(HELPER_TEXT.employeeIdInvalid);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <Jumbotron>
        <Container style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Card
            className='text-center'
            style={{ maxWidth: '40rem', margin: '0 auto' }}
          >
            <Card.Header className='h4'>Login</Card.Header>
            <Card.Img
              variant='top'
              src={LoginImage}
              style={{
                maxWidth: 340,
                margin: '0 auto',
                padding: '.5rem 1rem',
              }}
            />
            <Card.Body>
              <Card.Text style={{ textAlign: 'left' }}>
                Login using any one of these employee ID, "emp1", "emp2",
                "emp3". These are the authorized employees and you cannot login
                with any other employee ID except these three.
              </Card.Text>
              <InputGroup
                className='mb-2'
                style={{ maxWidth: '25rem', margin: '0 auto' }}
              >
                <FormControl
                  placeholder='Employee ID'
                  value={employeeId}
                  onChange={handleInput}
                  onKeyUp={handleKeyUp}
                  data-testid='employee-id-input'
                />
                <Button
                  variant='primary'
                  onClick={handleLogin}
                  data-testid='login-button'
                >
                  Login
                </Button>
              </InputGroup>
              <div className={styles['helper-text-container']}>
                {hasError && (
                  <Form.Text className='text-danger' data-testid='error-text'>
                    {errorText}
                  </Form.Text>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Login;
