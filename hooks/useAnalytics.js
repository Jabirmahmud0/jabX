export function useAnalytics() {
  const trackEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    } else {
      // dev: console.log('Track Event:', eventName, params);
    }
  };
  return { trackEvent };
}
