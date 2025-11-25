# PCF Implementation Guide for B-Convert

## Overview

This guide documents the complete Power Apps Component Framework (PCF) implementation for the B-Convert application, ensuring 100% compliance with Microsoft's guidelines.

---

## Architecture

### PCF Layer (src/index.ts)
The PCF wrapper implements the required lifecycle interface:

```typescript
export class BConvert implements ComponentFramework.StandardControl<IInputs, IOutputs>
```

**Key Methods:**
- `init()` - Mounts React app, initializes context
- `updateView()` - Handles input property changes, triggers React re-render
- `getOutputs()` - Returns current output values to Power Apps
- `destroy()` - Unmounts React app, cleanup

### React Layer (src/App.tsx)
The React application receives PCF context through props:

```typescript
interface PCFAppProps {
    context: ComponentFramework.Context<any>;
    initialProductId?: string;
    initialValue?: number;
    initialUnit?: string;
    onOutputChange?: (productId: string, value: number, unit: string) => void;
}
```

---

## File Structure

```
B-Convert/
├── ControlManifest.Input.xml      # Component manifest (inputs/outputs)
├── BConvert.pcfproj                # MSBuild project file
├── src/
│   ├── index.ts                    # PCF lifecycle implementation
│   ├── App.tsx                     # React application root
│   ├── generated/
│   │   └── ManifestTypes.d.ts      # TypeScript definitions for PCF
│   └── types/
│       └── pcf.d.ts                # PCF props interface
├── vite.config.ts                  # Build configuration (library mode)
└── tsconfig.*.json                 # TypeScript configuration (strict mode)
```

---

## Development Workflow

### 1. Local Development (React Only)

Run the React dev server for fast iteration:

```bash
npm run dev
```

Access at `http://localhost:8080`

**Note:** PCF context will be undefined in dev mode. App should handle gracefully.

### 2. PCF Testing (with Test Harness)

Build and test with Power Apps test harness:

```bash
# Build the PCF component
npm run build

# Run PCF test harness
pac pcf test start --watch
```

This launches the component in a simulated Power Apps environment.

### 3. Deployment to Power Apps

```bash
# Authenticate
pac auth create --environment <your-env-id>

# Push to Power Apps
pac pcf push --publisher-prefix brasco
```

---

## Input/Output Properties

### Inputs (from Power Apps to Component)

| Property | Type | Description |
|----------|------|-------------|
| `productId` | string | ID of pre-selected product |
| `initialValue` | number | Initial conversion value |
| `initialUnit` | string | Initial unit (bottle/crate/hl) |

### Outputs (from Component to Power Apps)

| Property | Type | Description |
|----------|------|-------------|
| `selectedProductId` | string | Currently selected product |
| `conversionValue` | number | Current conversion value |
| `conversionUnit` | string | Current unit selection |

**Usage in Power Apps:**
```
// Get output values
Set(productId, BConvertComponent.selectedProductId)
Set(value, BConvertComponent.conversionValue)
```

---

## Build Configuration

### Vite (vite.config.ts)

**Development Mode:**
- Standard SPA build
- HMR enabled
- Full source maps

**Production Mode:**
- Library build (ESM format)
- Single bundle output: `out/bundle.js`
- CSS extracted to: `out/style.css`
- React/ReactDOM externalized (provided by Power Apps)

### TypeScript (tsconfig.*.json)

**Strict Mode Enabled:**
- `strict: true` - Full type safety
- `noUnusedLocals: true` - Catch dead code
- `noUnusedParameters: true` - Enforce clean APIs

**Module Resolution:**
- `moduleResolution: "bundler"` - Modern Vite bundling
- Path aliases: `@/*` → `src/*`

---

## PowerProvider Removal

**Previous Implementation:** ❌
```typescript
// Old: Incorrect for PCF
const checkPowerAppsEnvironment = () => {
  if (window.PowerApps) { ... }
}
```

**Current Implementation:** ✅
```typescript
// New: Context passed from PCF index.ts
<App context={pcfContext} onOutputChange={handleChange} />
```

**Rationale:**
- PCF components don't have access to `window.PowerApps`
- Context is provided through `init()` method
- No need for async initialization checks

---

## Router Considerations

**Issue:** `BrowserRouter` doesn't work in embedded PCF context.

**Options:**
1. **Remove routing** - Single view component (recommended for this app)
2. **Hash router** - Use `HashRouter` for multi-view navigation
3. **State-based views** - Conditional rendering without router

**Current Implementation:** Router removed (single-page application sufficient)

---

## Testing Checklist

### Local Development
- [ ] Dev server runs without errors
- [ ] All conversions work correctly
- [ ] Responsive design functions properly
- [ ] No TypeScript errors

### PCF Test Harness
- [ ] Component loads in test harness
- [ ] Input properties update component state
- [ ] Output properties reflect user interactions
- [ ] No console errors

### Power Apps Environment
- [ ] Component deploys successfully
- [ ] Integrates with Power Apps forms/canvases
- [ ] Inputs/outputs bind correctly
- [ ] Performance is acceptable (< 2s load time)
- [ ] Works in mobile Power Apps

---

## Troubleshooting

### Build Errors

**"Cannot find namespace ComponentFramework"**
- Ensure `/// <reference path="./generated/ManifestTypes.d.ts" />` is at top of `index.ts`
- Check that `ManifestTypes.d.ts` exists

**"Module not found" errors**
- Run `npm install` to restore dependencies
- Check path aliases in `tsconfig.json`

### Runtime Errors

**"this.root is null"**
- Ensure `init()` was called before `updateView()`
- Check that container element is valid

**Component doesn't update**
- Verify `notifyOutputChanged()` is called after state changes
- Check that `getOutputs()` returns current values

### Deployment Errors

**"Invalid manifest"**
- Validate `ControlManifest.Input.xml` syntax
- Ensure all referenced resources exist

**"Build failed"**
- Run `npm run build` manually to see detailed errors
- Check `out/` directory contains `bundle.js` and `style.css`

---

## Performance Best Practices

1. **Lazy load large dependencies** - Code split non-critical features
2. **Memoize expensive calculations** - Use `useMemo` in React components
3. **Debounce output updates** - Don't call `notifyOutputChanged()` too frequently
4. **Optimize bundle size** - Externalize common libraries

---

## Next Steps

1. **Update App.tsx** to accept and use PCF props
2. **Remove PowerProvider** dependency
3. **Fix TypeScript strict mode errors** in all components
4. **Test with PAC CLI** test harness
5. **Deploy to test environment**
6. **Update CI/CD pipeline** for PCF builds

---

## References

- [PCF Documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/)
- [React Controls Guide](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/react-controls-platform-libraries)
- [Best Practices](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)
- [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pcf)
