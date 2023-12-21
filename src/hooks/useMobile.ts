import { useEffect, useState } from 'react';

const mobileBreak = 768;

export const useMobile = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  function handleWindowSizeChange() {
    const windowWidth = window.innerWidth;
    if (windowWidth < mobileBreak) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return isMobileView;
};
