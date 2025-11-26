import { initialize } from "@microsoft/power-apps/app";
import { useEffect, type ReactNode } from "react";

interface PowerProviderProps {
    children: ReactNode;
}

export default function PowerProvider({ children }: PowerProviderProps) {
    useEffect(() => {
        const initApp = async () => {
            try {
                console.log('[PowerProvider] Initializing Power Apps SDK...');
                await initialize();
                console.log('[PowerProvider] Power Apps SDK initialized successfully');
            } catch (error) {
                console.error('[PowerProvider] Failed to initialize Power Apps SDK:', error);
                console.log('[PowerProvider] App will continue in standalone mode');
            }
        };

        initApp();
    }, []);

    return <>{children}</>;
}