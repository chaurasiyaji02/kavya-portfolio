import {
  ADMIN_UNAUTHORIZED_EVENT,
  clearAdminSession,
  getAdminToken,
} from './authStorage.js';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest(path, options = {}) {
  const { headers, ...requestOptions } = options;
  const token = getAdminToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const payload = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token) {
      clearAdminSession();
      window.dispatchEvent(new window.CustomEvent(ADMIN_UNAUTHORIZED_EVENT));
    }
    throw new ApiError(
      payload?.message ?? `API request failed with status ${response.status}`,
      response.status,
    );
  }

  return payload?.data ?? payload;
}

export function getPortfolioContent() {
  return Promise.all([
    apiRequest('/projects'),
    apiRequest('/skills'),
    apiRequest('/education'),
    apiRequest('/certifications'),
    apiRequest('/experiences'),
    apiRequest('/social-links'),
    apiRequest('/resume-profile'),
  ]).then(([projects, skills, education, certifications, experience, socialLinks, resumeProfile]) => ({
    projects,
    skills,
    education,
    certifications,
    experience,
    socialLinks,
    resumeProfile,
  }));
}

export function submitContactMessage(message) {
  return apiRequest('/contact-messages', {
    method: 'POST',
    body: JSON.stringify(message),
  });
}

export function loginAdmin(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getAdminContactMessages() {
  return apiRequest('/admin/contact-messages');
}
