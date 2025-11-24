import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

export const PowerProvider = ({ children }: PowerProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPowerApps, setIsPowerApps] = useState(false);

  useEffect(() => {
    // Check if running in Power Apps environment
    const checkPowerAppsEnvironment = () => {
      // @ts-ignore - Power Apps SDK may not be available in dev environment
      if (typeof window !== 'undefined' && window.PowerApps) {
        setIsPowerApps(true);
        // @ts-ignore
        window.PowerApps.initialize?.()
          .then(() => {
            console.log('Power Apps SDK initialized successfully');
            setIsReady(true);
          })
          .catch((error: Error) => {
            console.error('Failed to initialize Power Apps SDK:', error);
            setIsReady(true); // Continue even if initialization fails
          });
      } else {
        // Running in regular browser environment
        setIsReady(true);
        setIsPowerApps(false);
      }
    };

    checkPowerAppsEnvironment();
  }, []);

  return (
    <PowerContext.Provider value={{ isReady, isPowerApps }}>
      {isReady ? children : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </PowerContext.Provider>
  );
};
