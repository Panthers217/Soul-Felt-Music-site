import React from 'react';
import { ArtistDesktopPage, ArtistMobilePage, ArtistPageTablet } from './ArtistPageMobile';

// ...existing code...

// Custom hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

const ArtistPage2 = () => {
  // ...existing data...

  // Media queries
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      {isDesktop && <ArtistDesktopPage />}
      {isTablet && <ArtistPageTablet />}
      {isMobile && <ArtistMobilePage />}
    </>
  );
};

export default ArtistPage2;