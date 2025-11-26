# B-Convert 🍺 - Application Power Apps Code App

Application de conversion professionnelle pour les Brasseries du Congo (Brasco), construite en suivant **exactement** le pattern officiel **Microsoft PowerAppsCodeApps/HelloWorld**.

![Brasco Logo](./src/assets/brasco-logo.png)

## 🎯 Fonctionnalités

- ✅ **Conversion instantanée** entre bouteilles, casiers et hectolitres
- ✅ **Connexion Dataverse** pour charger les produits dynamiquement depuis `mbs_produits`
- ✅ **Historique local** des 10 dernières conversions
- ✅ **Interface responsive** optimisée mobile et desktop
- ✅ **Design moderne** avec animations fluides
- ✅ **Calculs précis** basés sur les données produits réelles

## 🏗️ Architecture (Pattern HelloWorld)

Cette application est construite en suivant le **pattern officiel Microsoft PowerAppsCodeApps/HelloWorld**.

### PowerProvider Minimal

```typescript
// src/lib/PowerProvider.tsx - Pattern HelloWorld officiel
export default function PowerProvider({ children }: PowerProviderProps) {
    useEffect(() => {
        const initApp = async () => {
            try {
                await initialize(); // @microsoft/power-apps/app
                console.log('Power Platform SDK initialized successfully');
            } catch (error) {
                console.error('Failed to initialize Power Platform SDK:', error);
            }
        };
        initApp();
    }, []);
    return <>{children}</>;
}
```

**Caractéristiques clés:**
- ✅ Pas de Context API (simplifié)
- ✅ Pas de state management complexe
- ✅ Initialisation non-bloquante
- ✅ Fallback gracieux pour dev local

### Structure du Projet

```
src/
├── main.tsx                    # Point d'entrée avec StrictMode + PowerProvider
├── App.tsx                     # App principale avec routing
├── lib/
│   └── PowerProvider.tsx       # Pattern HelloWorld minimal
├── hooks/
│   └── useProducts.ts          # Hook pour charger depuis Dataverse
├── components/
│   ├── ProductSelector.tsx     # Sélecteur de produits
│   ├── ConversionInput.tsx     # Champ de saisie + unité
│   ├── ConversionResults.tsx   # Résultats calculés
│   └── ConversionHistory.tsx   # Historique des conversions
├── generated/
│   ├── services/
│   │   └── Mbs_produitsService.ts  # Service Dataverse auto-généré
│   └── models/
│       └── Mbs_produitsModel.ts    # Modèles Dataverse
└── pages/
    └── Index.tsx               # Page principale
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js 18+** et npm
- **PAC CLI** ([Guide d'installation](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction))
- Accès à un **environnement Power Apps**

### Installation (< 5 minutes)

```bash
# 1. Installer les dépendances
npm install

# 2. Authentifier PAC CLI avec votre environnement
pac auth create --environment {VOTRE_ENVIRONMENT_ID}

# 3. Initialiser Power Apps (une seule fois)
pac code init
```

### Développement Local

```bash
# Démarrer Vite + PAC concurrent (recommandé)
npm run dev
# → http://localhost:3000

# OU séparément:
npm run dev:vite    # Vite seul (port 3000)
npm run dev:pac     # PAC harness seul
```

### Build & Déploiement

```bash
# 1. Builder pour production
npm run build

# 2. Déployer vers Power Apps
pac code push
```

✅ **Succès!** La commande retourne une URL Power Apps pour lancer l'app.

Accéder à l'app: [https://make.powerapps.com](https://make.powerapps.com) → Sélectionner environnement → Trouver "B-Convert"

## 🔌 Connexion Dataverse

L'application charge dynamiquement les produits depuis la table **`mbs_produits`** dans Dataverse.

### Configuration (power.config.json)

```json
{
  "appId": "7d5e4be5-0035-4b6a-a14d-86a01507a04b",
  "appDisplayName": "B-Convert",
  "environmentId": "c6930d45-680d-e021-87d3-04f80be95a52",
  "databaseReferences": {
    "default.cds": {
      "instanceUrl": "https://org58d281ba.crm4.dynamics.com/",
      "dataSources": {
        "produits": {
          "entitySetName": "mbs_produits",
          "logicalName": "mbs_produit"
        }
      }
    }
  }
}
```

### Champs Dataverse Utilisés

| Champ | Type | Utilisation |
|-------|------|-------------|
| `mbs_produitid` | GUID | ID unique du produit |
| `mbs_name` | String | Nom du produit affiché |
| `mbs_quantityperuom` | Number | Nombre de bouteilles par casier |
| `mbs_unitvolumehl` | Number | Hectolitres par casier |

### Hook useProducts

```typescript
// src/hooks/useProducts.ts
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await Mbs_produitsService.getAll({
        select: ['mbs_produitid', 'mbs_name', 'mbs_quantityperuom', 'mbs_unitvolumehl'],
        top: 50
      });
      // Map vers format Product
      setProducts(mapped);
      setLoading(false);
    }
    load();
  }, []);

  return { products, loading };
}
```

## 💡 Utilisation

1. **Sélectionner un produit** dans la liste déroulante (chargée depuis Dataverse)
2. **Saisir une quantité** et choisir l'unité (Bouteilles, Casiers, ou Hectolitres)
3. **Voir les résultats** calculés instantanément
4. **Historique sauvegardé** automatiquement (localStorage)
5. **Restaurer** une conversion en cliquant sur l'historique

### Exemple

```
Produit sélectionné: Primus 33cl
- 24 bouteilles par casier
- 0.08 hl par casier

Saisie: 100 bouteilles

Résultats:
→ Casiers: 4.17
→ Hectolitres: 0.33 hl
```

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** (build tool, port 3000)
- **Tailwind CSS** + shadcn/ui (design system sémantique)
- **@microsoft/power-apps SDK** (v0.3.21)
- **React Router** (navigation SPA)
- **TanStack Query** (data fetching)
- **Lucide React** (icons)

## 📋 Conformité Microsoft HelloWorld

| Critère | Status |
|---------|--------|
| Pattern PowerProvider | ✅ Minimal, pas de context |
| StrictMode | ✅ Activé dans main.tsx |
| Port 3000 | ✅ Conforme HelloWorld |
| base: "./" | ✅ Dans vite.config.ts |
| Dataverse | ✅ Fonctionnel |
| Pas de CSP | ✅ Aucune CSP |
| SDK @microsoft/power-apps | ✅ v0.3.21 |

## 📚 Documentation Complète

- 📖 [Démarrage Rapide (5 min)](./QUICKSTART.md)
- 📖 [Guide de Déploiement](./README_DEPLOYMENT.md)
- 📖 [Migration HelloWorld](./HELLOWORLD_MIGRATION.md)
- 📖 [Compliance Audit](./CODE_APPS_COMPLIANCE.md)

## 🎮 Scripts npm

```bash
npm run dev         # Dev: Vite + PAC concurrent (port 3000)
npm run dev:vite    # Dev: Vite seul
npm run dev:pac     # Dev: PAC harness seul
npm run build       # Build de production dans dist/
npm run lint        # Linter ESLint
npm run preview     # Preview du build local
```

## 🐛 Troubleshooting

### ❌ App timeout dans Power Apps

**Causes:**
1. Build non effectué avant déploiement
2. Problème dans PowerProvider.tsx

**Solution:**
```bash
npm run build
pac code push
```

### ❌ Dataverse ne charge pas les produits

**Vérifier:**
1. `power.config.json` a le bon `instanceUrl`
2. Table `mbs_produits` existe et est accessible
3. Permissions Dataverse correctes
4. Console browser pour erreurs réseau

### ❌ Build errors

```bash
# Clean install
rm -rf node_modules dist
npm install
npm run build
```

## 🌐 Support Navigateurs

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Power Apps Mobile

## 🔗 Ressources Officielles

- [Power Apps Code Apps Docs](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/)
- [HelloWorld Sample (GitHub)](https://github.com/microsoft/PowerAppsCodeApps/tree/main/samples/HelloWorld)
- [PAC CLI Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction)
- [Dataverse Web API Docs](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview)

## 👨‍💻 Développeur

**Bienvenu Sedin Massamba**  
Application développée pour **Brasco (Brasseries du Congo)**

## 📄 Licence

Propriétaire - Brasco © 2025

---

**Pattern:** Microsoft PowerAppsCodeApps/HelloWorld  
**Framework:** Power Apps Code Apps  
**Version SDK:** @microsoft/power-apps ^0.3.21  
**Build Tool:** Vite 6.x  
**React:** 18.3
