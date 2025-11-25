# B-Convert - Application de Conversion pour Brasseries (Power Apps Code App)

Application Power Apps Code App pour conversions instantanées entre bouteilles, casiers et hectolitres.

![Brasco Logo](./src/assets/brasco-logo.png)

## 🎯 Vue d'Ensemble

B-Convert est une application web moderne développée pour les Brasseries du Congo (Brasco), permettant des conversions précises et instantanées entre différentes unités de mesure utilisées dans l'industrie brassicole. L'application est construite comme une **Power Apps Code App** utilisant React, TypeScript et le SDK officiel `@microsoft/power-apps`.

## 🚀 Démarrage Rapide

### Installation Standard

```bash
# Cloner le projet
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
# → http://localhost:8080
```

### Déploiement vers Power Apps

```bash
# Installation PAC CLI
npm install -g @microsoft/powerplatform-cli

# Authentification
pac auth create --environment <votre-environment-id>

# Build et déploiement
npm run build
pac code push
```

📖 **Guides Complets**:
- [Quick Start Guide (EN)](./CODE_APPS_QUICKSTART.md) - Guide de démarrage rapide
- [Compliance Review (EN)](./CODE_APPS_COMPLIANCE.md) - Revue de conformité et architecture
- [Déploiement Power Apps (FR)](./POWERAPPS_DEPLOYMENT.md) - Guide détaillé de déploiement

## 📋 Fonctionnalités

### ✨ Conversions Multiples
- **Bouteilles** ↔️ **Casiers** ↔️ **Hectolitres**
- Calculs en temps réel avec précision
- Support de 6 types de produits prédéfinis

### 📊 Produits Disponibles
1. Premium Lager 500ml (20 bouteilles/casier)
2. Craft IPA 330ml (24 bouteilles/casier)
3. Wheat Beer 500ml (20 bouteilles/casier)
4. Pilsner 330ml (24 bouteilles/casier)
5. Dark Ale 750ml (12 bouteilles/casier)
6. Amber Lager 500ml (20 bouteilles/casier)

### 💾 Historique Intelligent
- Sauvegarde automatique des 10 dernières conversions
- Restauration en un clic
- Horodatage en français
- Stockage local persistant

### 🎨 Interface Moderne
- Design responsive (mobile, tablette, desktop)
- Animations fluides et professionnelles
- Logo Brasco avec fond transparent
- Thème personnalisé aux couleurs de la marque
- Interface 100% en français

## 🛠️ Technologies

- **React 18.3** - Framework UI moderne
- **TypeScript** - Typage statique
- **Vite** - Build ultra-rapide
- **Tailwind CSS** - Styling utility-first
- **Shadcn UI** - Composants UI réutilisables
- **React Router** - Navigation SPA
- **Power Apps SDK** - Intégration Power Platform

## 📁 Structure du Projet

```
b-convert/
├── src/
│   ├── assets/                  # Ressources (logo, images)
│   ├── components/              # Composants React
│   │   ├── ui/                 # Composants Shadcn UI
│   │   ├── ConversionInput.tsx
│   │   ├── ConversionResults.tsx
│   │   ├── ConversionHistory.tsx
│   │   └── ProductSelector.tsx
│   ├── data/
│   │   └── products.ts         # Base de données produits
│   ├── lib/
│   │   ├── utils.ts
│   │   └── PowerProvider.tsx   # Intégration Power Apps
│   ├── pages/
│   │   ├── Index.tsx           # Page principale
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── product.ts
│   └── App.tsx
├── power.config.json            # Configuration Power Apps
├── POWERAPPS_DEPLOYMENT.md      # Guide déploiement Power Apps
├── README_POWERAPPS.md          # Documentation Power Apps
└── .github/workflows/           # CI/CD GitHub Actions
```

## 🎮 Scripts Disponibles

```bash
npm run dev          # Serveur de développement (port 5173)
npm run build        # Build production
npm run build:dev    # Build développement
npm run preview      # Prévisualise le build
npm run lint         # Vérifie le code
```

## 🚢 Déploiement

### Déploiement Web Standard

L'application peut être déployée sur n'importe quelle plateforme web:
- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps
- **Lovable** - Simply open [Lovable](https://lovable.dev/projects/cccdac2f-2100-474f-8b91-4c064fdcf3f7) and click on Share -> Publish

### Déploiement Power Apps

Consultez [README_POWERAPPS.md](./README_POWERAPPS.md) et [POWERAPPS_DEPLOYMENT.md](./POWERAPPS_DEPLOYMENT.md) pour:
- Configuration PAC CLI
- Authentification Power Platform
- Processus de build et push
- CI/CD avec GitHub Actions
- Gestion des environnements

## 🔧 Configuration

### power.config.json

```json
{
  "appId": "f95ea74b-a9a2-4f0e-8e8a-c3f2abe4ed06",
  "appDisplayName": "B-Convert",
  "environmentId": "<votre-environment-id>",
  "buildPath": "./dist",
  "logoPath": "./src/assets/brasco-logo.png"
}
```

## 📝 Utilisation

1. **Sélectionner un produit** dans la liste déroulante
2. **Entrer une valeur** et choisir l'unité (bouteilles, casiers, ou hectolitres)
3. **Voir les résultats** instantanément dans les autres unités
4. **Consulter l'historique** des conversions récentes
5. **Restaurer** une conversion précédente en un clic

## 🌐 Support Navigateurs

- Chrome (recommandé)
- Firefox
- Safari
- Edge
- Power Apps Mobile

## 📚 Documentation

- [Guide Déploiement Power Apps](./POWERAPPS_DEPLOYMENT.md)
- [Documentation Complète Power Apps](./README_POWERAPPS.md)
- [Microsoft Power Apps Docs](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)

## 👨‍💻 Développement

### Éditer avec Lovable

Visitez le [Lovable Project](https://lovable.dev/projects/cccdac2f-2100-474f-8b91-4c064fdcf3f7) et commencez à modifier par prompts AI.

### Éditer avec VS Code

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
code .
npm run dev
```

### Éditer avec GitHub Codespaces

- Cliquez sur "Code" > "Codespaces" > "New codespace"
- Éditez directement dans le navigateur
- Commit et push vos changements

## 🐛 Dépannage

### Problèmes de Build
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Problèmes Power Apps
```bash
pac auth clear
pac auth create --environment <id>
```

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou une pull request.

## 👤 Auteur

**Bienvenu Sedin Massamba**

Application développée pour les Brasseries du Congo (Brasco)

## 📄 Licence

© 2024 Bienvenu Sedin Massamba. Tous droits réservés.

---

**Projet Lovable**: https://lovable.dev/projects/cccdac2f-2100-474f-8b91-4c064fdcf3f7

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
