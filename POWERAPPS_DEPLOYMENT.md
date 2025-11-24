# Guide de Déploiement Power Apps - B-Convert

Ce guide vous aidera à déployer l'application B-Convert vers Microsoft Power Apps en utilisant le Power Platform SDK et PAC CLI.

## Prérequis

1. **Node.js** (version 18 ou supérieure)
2. **PAC CLI** (Power Platform CLI)
   ```bash
   npm install -g @microsoft/powerplatform-cli
   ```

3. **Compte Microsoft Power Platform** avec accès à un environnement de développement

## Structure du Projet

Le projet B-Convert est configuré comme une application Power Apps Code avec:
- `power.config.json` - Configuration de l'application Power Apps
- `src/lib/PowerProvider.tsx` - Intégration avec le SDK Power Apps
- Build Vite standard qui génère les fichiers dans `./dist`

## Étapes de Déploiement

### 1. Installation des Dépendances

```bash
npm install
```

### 2. Authentification PAC CLI

Authentifiez-vous avec votre compte Power Platform:

```bash
pac auth create --environment {votre-environment-id}
```

Pour obtenir votre environment ID:
1. Allez sur https://make.powerapps.com
2. Sélectionnez votre environnement en haut à droite
3. L'ID se trouve dans l'URL: `environments/{environment-id}/`

### 3. Initialiser l'Application Power Apps

Si vous n'avez pas encore initialisé l'application:

```bash
pac code init --displayName "B-Convert" --description "Conversions instantanées entre bouteilles, casiers et hectolitres avec précision pour les brasseries du Congo (Brasco)"
```

### 4. Build de l'Application

Construisez l'application pour la production:

```bash
npm run build
```

Cela génère les fichiers optimisés dans le dossier `./dist`

### 5. Déploiement vers Power Apps

Déployez l'application construite vers Power Platform:

```bash
pac code push
```

Cette commande:
- Package l'application depuis le dossier `./dist`
- Télécharge vers votre environnement Power Platform
- Crée ou met à jour l'application dans Power Apps

### 6. Vérification du Déploiement

1. Allez sur https://make.powerapps.com
2. Sélectionnez votre environnement
3. Dans la navigation de gauche, cliquez sur **Applications**
4. Vous devriez voir **B-Convert** dans la liste
5. Cliquez sur l'application pour l'ouvrir

## Configuration de l'Application

### power.config.json

Le fichier de configuration principal contient:

```json
{
  "appId": "f95ea74b-a9a2-4f0e-8e8a-c3f2abe4ed06",
  "appDisplayName": "B-Convert",
  "description": "Conversions instantanées entre bouteilles, casiers et hectolitres...",
  "environmentId": "c6930d45-680d-e021-87d3-04f80be95a52",
  "buildPath": "./dist",
  "buildEntryPoint": "index.html",
  "logoPath": "./src/assets/brasco-logo.png",
  "localAppUrl": "http://localhost:3000/"
}
```

### Personnalisation

Pour personnaliser votre déploiement:
1. Mettez à jour `environmentId` avec votre ID d'environnement
2. L'`appId` sera généré automatiquement lors du premier déploiement

## Développement Local

Pour tester l'application localement avant le déploiement:

```bash
npm run dev
```

L'application sera disponible sur http://localhost:5173

## Mise à Jour de l'Application

Pour mettre à jour une application déjà déployée:

1. Apportez vos modifications au code
2. Construisez l'application: `npm run build`
3. Déployez les changements: `pac code push`

## Commandes Utiles

```bash
# Lister les environnements disponibles
pac env list

# Voir l'authentification actuelle
pac auth list

# Effacer l'authentification
pac auth clear

# Voir les détails de l'application
pac code list
```

## Dépannage

### Erreur d'Authentification

Si vous rencontrez des problèmes d'authentification:
```bash
pac auth clear
pac auth create --environment {votre-environment-id}
```

### Erreur de Build

Si le build échoue:
1. Supprimez `node_modules` et `dist`
2. Réinstallez: `npm install`
3. Reconstruisez: `npm run build`

### L'Application ne se Charge pas

1. Vérifiez les logs de console du navigateur
2. Assurez-vous que le `buildPath` dans `power.config.json` est correct
3. Vérifiez que tous les assets sont bien dans le dossier `dist`

## Support

Pour plus d'informations sur Power Apps Code Apps:
- [Documentation Microsoft Power Apps](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)
- [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/)

## Développé par

Bienvenu Sedin Massamba © 2024
