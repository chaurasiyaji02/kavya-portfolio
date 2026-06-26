export function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

export function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getContactItems(personal) {
  return [personal.email, personal.phone, personal.location, personal.portfolio, personal.github, personal.linkedin].filter(hasText);
}
