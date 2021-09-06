import React, {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
} from 'react';
import { get } from 'services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// modify if new properties are added in the api response
const defaultUserData = { id: null, name: '', upvotes: [] };

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: false,
    data: { ...defaultUserData },
  });

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.data?.id) {
      (async () => {
        const res = await get('/employees/' + user.data.id);

        if (res.ok) {
          setUserAuth(res.data);
        } else {
          removeUserAuth(() => {
            window.history.pushState({}, '', '/login');
          });
        }
      })();
    }
  }, []);

  const setUserAuth = (userData, cb) => {
    const user = {
      isAuthenticated: true,
      data: { ...userData },
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));

    if (cb) {
      setTimeout(cb, 100);
    }
  };

  const removeUserAuth = (cb) => {
    setUser({
      isAuthenticated: false,
      data: { ...defaultUserData },
    });

    localStorage.removeItem('user');

    if (cb) {
      setTimeout(cb, 100);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserAuth,
        removeUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
