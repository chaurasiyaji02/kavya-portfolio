import { useEffect } from 'react';

const defaultImagePath = '/og-image.png';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

function absoluteUrl(baseUrl, value) {
  try {
    return new window.URL(value, `${baseUrl}/`).toString();
  } catch {
    return value;
  }
}

function Seo({ title, description, path = '/', noIndex = false }) {
  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const canonicalUrl = absoluteUrl(siteUrl, path);
    const imageUrl = absoluteUrl(
      siteUrl,
      import.meta.env.VITE_OG_IMAGE_URL || defaultImagePath,
    );

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    setCanonical(canonicalUrl);
  }, [description, noIndex, path, title]);

  return null;
}

export default Seo;
