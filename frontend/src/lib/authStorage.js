const ADMIN_SESSION_KEY = 'kavya_admin_session';
export const ADMIN_UNAUTHORIZED_EVENT = 'kavya:admin-unauthorized';

export function readAdminSession() {
  try {
    const stored = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function writeAdminSession(session) {
  window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getAdminToken() {
  return readAdminSession()?.token ?? '';
}
