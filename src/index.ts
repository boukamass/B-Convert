/// <reference path="./types/component-framework.d.ts" />

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { createRoot, Root } from "react-dom/client";
import { createElement } from "react";
import App from "./App";

/**
 * PCF Code Component for B-Convert Application
 * Implements the Power Apps Component Framework lifecycle
 */
export class BConvert implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private root: Root | null = null;

    // Output values
    private selectedProductId: string = "";
    private conversionValue: number = 0;
    private conversionUnit: string = "bottle";

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls 
     * and other initialization actions here.
     * @param context The entire property bag available to control via Context Object
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready
     * @param state A piece of data that persists in one session for a single user
     * @param container The div element to render the React component
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        console.log("[BConvert] Initializing PCF component");
        
        this.context = context;
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;

        // Set container to take full available space
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.overflow = "auto";

        // Initialize output values from context if provided
        if (context.parameters.productId?.raw) {
            this.selectedProductId = context.parameters.productId.raw;
        }
        if (context.parameters.initialValue?.raw) {
            this.conversionValue = context.parameters.initialValue.raw;
        }
        if (context.parameters.initialUnit?.raw) {
            this.conversionUnit = context.parameters.initialUnit.raw;
        }

        // Mount React application
        this.mountReactApp();

        console.log("[BConvert] Component initialized successfully");
    }

    /**
     * Called when any value in the property bag has changed
     * @param context The entire property bag available to control via Context Object
     * @returns ReactElement for frameworks expecting a render method
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        console.log("[BConvert] UpdateView called");
        
        this.context = context;

        // Check if input properties have changed and update React app if needed
        const productIdChanged = context.parameters.productId?.raw !== this.selectedProductId;
        const valueChanged = context.parameters.initialValue?.raw !== this.conversionValue;
        const unitChanged = context.parameters.initialUnit?.raw !== this.conversionUnit;

        if (productIdChanged || valueChanged || unitChanged) {
            console.log("[BConvert] Input properties changed, re-mounting React app");
            
            if (context.parameters.productId?.raw) {
                this.selectedProductId = context.parameters.productId.raw;
            }
            if (context.parameters.initialValue?.raw) {
                this.conversionValue = context.parameters.initialValue.raw;
            }
            if (context.parameters.initialUnit?.raw) {
                this.conversionUnit = context.parameters.initialUnit.raw;
            }

            // Re-mount with new props
            this.mountReactApp();
        }
    }

    /**
     * Called by the framework to retrieve output data
     * @returns An object containing bound properties and their values
     */
    public getOutputs(): IOutputs {
        return {
            selectedProductId: this.selectedProductId,
            conversionValue: this.conversionValue,
            conversionUnit: this.conversionUnit
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree
     */
    public destroy(): void {
        console.log("[BConvert] Destroying component");
        
        // Unmount React app
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }

    /**
     * Mount the React application with current context and callbacks
     */
    private mountReactApp(): void {
        // Create or reuse root
        if (!this.root) {
            this.root = createRoot(this.container);
        }

        // Create props to pass to React app
        const appProps = {
            context: this.context,
            initialProductId: this.selectedProductId,
            initialValue: this.conversionValue,
            initialUnit: this.conversionUnit,
            onOutputChange: this.handleOutputChange.bind(this)
        };

        // Render React app
        this.root.render(createElement(App, appProps));
    }

    /**
     * Handle output changes from React components
     */
    private handleOutputChange(productId: string, value: number, unit: string): void {
        console.log("[BConvert] Output changed:", { productId, value, unit });
        
        this.selectedProductId = productId;
        this.conversionValue = value;
        this.conversionUnit = unit;

        // Notify Power Apps framework that outputs have changed
        this.notifyOutputChanged();
    }
}
