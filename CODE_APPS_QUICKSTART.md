# Quick Start - Power Apps Code Apps

## 🚀 Get Started in 5 Minutes

### Prerequisites
```bash
# Node.js 18+
node --version

# Install PAC CLI globally
npm install -g @microsoft/powerplatform-cli

# Verify
pac --version
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# Opens at http://localhost:8080
```

**Note**: In local development, the app runs without Power Apps SDK. All features work normally.

---

## Deploy to Power Apps

### One-Time Setup

```bash
# Authenticate to your Power Platform environment
pac auth create --environment <YOUR-ENV-ID>

# Find your environment ID
pac org list
```

### Deploy

```bash
# Build the app
npm run build

# Push to Power Apps
pac code push

# ✅ Your Code App is now live in Power Apps!
```

---

## Update & Redeploy

```bash
# 1. Make your code changes
# 2. Test locally with npm run dev
# 3. Build and deploy

npm run build
pac code push
```

---

## Project Structure

```
B-Convert/
├── power.config.json          # Code App configuration
├── src/
│   ├── lib/PowerProvider.tsx  # Power Apps SDK integration
│   ├── App.tsx                # Main app component
│   ├── pages/                 # Application pages
│   └── components/            # React components
├── vite.config.ts             # Build configuration
└── .github/workflows/         # CI/CD automation
```

---

## Key Files

### power.config.json
Configures your Code App for Power Apps:
- `appId`: Your app's unique identifier
- `environmentId`: Target Power Platform environment
- `buildPath`: Where built files are (`./dist`)

### src/lib/PowerProvider.tsx
Initializes the Power Apps SDK:
- Calls `initialize()` from `@microsoft/power-apps/app`
- Provides context via `usePower()` hook
- Gracefully handles non-Power Apps environments

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `pac code push` | Deploy to Power Apps |
| `pac auth list` | Show auth profiles |
| `pac auth create` | Add new environment |

---

## Environment Detection

Your app automatically detects its environment:

```typescript
import { usePower } from '@/lib/PowerProvider';

const MyComponent = () => {
  const { isPowerApps, isReady } = usePower();
  
  if (isPowerApps) {
    // Running in Power Apps
    console.log('We are in Power Apps!');
  } else {
    // Local development or standalone
    console.log('Running standalone');
  }
};
```

---

## CI/CD (GitHub Actions)

**Automatic deployment** on push to `main`:

1. Builds the app
2. Authenticates to Power Platform
3. Deploys with `pac code push`

**Required GitHub Secrets**:
- `POWER_APPS_CLIENT_ID`
- `POWER_APPS_CLIENT_SECRET`
- `POWER_APPS_TENANT_ID`
- `POWER_APPS_ENVIRONMENT_ID`

---

## Troubleshooting

### Build Fails
```bash
# Clear and rebuild
rm -rf dist/ node_modules/
npm install
npm run build
```

### Can't Deploy
```bash
# Check authentication
pac auth list

# Re-authenticate if needed
pac auth create --environment <ENV-ID>
```

### App Doesn't Load in Power Apps
1. Verify `power.config.json` has correct `environmentId`
2. Check that `dist/` folder has `index.html`
3. Ensure build completed without errors
4. Check Power Apps portal for error messages

---

## Development Tips

### Fast Iteration
- Keep `npm run dev` running for instant feedback
- Use browser DevTools for debugging
- Test responsiveness for mobile Power Apps

### Router Support
✅ Code Apps fully support React Router:
```typescript
<BrowserRouter>  {/* Works perfectly in Code Apps */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

### Power Apps API
Access Power Apps features through the SDK:
```typescript
import { usePower } from '@/lib/PowerProvider';

const { isPowerApps, powerApp } = usePower();

if (isPowerApps && powerApp) {
  // Use Power Apps APIs here
  // Example: navigation, logging, etc.
}
```

---

## Resources

- 📚 [Code Apps Documentation](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)
- 🔧 [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/code)
- 📦 [@microsoft/power-apps SDK](https://www.npmjs.com/package/@microsoft/power-apps)
- 📖 [Project Documentation](./CODE_APPS_COMPLIANCE.md)

---

## Next Steps

1. ✅ Run `npm run dev` to start development
2. 📝 Make your changes
3. 🧪 Test locally
4. 🚀 Deploy with `pac code push`
5. 📖 Read `CODE_APPS_COMPLIANCE.md` for best practices

---

## 💡 Pro Tips

- Commit changes before deploying (easy rollback)
- Use environment variables for configuration
- Test on mobile Power Apps for responsive design
- Monitor console logs in Power Apps portal
- Keep dependencies updated

Happy coding! 🎉
