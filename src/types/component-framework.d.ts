/**
 * Power Apps Component Framework (PCF) type definitions
 * These types define the PCF runtime API available to code components
 */

declare namespace ComponentFramework {
    export interface Context<T> {
        parameters: T;
        mode: {
            isVisible: boolean;
            isControlDisabled: boolean;
            trackContainerResize(value: boolean): void;
        };
        factory: any;
        formatting: any;
        utils: {
            getEntityMetadata(entityType: string): Promise<any>;
            lookupObjects(lookupOptions: any): Promise<any>;
        };
        webAPI: any;
        updatedProperties: string[];
    }

    export interface Dictionary {
        [key: string]: any;
    }

    export interface StandardControl<TInputs, TOutputs> {
        init(
            context: Context<TInputs>,
            notifyOutputChanged: () => void,
            state: Dictionary,
            container: HTMLDivElement
        ): void;
        updateView(context: Context<TInputs>): void;
        getOutputs(): TOutputs;
        destroy(): void;
    }

    export namespace PropertyTypes {
        export interface Property {
            type: string;
            raw: any;
            formatted?: string;
            error?: boolean;
            errorMessage?: string;
            security?: any;
        }

        export interface StringProperty extends Property {
            raw: string | null;
        }

        export interface WholeNumberProperty extends Property {
            raw: number | null;
        }
    }
}

export {};
