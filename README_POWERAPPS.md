# B-Convert - Application Power Apps

Application de conversion pour les brasseries - Bouteilles, Casiers et Hectolitres

## 📋 Vue d'Ensemble

B-Convert est une application web moderne construite avec React, TypeScript, et Tailwind CSS, spécialement configurée pour le déploiement sur Microsoft Power Apps via le Power Platform SDK.

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18.x ou supérieur
- **npm** ou **bun**
- **Power Platform CLI** (PAC CLI)
- **VS Code** (recommandé)

### Installation dans VS Code

1. **Cloner le projet**
   ```bash
   git clone <votre-repo-url>
   cd b-convert
   ```

2. **Ouvrir dans VS Code**
   ```bash
   code .
   ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```

4. **Installer PAC CLI globalement**
   ```bash
   npm install -g @microsoft/powerplatform-cli
   ```

## 💻 Développement Local

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera disponible sur: http://localhost:5173

### Build pour production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `./dist`

## 📦 Structure du Projet

```
b-convert/
├── src/
│   ├── assets/              # Images et ressources
│   │   └── brasco-logo.png  # Logo Brasco (transparent)
│   ├── components/          # Composants React
│   │   ├── ui/             # Composants UI Shadcn
│   │   ├── ConversionInput.tsx
│   │   ├── ConversionResults.tsx
│   │   ├── ConversionHistory.tsx
│   │   └── ProductSelector.tsx
│   ├── data/
│   │   └── products.ts     # Base de données produits
│   ├── lib/
│   │   ├── utils.ts
│   │   └── PowerProvider.tsx  # Intégration Power Apps
│   ├── pages/
│   │   ├── Index.tsx       # Page principale
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── product.ts      # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── robots.txt
├── power.config.json        # Configuration Power Apps
├── .pacignore              # Fichiers exclus du déploiement
├── POWERAPPS_DEPLOYMENT.md # Guide de déploiement détaillé
└── package.json

```

## 🔧 Configuration Power Apps

### power.config.json

Fichier de configuration principal pour Power Apps:

```json
{
  "appId": "f95ea74b-a9a2-4f0e-8e8a-c3f2abe4ed06",
  "appDisplayName": "B-Convert",
  "description": "Conversions instantanées entre bouteilles, casiers et hectolitres...",
  "environmentId": "votre-environment-id",
  "buildPath": "./dist",
  "buildEntryPoint": "index.html",
  "logoPath": "./src/assets/brasco-logo.png",
  "localAppUrl": "http://localhost:5173/"
}
```

**Important**: Remplacez `environmentId` par votre ID d'environnement Power Platform.

## 🚢 Déploiement vers Power Apps

### Étape 1: Authentification

```bash
# Se connecter à Power Platform
pac auth create --environment <votre-environment-id>

# Vérifier l'authentification
pac auth list
```

### Étape 2: Initialiser (première fois uniquement)

```bash
pac code init --displayName "B-Convert" --description "Conversions instantanées entre bouteilles, casiers et hectolitres avec précision pour les brasseries du Congo (Brasco)"
```

### Étape 3: Build et Déploiement

```bash
# Build de l'application
npm run build

# Déployer vers Power Apps
pac code push
```

### Vérification

1. Allez sur https://make.powerapps.com
2. Sélectionnez votre environnement
3. Cliquez sur **Applications** dans le menu
4. Trouvez **B-Convert** et cliquez pour ouvrir

## 🔄 Mise à Jour de l'Application

Pour mettre à jour l'application déployée:

```bash
# 1. Apporter vos modifications au code
# 2. Build
npm run build

# 3. Redéployer
pac code push
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build pour production
- `npm run build:dev` - Build en mode développement
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎨 Fonctionnalités

### Conversions Instantanées
- **Bouteilles** ↔️ **Casiers** ↔️ **Hectolitres**
- Calculs en temps réel
- Précision à 4 décimales

### Produits Prédéfinis
- Premium Lager 500ml
- Craft IPA 330ml
- Wheat Beer 500ml
- Pilsner 330ml
- Dark Ale 750ml
- Amber Lager 500ml

### Historique
- Sauvegarde automatique des 10 dernières conversions
- Restauration rapide d'une conversion précédente
- Horodatage relatif (français)

### Interface
- Design moderne et responsive
- Animations fluides
- Thème personnalisé Brasco
- Logo transparent
- Support dark/light mode

## 🔐 CI/CD avec GitHub Actions

Le projet inclut un workflow GitHub Actions (`.github/workflows/deploy-powerapps.yml`) pour le déploiement automatique.

### Configuration des Secrets GitHub

Dans votre repo GitHub, ajoutez ces secrets (Settings > Secrets and variables > Actions):

- `POWER_APPS_CLIENT_ID` - ID client de l'application Azure AD
- `POWER_APPS_CLIENT_SECRET` - Secret client
- `POWER_APPS_TENANT_ID` - ID du tenant Azure
- `POWER_APPS_ENVIRONMENT_ID` - ID de l'environnement Power Platform

## 📚 Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn UI** - Composants UI
- **Lucide React** - Icônes
- **React Router** - Navigation
- **Tanstack Query** - Gestion d'état
- **Sonner** - Notifications toast

## 🌐 Environnements

- **Développement**: http://localhost:5173
- **Power Apps**: https://make.powerapps.com

## 📖 Documentation Supplémentaire

- [Guide de Déploiement Power Apps](./POWERAPPS_DEPLOYMENT.md)
- [Documentation Microsoft Power Apps](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)
- [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/)

## 🐛 Dépannage

### Erreur d'authentification PAC CLI

```bash
pac auth clear
pac auth create --environment <votre-environment-id>
```

### Erreur de build

```bash
rm -rf node_modules dist
npm install
npm run build
```

### L'application ne se charge pas dans Power Apps

1. Vérifiez `power.config.json`
2. Assurez-vous que le build est complet (`dist/` contient tous les fichiers)
3. Vérifiez les logs de console dans Power Apps

## 👤 Auteur

**Bienvenu Sedin Massamba**

Développé avec ❤️ pour les Brasseries du Congo (Brasco)

## 📄 Licence

© 2024 Bienvenu Sedin Massamba. Tous droits réservés.

---

**Note**: Cette application est configurée pour Power Apps mais fonctionne également comme application web standard.
