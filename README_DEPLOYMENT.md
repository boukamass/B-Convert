# B-Convert - Guide de Déploiement Power Apps Code Apps

## 🚀 Architecture

Cette application suit **exactement** le pattern officiel Microsoft PowerAppsCodeApps/HelloWorld.

## 📋 Prérequis

1. **Node.js et npm** installés
2. **PAC CLI** installé ([Installation guide](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction))
3. **Environnement Power Apps** avec accès

## 🔧 Installation Initiale

```bash
# 1. Installer les dépendances
npm install

# 2. Authentifier PAC CLI avec votre environnement
pac auth create --environment {VOTRE_ENVIRONMENT_ID}

# 3. Initialiser la configuration Power Apps (une seule fois)
pac code init
```

## 💻 Développement Local

```bash
# Démarrer le serveur de développement (port 3000)
npm run dev

# OU démarrer Vite et PAC séparément
npm run dev:vite    # Démarre Vite sur port 3000
npm run dev:pac     # Démarre PAC code run
```

L'application sera accessible sur:
- **Vite:** http://localhost:3000
- **PAC harness:** Selon la configuration PAC

## 🏗️ Build de Production

```bash
# Build l'application pour déploiement
npm run build
```

Cela génère les fichiers optimisés dans le dossier `dist/`

## 🚢 Déploiement vers Power Apps

```bash
# Déployer vers Power Apps
pac code push
```

Si succès, cette commande retourne une URL Power Apps pour exécuter l'app.

### Accéder à l'App Déployée

1. Naviguer vers [https://make.powerapps.com](https://make.powerapps.com)
2. Sélectionner votre environnement
3. Trouver "B-Convert" dans la liste des apps
4. Cliquer pour lancer, partager, ou voir les détails

## 🔍 Troubleshooting

### Écran "Fetching your app" infini ou timeout

**Causes possibles:**
1. Build non effectué avant déploiement
   ```bash
   npm run build
   pac code push
   ```

2. Problème dans PowerProvider.tsx
   - Vérifier la console pour erreurs d'initialisation SDK
   - S'assurer que `@microsoft/power-apps` est installé

3. Configuration Vite incorrecte
   - Vérifier que `base: "./"` est dans vite.config.ts
   - Vérifier que port est 3000

### Dataverse ne charge pas les données

**Vérifier:**
1. `power.config.json` contient la bonne config Dataverse
2. Tables Dataverse (`mbs_produits`) existent et sont accessibles
3. Console browser pour erreurs réseau
4. Permissions Dataverse correctes dans l'environnement

### Erreurs TypeScript au build

**Si erreurs strictes TypeScript:**
- Vérifier que `tsconfig.json` a les paramètres assouplis
- Vérifier que `tsconfig.app.json` a `strict: false`

## 📁 Structure de Déploiement

```
dist/                    # Dossier de build (généré par Vite)
├── index.html          # Point d'entrée
├── assets/             # JS/CSS bundlés
└── ...                 # Autres assets

power.config.json       # Config Power Apps + Dataverse
```

## 🔐 Secrets et Variables d'Environnement

Pour les APIs externes ou secrets:

```bash
# Ajouter des secrets à l'environnement
pac code secret set --name "MA_CLE_API" --value "..."
```

## 📊 Connexion Dataverse

L'application se connecte à Dataverse via:
- **Service:** `src/generated/services/Mbs_produitsService.ts`
- **Model:** `src/generated/models/Mbs_produitsModel.ts`
- **Hook:** `src/hooks/useProducts.ts`
- **Config:** `power.config.json`

### Régénérer les Types Dataverse (si tables changent)

```bash
# Utiliser PAC CLI pour régénérer
pac code generate-types
```

## 🧪 Tests Pré-Déploiement

Avant chaque déploiement, vérifier:

```bash
# 1. Linter
npm run lint

# 2. Build local
npm run build

# 3. Test local avec build
npm run preview

# 4. Vérifier que dist/ contient index.html et assets/
ls -la dist/
```

## 📞 Support

- [Documentation Code Apps](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)
- [Quickstart Guide](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/quickstart)
- [HelloWorld Sample](https://github.com/microsoft/PowerAppsCodeApps/tree/main/samples/HelloWorld)
- [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)

## 🎯 Scripts npm Disponibles

```bash
npm run dev         # Dev: Vite + PAC concurrent
npm run dev:vite    # Dev: Vite seul (port 3000)
npm run dev:pac     # Dev: PAC harness seul
npm run build       # Build de production
npm run lint        # Linter le code
npm run preview     # Preview du build local
```

## ⚠️ Notes Importantes

1. **Toujours builder avant déployer:** `npm run build` puis `pac code push`
2. **Port 3000:** HelloWorld utilise port 3000, pas 8080
3. **base: "./":** Critique dans vite.config.ts pour assets
4. **Pas de CSP:** Aucune Content Security Policy dans le projet
5. **StrictMode:** Activé dans main.tsx (pattern HelloWorld)

---

**Développé par:** Bienvenu Sedin Massamba  
**Framework:** Power Apps Code Apps  
**Pattern:** Microsoft PowerAppsCodeApps/HelloWorld
