const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1').replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const { headers, ...requestOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  const payload = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message ?? `API request failed with status ${response.status}`);
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
