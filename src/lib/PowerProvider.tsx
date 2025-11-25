import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initialize } from '@microsoft/power-apps/app';

interface PowerContextType {
  isReady: boolean;
  isPowerApps: boolean;
  powerApp: any | null;
}

const PowerContext = createContext<PowerContextType>({
  isReady: false,
  isPowerApps: false,
  powerApp: null,
});

export const usePower = () => useContext(PowerContext);

interface PowerProviderProps {
  children: ReactNode;
}

/**
 * PowerProvider for Power Apps Code Apps
 * Uses the official @microsoft/power-apps SDK
 * 
 * Reference: https://learn.microsoft.com/en-us/power-apps/developer/code-apps/
 */
export const PowerProvider = ({ children }: PowerProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPowerApps, setIsPowerApps] = useState(false);
  const [powerApp, setPowerApp] = useState<any>(null);

  useEffect(() => {
    const initializePowerApp = async () => {
      try {
        console.log('[PowerProvider] Attempting to initialize Power Apps SDK...');
        
        // Initialize Power Apps using the official SDK
        // Note: initialize() is called for its side effects, not return value
        await initialize();
        
        console.log('[PowerProvider] Power Apps SDK initialized successfully');
        setIsPowerApps(true);
        setPowerApp(true); // SDK initialized
      } catch (error) {
        // Not running in Power Apps environment (e.g., local development)
        console.log('[PowerProvider] Not running in Power Apps environment:', error);
        setIsPowerApps(false);
        setPowerApp(null);
      } finally {
        // Always set ready to allow app to render
        setIsReady(true);
      }
    };

    initializePowerApp();
  }, []);

  // Non-blocking: render children immediately without loading spinner
  // This ensures fast initial render in both dev and production
  return (
    <PowerContext.Provider value={{ isReady, isPowerApps, powerApp }}>
      {children}
    </PowerContext.Provider>
  );
};
