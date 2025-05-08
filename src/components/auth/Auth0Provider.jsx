import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  const isDevelopment = import.meta.env.DEV;

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;

  const onRedirectCallback = (appState) => {
    if (appState?.returnTo?.includes('/admin')) {
      window.location.href = '/admin';
    } else {
      navigate(appState?.returnTo || window.location.pathname);
    }
  };

  // In development, render children without Auth0 if credentials are missing
  if (isDevelopment && !(domain && clientId)) {
    console.warn('Auth0 credentials not found. Authentication is disabled in development mode.');
    return children;
  }

  // In production, require Auth0 credentials
  if (!isDevelopment && !(domain && clientId)) {
    console.error('Auth0 credentials are required in production mode.');
    return null;
  }

  return (
    <Auth0Provider
      domain={domain || 'dummy-domain'}
      clientId={clientId || 'dummy-client-id'}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
