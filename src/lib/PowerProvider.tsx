import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initialize } from '@microsoft/power-apps/app';

interface PowerContextType {
 isReady: boolean;
 isPowerApps: boolean;
}

const PowerContext = createContext<PowerContextType>({
 isReady: false,
 isPowerApps: false,
});

export const usePower = () => useContext(PowerContext);

interface PowerProviderProps {
 children: ReactNode;
}

/**
* PowerProvider for Power Apps Code Apps
* Handles non-blocking SDK initialization and provides status via context.
*/
export const PowerProvider = ({ children }: PowerProviderProps) => {
 const [isReady, setIsReady] = useState(false);
 const [isPowerApps, setIsPowerApps] = useState(false);

 useEffect(() => {
  const initializePowerApp = async () => {
   try {
    console.log('[PowerProvider] Attempting to initialize Power Apps SDK...');
    
    await initialize();
    
    console.log('[PowerProvider] Power Apps SDK initialized successfully');
    // This flag confirms we are running inside the Power Apps host
    setIsPowerApps(true);
   } catch (error) {
    console.error('[PowerProvider] Not running in Power Apps environment or initialization failed:', error);
    // This flag confirms we are NOT running inside the Power Apps host
    setIsPowerApps(false);
   } finally {
    // CRITICAL: Always set ready to true to allow the app to render (non-blocking)
    setIsReady(true);
   }
  };

  initializePowerApp();
 }, []);

 // Non-blocking render, adhering to fast initial load guideline
 return (
  <PowerContext.Provider value={{ isReady, isPowerApps }}>
   {children}
  </PowerContext.Provider>
 );
};