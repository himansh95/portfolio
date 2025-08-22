// src/utils/smoothScroll.ts

/**
 * Smooth scroll to a target element on the page
 * @param targetId - The ID of the element to scroll to (without the #)
 * @param offset - Optional offset from the top of the element (default: 0)
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export const smoothScrollTo = (targetId: string, offset = 0, duration = 800): void => {
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with id "${targetId}" not found.`);
    return;
  }
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  const animation = (currentTime: number) => {
    if (startTime === null) {
      startTime = currentTime;
    }
    
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, scrollY);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  
  // Easing function for smooth animation
  const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };
  
  requestAnimationFrame(animation);
};

/**
 * Initialize smooth scrolling for all anchor links on the page
 * @param offset - Optional offset from the top of the element (default: 80px for header)
 */
export const initSmoothScroll = (offset = 80): void => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
      e.preventDefault();
      
      const targetId = anchor.hash.substring(1);
      smoothScrollTo(targetId, offset);
      
      // Update URL but don't add to browser history
      window.history.replaceState(null, '', anchor.hash);
    }
  });
};
