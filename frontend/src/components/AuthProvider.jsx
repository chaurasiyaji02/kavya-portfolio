import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginAdmin } from '../lib/api.js';
import {
  ADMIN_UNAUTHORIZED_EVENT,
  clearAdminSession,
  readAdminSession,
  writeAdminSession,
} from '../lib/authStorage.js';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [session, setSession] = useState(readAdminSession);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setSession(null);
      setSessionExpired(true);
    };
    window.addEventListener(ADMIN_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(ADMIN_UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const login = useCallback(async (credentials) => {
    const nextSession = await loginAdmin(credentials);
    writeAdminSession(nextSession);
    setSession(nextSession);
    setSessionExpired(false);
    return nextSession;
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    setSession(null);
    setSessionExpired(false);
  }, []);

  const value = useMemo(
    () => ({
      session,
      sessionExpired,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [login, logout, session, sessionExpired],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return value;
}

export default AuthProvider;
