# B-Convert - Prompt de Reproduction Complet

> Ce document contient toutes les spécifications nécessaires pour reproduire exactement l'application B-Convert avec n'importe quel outil de développement IA.

---

## 🎯 Description de l'Application

**Nom**: B-Convert  
**Langue**: Français  
**Type**: Application web de conversion d'unités pour produits brassicoles  
**Auteur**: Bienvenu Sedin Massamba  
**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui

### Fonctionnalité Principale
Convertisseur instantané entre trois unités de mesure pour les produits de brasserie :
- **Bouteilles** (unités individuelles)
- **Casiers** (conteneurs de bouteilles)
- **Hectolitres** (volume en hl)

---

## 📐 Architecture des Fichiers

```
src/
├── assets/
│   └── brasco-logo.png          # Logo de l'application
├── components/
│   ├── ui/                       # Composants shadcn/ui
│   ├── ProductSelector.tsx       # Sélection de produit
│   ├── ConversionInput.tsx       # Entrée de conversion
│   ├── ConversionResults.tsx     # Affichage des résultats
│   └── ConversionHistory.tsx     # Historique des conversions
├── data/
│   └── products.ts               # Données des produits
├── hooks/
│   └── use-toast.ts              # Hook pour notifications
├── types/
│   └── product.ts                # Types TypeScript
├── pages/
│   └── Index.tsx                 # Page principale
├── index.css                     # Design system
└── main.tsx                      # Point d'entrée
```

---

## 🎨 Design System Complet

### Palette de Couleurs (HSL)

#### Mode Clair
```css
:root {
  /* Couleurs de base */
  --background: 0 0% 98%;           /* Fond principal */
  --foreground: 0 0% 10%;           /* Texte principal */
  
  /* Cartes et surfaces */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 10%;
  
  /* Couleur primaire (Vert Brasco) */
  --primary: 151 100% 33%;          /* #00A859 - Vert principal */
  --primary-foreground: 0 0% 100%;  /* Blanc */
  --primary-light: 151 80% 45%;     /* Vert clair */
  --primary-dark: 151 100% 25%;     /* Vert foncé */
  
  /* Couleurs secondaires */
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 10%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  
  /* Accent */
  --accent: 151 60% 38%;
  --accent-foreground: 0 0% 100%;
  
  /* Destructif (Rouge) */
  --destructive: 351 85% 48%;
  --destructive-foreground: 0 0% 100%;
  
  /* Bordures et inputs */
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --ring: 151 100% 33%;
  
  /* Rayon de bordure */
  --radius: 1rem;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(151 100% 33%), hsl(151 80% 45%));
  --gradient-hero: linear-gradient(135deg, hsl(151 100% 33%) 0%, hsl(151 80% 45%) 50%, hsl(151 100% 25%) 100%);
  --gradient-glass: linear-gradient(135deg, rgba(0, 168, 89, 0.1) 0%, rgba(0, 168, 89, 0.05) 100%);
  
  /* Ombres */
  --shadow-elegant: 0 20px 60px -15px hsl(151 100% 33% / 0.3);
  --shadow-glow: 0 0 80px hsl(151 100% 33% / 0.4);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.08);
}
```

#### Mode Sombre
```css
.dark {
  --background: 0 0% 8%;
  --foreground: 0 0% 95%;
  --card: 0 0% 12%;
  --card-foreground: 0 0% 95%;
  --popover: 0 0% 10%;
  --popover-foreground: 0 0% 95%;
  --primary: 151 80% 45%;
  --primary-foreground: 0 0% 10%;
  --primary-light: 151 70% 55%;
  --primary-dark: 151 100% 25%;
  --secondary: 0 0% 18%;
  --secondary-foreground: 0 0% 95%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 60%;
  --accent: 351 85% 58%;
  --accent-foreground: 0 0% 10%;
  --destructive: 351 85% 58%;
  --destructive-foreground: 0 0% 10%;
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --ring: 151 80% 45%;
  
  --gradient-primary: linear-gradient(135deg, hsl(151 80% 45%), hsl(151 70% 55%));
  --gradient-hero: linear-gradient(135deg, hsl(151 100% 25%) 0%, hsl(151 80% 45%) 50%, hsl(151 70% 55%) 100%);
  --gradient-glass: linear-gradient(135deg, rgba(0, 168, 89, 0.2) 0%, rgba(0, 168, 89, 0.1) 100%);
  --shadow-elegant: 0 20px 60px -15px hsl(151 80% 45% / 0.4);
  --shadow-glow: 0 0 80px hsl(151 80% 45% / 0.5);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### Typographie
```css
font-family: 'Inter', system-ui, sans-serif;
font-feature-settings: "cv11", "ss01";
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
```

### Classes Utilitaires CSS

#### Effet Glass (Glassmorphism)
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-effect-dark {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🎬 Animations

### Keyframes Définis

```css
/* Animation de flottement */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Animation de lueur */
@keyframes glow {
  from { box-shadow: 0 0 20px rgba(0, 168, 89, 0.4); }
  to { box-shadow: 0 0 40px rgba(0, 168, 89, 0.8); }
}
.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

/* Fade in */
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Scale in */
@keyframes scale-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

/* Slide up */
@keyframes slide-up {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

/* Pulse lent */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Utilisation des Animations
- **Éléments de fond**: `animate-float` avec `animation-delay` varié (0s, 2s)
- **Contenu principal**: `animate-fade-in` au chargement
- **Logo**: `animate-scale-in`
- **Cartes de résultats**: `animate-slide-up` avec délai progressif (`animationDelay: ${index * 100}ms`)
- **Indicateurs actifs**: `animate-pulse` ou `animate-pulse-slow`

---

## 📊 Modèle de Données

### Type Product
```typescript
export interface Product {
  id: string;
  name: string;
  bottlesPerCrate: number;      // Nombre de bouteilles par casier
  hectolitersPerCrate: number;  // Volume en hectolitres par casier
}
```

### Type HistoryItem
```typescript
export interface HistoryItem {
  id: string;
  productName: string;
  value: number;
  unit: string;
  timestamp: number;  // Timestamp Unix en millisecondes
}
```

### Type UnitType
```typescript
export type UnitType = "bottles" | "crates" | "hectoliters";
```

### Données Produits (Exemples)
```typescript
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Lager 500ml",
    bottlesPerCrate: 20,
    hectolitersPerCrate: 0.1,
  },
  {
    id: "2",
    name: "Craft IPA 330ml",
    bottlesPerCrate: 24,
    hectolitersPerCrate: 0.0792,
  },
  {
    id: "3",
    name: "Wheat Beer 500ml",
    bottlesPerCrate: 20,
    hectolitersPerCrate: 0.1,
  },
  {
    id: "4",
    name: "Pilsner 330ml",
    bottlesPerCrate: 24,
    hectolitersPerCrate: 0.0792,
  },
  {
    id: "5",
    name: "Dark Ale 750ml",
    bottlesPerCrate: 12,
    hectolitersPerCrate: 0.09,
  },
  {
    id: "6",
    name: "Amber Lager 500ml",
    bottlesPerCrate: 20,
    hectolitersPerCrate: 0.1,
  },
];
```

---

## 🔢 Logique de Conversion (Formules Mathématiques)

### Variables
- `bottlesPerCrate` = nombre de bouteilles par casier (ex: 20, 24, 12)
- `hectolitersPerCrate` = volume en hl par casier (ex: 0.1, 0.0792, 0.09)

### Conversion depuis Bouteilles
```javascript
bouteilles = valeur_entrée
casiers = bouteilles / bottlesPerCrate
hectolitres = casiers * hectolitersPerCrate
```

### Conversion depuis Casiers
```javascript
casiers = valeur_entrée
bouteilles = casiers * bottlesPerCrate
hectolitres = casiers * hectolitersPerCrate
```

### Conversion depuis Hectolitres
```javascript
hectolitres = valeur_entrée
casiers = hectolitres / hectolitersPerCrate
bouteilles = casiers * bottlesPerCrate
```

### Implémentation JavaScript
```javascript
const calculateConversion = (product, inputValue, inputUnit) => {
  if (!product || !inputValue) {
    return { bottles: 0, crates: 0, hectoliters: 0 };
  }

  const value = parseFloat(inputValue);
  if (isNaN(value)) {
    return { bottles: 0, crates: 0, hectoliters: 0 };
  }

  let bottles = 0, crates = 0, hectoliters = 0;

  switch (inputUnit) {
    case "bottles":
      bottles = value;
      crates = value / product.bottlesPerCrate;
      hectoliters = crates * product.hectolitersPerCrate;
      break;
    case "crates":
      crates = value;
      bottles = value * product.bottlesPerCrate;
      hectoliters = value * product.hectolitersPerCrate;
      break;
    case "hectoliters":
      hectoliters = value;
      crates = value / product.hectolitersPerCrate;
      bottles = crates * product.bottlesPerCrate;
      break;
  }

  return { bottles, crates, hectoliters };
};
```

### Précision d'Affichage
- **Bouteilles**: 2 décimales (`toFixed(2)`)
- **Casiers**: 2 décimales (`toFixed(2)`)
- **Hectolitres**: 4 décimales (`toFixed(4)`)

---

## 🖼️ Icônes Lucide React

### Icônes Utilisées
| Icône | Composant | Utilisation |
|-------|-----------|-------------|
| `Beer` | ProductSelector | Label de sélection produit |
| `ArrowRight` | ConversionInput | Label "Convertir depuis" |
| `ArrowRightLeft` | ConversionInput | Bouton swap d'unité |
| `Package` | ConversionResults | Icône bouteilles |
| `Container` | ConversionResults | Icône casiers |
| `Droplets` | ConversionResults | Icône hectolitres |
| `TrendingUp` | ConversionResults | Label résultats |
| `Clock` | ConversionHistory | Titre historique |
| `Trash2` | ConversionHistory | Bouton effacer |
| `Calculator` | Index | (Importé mais non utilisé) |
| `Sparkles` | Index | État vide (aucun produit) |
| `Info` | Index | Spécifications produit |

---

## 🧩 Composants Détaillés

### 1. ProductSelector
**Fichier**: `src/components/ProductSelector.tsx`

**Props**:
```typescript
interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductChange: (product: Product) => void;
}
```

**Structure UI**:
- Label avec icône `Beer` dans un conteneur dégradé
- Texte: "Sélectionnez votre produit" (uppercase, tracking-wider)
- Select shadcn/ui avec:
  - Trigger hauteur 56px (h-14), coins arrondis 2xl
  - Placeholder: "Choisissez un produit..."
  - Items avec indicateur pulsant vert

**Styles Clés**:
```jsx
// Trigger
className="w-full h-14 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md group-hover:scale-[1.01] text-base font-medium"

// Item
className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200 text-base"
```

### 2. ConversionInput
**Fichier**: `src/components/ConversionInput.tsx`

**Props**:
```typescript
interface ConversionInputProps {
  value: string;
  unit: UnitType;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: UnitType) => void;
  disabled?: boolean;
}
```

**Structure UI**:
- Label avec icône `ArrowRight`: "Convertir depuis"
- Flex container avec:
  - Input numérique (flex-1, h-14, placeholder "0.00")
  - Select d'unité (w-[180px], h-14)
  - Bouton swap (h-14, w-14, icône `ArrowRightLeft`)

**Fonctionnalité Swap**:
```javascript
const handleSwapUnit = () => {
  const units: UnitType[] = ["bottles", "crates", "hectoliters"];
  const currentIndex = units.indexOf(unit);
  const nextIndex = (currentIndex + 1) % units.length;
  onUnitChange(units[nextIndex]);
};
```

**Options Select**:
- "Bouteilles" (value: "bottles")
- "Casiers" (value: "crates")
- "Hectolitres (hl)" (value: "hectoliters")

### 3. ConversionResults
**Fichier**: `src/components/ConversionResults.tsx`

**Props**:
```typescript
interface ConversionResultsProps {
  bottles: number;
  crates: number;
  hectoliters: number;
  excludeUnit?: "bottles" | "crates" | "hectoliters";
}
```

**Structure UI**:
- Label avec icône `TrendingUp`: "Résultats de conversion"
- Grille de cartes (exclut l'unité source)
- Chaque carte contient:
  - Icône dans conteneur coloré
  - Label + unité
  - Valeur en gros (text-3xl, font-bold, tabular-nums)

**Configuration des Cartes**:
```javascript
const results = [
  {
    icon: Package,
    label: "Bouteilles",
    value: bottles.toFixed(2),
    unit: "bouteilles",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Container,
    label: "Casiers",
    value: crates.toFixed(2),
    unit: "casiers",
    color: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Droplets,
    label: "Hectolitres",
    value: hectoliters.toFixed(4),
    unit: "hl",
    color: "from-primary-light/20 to-primary-light/5",
    borderColor: "border-primary-light/30",
    iconBg: "bg-primary-light/10",
    iconColor: "text-primary-light",
  },
];
```

**Effets Visuels**:
- Cercle décoratif en haut à droite (scale au hover)
- Ligne dégradée en bas (apparaît au hover)
- Animation `slide-up` avec délai progressif

### 4. ConversionHistory
**Fichier**: `src/components/ConversionHistory.tsx`

**Props**:
```typescript
interface ConversionHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onItemClick: (item: HistoryItem) => void;
}
```

**Fonctionnalité formatTimestamp**:
```javascript
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return "À l'instant";
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
  if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
  return date.toLocaleDateString('fr-FR');
};
```

**Structure UI**:
- Carte avec effet glass
- Header: icône `Clock` + "Conversions récentes" + bouton "Effacer"
- Liste scrollable (max-h-64)
- Chaque item: nom produit, valeur+unité, timestamp relatif

---

## 📄 Page Principale (Index.tsx)

### Structure Complète

```jsx
<div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
  
  {/* Éléments de fond animés */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/5 rounded-full blur-3xl animate-pulse-slow"></div>
  </div>

  <div className="relative max-w-4xl mx-auto py-12 px-4 space-y-8 animate-fade-in">
    
    {/* Header */}
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-6">
        <img src={brascoLogo} alt="Brasco Logo" className="h-24 w-auto object-contain animate-scale-in" />
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-scale-in">
            B-Convert
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conversions instantanées entre bouteilles, casiers et hectolitres avec précision
          </p>
        </div>
      </div>
    </div>

    {/* Carte principale */}
    <Card className="p-8 glass-effect border-2 border-border/50 shadow-2xl space-y-8 rounded-3xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500">
      
      <ProductSelector ... />

      {/* Spécifications produit (si sélectionné) */}
      {selectedProduct && (
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl border-2 border-primary/20 animate-scale-in shadow-lg">
          {/* Contenu spécifications */}
        </div>
      )}

      <ConversionInput ... />

      {/* Résultats (si conversion valide) */}
      {selectedProduct && inputValue && parseFloat(inputValue) > 0 && (
        <ConversionResults ... />
      )}

      {/* État vide */}
      {!selectedProduct && (
        <div className="text-center py-12 space-y-3">
          <Sparkles className="w-8 h-8 text-muted-foreground" />
          <p>Sélectionnez un produit pour commencer la conversion</p>
        </div>
      )}
    </Card>

    <ConversionHistory ... />

    {/* Footer */}
    <div className="text-center space-y-3">
      <p className="text-sm text-muted-foreground/80">
        Calculs de précision en temps réel pour la gestion des inventaires brassicoles
      </p>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span>Propulsé par des algorithmes de conversion avancés</span>
      </div>
      <p className="text-xs text-muted-foreground/50 pt-2">
        Développé par Bienvenu Sedin Massamba © {new Date().getFullYear()}
      </p>
    </div>
  </div>
</div>
```

---

## 💾 Persistance (LocalStorage)

### Clé de Stockage
```javascript
const STORAGE_KEY = "conversionHistory";
```

### Chargement au Démarrage
```javascript
useEffect(() => {
  const savedHistory = localStorage.getItem("conversionHistory");
  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }
}, []);
```

### Sauvegarde Automatique
```javascript
const saveToHistory = (productName, value, unit) => {
  const newItem = {
    id: Date.now().toString(),
    productName,
    value,
    unit,
    timestamp: Date.now(),
  };
  const updatedHistory = [newItem, ...history].slice(0, 10); // Max 10 items
  setHistory(updatedHistory);
  localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
};
```

### Effacement
```javascript
const clearHistory = () => {
  setHistory([]);
  localStorage.removeItem("conversionHistory");
  toast({
    title: "Historique effacé",
    description: "L'historique des conversions a été effacé.",
  });
};
```

---

## 🔔 Notifications Toast

### Messages en Français
```javascript
// Effacement historique
toast({
  title: "Historique effacé",
  description: "L'historique des conversions a été effacé.",
});

// Restauration depuis historique
toast({
  title: "Conversion restaurée",
  description: `Restauré: ${item.value} ${item.unit} de ${item.productName}`,
});
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Desktop**: md: (≥ 768px)

### Adaptations
- Titre: `text-5xl md:text-6xl`
- Container: `max-w-4xl mx-auto py-12 px-4`
- Grilles et flexbox s'adaptent automatiquement

---

## ⚙️ Configuration Tailwind

```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        // ... autres couleurs du design system
      },
      borderRadius: {
        lg: "var(--radius)",       // 1rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## 📦 Dépendances Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "typescript": "latest",
  "vite": "latest",
  "tailwindcss": "latest",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.462.0",
  "@radix-ui/react-select": "^2.2.5",
  "@radix-ui/react-toast": "^1.2.14",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

---

## 🌐 SEO & Métadonnées

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>B-Convert - Convertisseur d'unités brassicoles</title>
  <meta name="description" content="Convertissez instantanément entre bouteilles, casiers et hectolitres pour vos produits de brasserie." />
</head>
```

---

## ✅ Checklist de Reproduction

- [ ] Créer la structure de fichiers
- [ ] Configurer Tailwind avec le design system complet
- [ ] Implémenter les types TypeScript
- [ ] Créer les données produits
- [ ] Développer les composants shadcn/ui de base
- [ ] Créer ProductSelector avec Select
- [ ] Créer ConversionInput avec Input, Select et Button
- [ ] Créer ConversionResults avec cartes animées
- [ ] Créer ConversionHistory avec gestion du temps relatif
- [ ] Assembler la page Index avec tous les composants
- [ ] Implémenter la logique de conversion avec useMemo
- [ ] Ajouter la persistance localStorage
- [ ] Configurer les notifications toast
- [ ] Ajouter les animations CSS
- [ ] Intégrer le logo
- [ ] Traduire tous les textes en français
- [ ] Ajouter le copyright de l'auteur

---

**Document généré pour la reproduction exacte de B-Convert**  
**© 2025 Bienvenu Sedin Massamba**
