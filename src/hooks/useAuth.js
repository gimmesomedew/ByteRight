import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const login = () => loginWithRedirect();
  
  const logoutUser = () => {
    logout({ returnTo: window.location.origin });
  };

  return {
    isAuthenticated,
    user,
    login,
    logout: logoutUser,
    isLoading,
    getAccessTokenSilently,
  };
}
