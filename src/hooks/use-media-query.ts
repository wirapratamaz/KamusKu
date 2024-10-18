import { useState, useEffect } from 'react';

/**
 * Hook to determine if the current viewport matches the given media query.
 * @param query - The media query string (e.g., '(max-width: 768px)')
 * @returns A boolean indicating whether the media query matches.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};