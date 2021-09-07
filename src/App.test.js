import React from 'react';
import App from 'App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('initial UI is rendered as expected', () => {
  const renderApp = () => render(<App />);

  let { getByTestId, queryByTestId } = renderApp();
  expect(getByTestId('employee-id-input')).toHaveValue('');
  expect(getByTestId('login-button')).toHaveTextContent('Login');
  expect(queryByTestId('error-text')).toBe(null);
});
