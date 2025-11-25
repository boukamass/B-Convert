/**
 * Type definitions for PCF component props passed from index.ts to React App
 */

export interface PCFAppProps {
    context?: ComponentFramework.Context<any>;
    initialProductId?: string;
    initialValue?: number;
    initialUnit?: string;
    onOutputChange?: (productId: string, value: number, unit: string) => void;
}
