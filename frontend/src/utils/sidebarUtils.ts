/**
 * Sidebar Utilities
 * Handles sidebar behavior and responsive logic without interfering with CSS
 */

export interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
}

/**
 * Check if current viewport is mobile
 */
export const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
};

/**
 * Toggle sidebar state based on current viewport
 * Only affects mobile behavior, desktop sidebar is always visible via CSS
 */
export const toggleSidebar = (currentState: boolean): boolean => {
  // On desktop, sidebar is always visible via CSS, so we don't change state
  if (!isMobileViewport()) {
    return false; // Always closed state on desktop (CSS handles visibility)
  }
  
  // On mobile, toggle the state
  return !currentState;
};

/**
 * Handle body scroll lock for mobile sidebar
 */
export const handleBodyScrollLock = (isOpen: boolean): void => {
  if (typeof document === 'undefined') return;
  
  if (isOpen && isMobileViewport()) {
    document.body.classList.add('sidebar-open');
  } else {
    document.body.classList.remove('sidebar-open');
  }
};

/**
 * Auto-close sidebar when resizing from mobile to desktop
 */
export const handleResize = (
  currentState: boolean,
  setState: (state: boolean) => void
): void => {
  if (!isMobileViewport() && currentState) {
    setState(false);
    handleBodyScrollLock(false);
  }
};

/**
 * Handle navigation item click
 * Closes sidebar only on mobile
 */
export const handleNavItemClick = (setState: (state: boolean) => void): void => {
  if (isMobileViewport()) {
    setState(false);
    handleBodyScrollLock(false);
  }
};

/**
 * Setup resize listener for sidebar
 */
export const setupResizeListener = (
  currentState: boolean,
  setState: (state: boolean) => void
): (() => void) => {
  const handleResizeEvent = () => handleResize(currentState, setState);
  
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResizeEvent);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResizeEvent);
      handleBodyScrollLock(false); // Cleanup body scroll lock
    };
  }
  
  return () => {}; // No-op cleanup for SSR
};
