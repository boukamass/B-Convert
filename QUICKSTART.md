# B-Convert - Démarrage Rapide (5 minutes) ⚡

## 📦 Installation Ultra-Rapide

```bash
# Clone (si depuis Git) ou télécharge le projet
cd B-Convert

# Installe les dépendances
npm install

# Configure PAC CLI (une seule fois)
pac auth create --environment {TON_ENVIRONMENT_ID}

# Initialise Power Apps (une seule fois)
pac code init
```

## 🚀 Lancer l'App

```bash
# Option 1: Vite + PAC ensemble (recommandé)
npm run dev

# Option 2: Vite seul (pour dev UI rapide)
npm run dev:vite
```

Ouvre http://localhost:3000

## 🏗️ Builder & Déployer

```bash
# Build
npm run build

# Déploie vers Power Apps
pac code push
```

Done! 🎉

## 🔍 Vérification Rapide

✅ PowerProvider minimal (pas de context)  
✅ Port 3000 (pas 8080)  
✅ `base: "./"` dans vite.config.ts  
✅ StrictMode activé  
✅ Dataverse connecté

## 📚 Docs Complètes

- [README principal](./README.md)
- [Guide déploiement](./README_DEPLOYMENT.md)
- [Migration HelloWorld](./HELLOWORLD_MIGRATION.md)

## 🐛 Problème?

### App timeout dans Power Apps
```bash
# Re-build et re-déploie
npm run build
pac code push
```

### Dataverse vide
- Vérifie `power.config.json`
- Vérifie permissions sur `mbs_produits`

### Port occupé
- Change port dans `vite.config.ts` ligne 11

---

**Pattern:** Microsoft HelloWorld  
**Temps setup:** < 5 minutes
