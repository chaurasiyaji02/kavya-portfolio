import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getPortfolioContent } from '../lib/api.js';
import { adaptPortfolioContent, createFallbackPortfolioContent, createResumeData } from '../lib/portfolioAdapters.js';

const PortfolioDataContext = createContext(null);

function PortfolioDataProvider({ children }) {
  const [content, setContent] = useState(createFallbackPortfolioContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setContent(adaptPortfolioContent(await getPortfolioContent()));
    } catch {
      setContent(createFallbackPortfolioContent());
      setError('The live portfolio API is unavailable. Showing saved portfolio content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({
      content,
      resumeData: createResumeData(content),
      loading,
      error,
      retry: load,
    }),
    [content, error, load, loading],
  );

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolioData() {
  const value = useContext(PortfolioDataContext);
  if (!value) {
    throw new Error('usePortfolioData must be used inside PortfolioDataProvider.');
  }
  return value;
}

export default PortfolioDataProvider;
