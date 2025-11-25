# Quick Start - PCF Development

## 🚀 Get Started in 5 Minutes

### Prerequisites
```bash
# Install Node.js 18+
node --version

# Install PAC CLI globally
npm install -g @microsoft/powerplatform-cli

# Verify installation
pac --version
```

### Initial Setup
```bash
# 1. Install dependencies
npm install

# 2. Start development server (React only)
npm run dev
# → Opens at http://localhost:8080
```

---

## 🧪 Testing with PCF Test Harness

### Build and Test Locally
```bash
# Build the PCF component
npm run build

# Start PCF test harness (simulates Power Apps)
pac pcf test start --watch

# Opens browser with test harness
```

**What you'll see:**
- Component rendered in test harness
- Input property controls on the right
- Console logs for debugging

---

## 📦 Deploying to Power Apps

### One-Time Setup
```bash
# Create authentication profile
pac auth create --environment <YOUR-ENV-ID>

# List your environments to find ENV-ID
pac org list
```

### Deploy
```bash
# Build production bundle
npm run build

# Push to Power Apps
pac pcf push --publisher-prefix brasco

# ✅ Component is now available in Power Apps!
```

---

## 🔄 Making Updates

### Development Cycle
```bash
# 1. Make code changes
# 2. Test in dev server
npm run dev

# 3. Build and test in PCF harness
npm run build
pac pcf test start

# 4. Deploy when ready
pac pcf push
```

---

## 🛠️ Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start React dev server |
| `npm run build` | Build PCF component |
| `pac pcf test start` | Launch test harness |
| `pac pcf push` | Deploy to Power Apps |
| `pac auth list` | Show auth profiles |
| `pac auth select --index <N>` | Switch environments |

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/index.ts` | PCF lifecycle (init, update, etc) |
| `src/App.tsx` | React application root |
| `ControlManifest.Input.xml` | Component metadata |
| `vite.config.ts` | Build configuration |

---

## ⚠️ Important Notes

### Development Mode vs PCF Mode

**Dev Mode (`npm run dev`):**
- Fast refresh, HMR
- PCF context is `undefined`
- Good for UI development

**PCF Test Harness:**
- Full PCF simulation
- Input/output testing
- Closer to production

### Build Output

After `npm run build`, check `out/` directory:
```
out/
├── bundle.js      # Your component code
├── style.css      # All styles
└── assets/        # Images, fonts, etc
```

---

## 🐛 Quick Troubleshooting

### "Build failed"
```bash
# Clear and rebuild
rm -rf out/ dist/ node_modules/
npm install
npm run build
```

### "Component doesn't load"
- Check browser console in test harness
- Verify `bundle.js` exists in `out/`
- Ensure manifest XML is valid

### "No data in Power Apps"
- Check `getOutputs()` method in `index.ts`
- Verify `notifyOutputChanged()` is called
- Test outputs in PCF test harness first

---

## 📚 Next Steps

1. ✅ Follow this guide to get running
2. 📖 Read `PCF_IMPLEMENTATION_GUIDE.md` for architecture
3. 🔍 Review `COMPLIANCE_AUDIT.md` for best practices
4. 🚀 Deploy to your Power Apps environment

---

## 💡 Pro Tips

- Use **test harness** extensively before deploying
- Keep **React dev server** running for fast UI iteration
- Commit before running `pac pcf push` (easy rollback)
- Use **VS Code tasks** (F1 → Run Task) for common commands

---

## 🆘 Need Help?

- [PAC CLI Documentation](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)
- [PCF Developer Guide](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/)
- Check `COMPLIANCE_AUDIT.md` for detailed troubleshooting
