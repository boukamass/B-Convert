# B-CONVERT - PROMPT DE REPRODUCTION EXHAUSTIF ET COMPLET

---

## INSTRUCTIONS POUR L'IA REPRODUCTRICE

Vous êtes un agent IA qui doit reproduire EXACTEMENT l'application B-Convert. Lisez ce document entièrement avant de commencer. Suivez chaque instruction à la lettre. Ne faites aucune supposition - utilisez uniquement les informations fournies ici.

**Stack technologique obligatoire:**
- React 18.3.1+ avec TypeScript
- Vite comme bundler
- Tailwind CSS avec tailwindcss-animate
- shadcn/ui pour les composants UI
- Lucide React pour les icônes

---

## SECTION 1: DESCRIPTION DE L'APPLICATION

**Nom:** B-Convert  
**Langue:** Français (tous les textes de l'interface)  
**Type:** Application web monopage (SPA) de conversion d'unités pour produits de brasserie  
**Auteur:** Bienvenu Sedin Massamba  
**Copyright:** © 2025 Bienvenu Sedin Massamba

### Fonctionnalité principale
Convertisseur bidirectionnel entre trois unités de mesure:
1. **Bouteilles** - Unités individuelles
2. **Casiers** - Conteneurs regroupant plusieurs bouteilles
3. **Hectolitres (hl)** - Mesure de volume (1 hl = 100 litres)

---

## SECTION 2: ARCHITECTURE DES FICHIERS

Créez exactement cette structure:

```
src/
├── assets/
│   └── brasco-logo.png              # Logo (image fournie séparément)
├── components/
│   ├── ui/                          # Composants shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── ... autres composants shadcn
│   ├── ProductSelector.tsx
│   ├── ConversionInput.tsx
│   ├── ConversionResults.tsx
│   └── ConversionHistory.tsx
├── data/
│   └── products.ts
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── pages/
│   └── Index.tsx
├── types/
│   └── product.ts
├── index.css
├── App.tsx
├── main.tsx
└── vite-env.d.ts
index.html
tailwind.config.ts
```

---

## SECTION 3: TYPES TYPESCRIPT

### Fichier: src/types/product.ts
```typescript
export interface Product {
  id: string;
  name: string;
  bottlesPerCrate: number;      // Nombre de bouteilles contenues dans un casier
  hectolitersPerCrate: number;  // Volume total du casier en hectolitres
}
```

### Type UnitType (dans ConversionInput.tsx)
```typescript
export type UnitType = "bottles" | "crates" | "hectoliters";
```

### Interface HistoryItem (dans ConversionHistory.tsx)
```typescript
export interface HistoryItem {
  id: string;           // Identifiant unique (timestamp converti en string)
  productName: string;  // Nom du produit
  value: number;        // Valeur numérique entrée
  unit: string;         // Unité utilisée ("bottles", "crates", "hectoliters")
  timestamp: number;    // Timestamp Unix en millisecondes
}
```

---

## SECTION 4: DONNÉES DES PRODUITS

### Fichier: src/data/products.ts
```typescript
import { Product } from "@/types/product";

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

### Explication des valeurs hectolitersPerCrate

La valeur `hectolitersPerCrate` représente le volume TOTAL de liquide dans un casier complet.

**Calcul pour chaque produit:**

| Produit | Bouteilles/Casier | Volume/Bouteille | hectolitersPerCrate |
|---------|-------------------|------------------|---------------------|
| Premium Lager 500ml | 20 | 500ml = 0.005hl | 20 × 0.005 = 0.1 hl |
| Craft IPA 330ml | 24 | 330ml = 0.0033hl | 24 × 0.0033 = 0.0792 hl |
| Wheat Beer 500ml | 20 | 500ml = 0.005hl | 20 × 0.005 = 0.1 hl |
| Pilsner 330ml | 24 | 330ml = 0.0033hl | 24 × 0.0033 = 0.0792 hl |
| Dark Ale 750ml | 12 | 750ml = 0.0075hl | 12 × 0.0075 = 0.09 hl |
| Amber Lager 500ml | 20 | 500ml = 0.005hl | 20 × 0.005 = 0.1 hl |

**Rappel:** 1 hectolitre = 100 litres = 100,000 ml

---

## SECTION 5: LOGIQUE DE CONVERSION - FORMULES MATHÉMATIQUES EXACTES

### Variables du produit sélectionné
- `B` = `bottlesPerCrate` (nombre de bouteilles par casier)
- `H` = `hectolitersPerCrate` (volume en hl par casier)

### CAS 1: Conversion DEPUIS les Bouteilles
**Entrée:** `bouteilles` (nombre de bouteilles)

```
casiers = bouteilles ÷ B
hectolitres = casiers × H
```

**Équivalent développé:**
```
casiers = bouteilles ÷ bottlesPerCrate
hectolitres = (bouteilles ÷ bottlesPerCrate) × hectolitersPerCrate
```

### CAS 2: Conversion DEPUIS les Casiers
**Entrée:** `casiers` (nombre de casiers)

```
bouteilles = casiers × B
hectolitres = casiers × H
```

**Équivalent développé:**
```
bouteilles = casiers × bottlesPerCrate
hectolitres = casiers × hectolitersPerCrate
```

### CAS 3: Conversion DEPUIS les Hectolitres
**Entrée:** `hectolitres` (volume en hl)

```
casiers = hectolitres ÷ H
bouteilles = casiers × B
```

**Équivalent développé:**
```
casiers = hectolitres ÷ hectolitersPerCrate
bouteilles = (hectolitres ÷ hectolitersPerCrate) × bottlesPerCrate
```

### IMPLÉMENTATION JAVASCRIPT EXACTE

```javascript
const calculateConversion = (product, inputValue, inputUnit) => {
  // Validation des entrées
  if (!product || !inputValue) {
    return { bottles: 0, crates: 0, hectoliters: 0 };
  }

  const value = parseFloat(inputValue);
  if (isNaN(value)) {
    return { bottles: 0, crates: 0, hectoliters: 0 };
  }

  let bottles = 0;
  let crates = 0;
  let hectoliters = 0;

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

### EXEMPLES DE VÉRIFICATION

**Test 1: Premium Lager 500ml (B=20, H=0.1)**
- Entrée: 100 bouteilles
- Résultats attendus:
  - Bouteilles: 100.00
  - Casiers: 100 ÷ 20 = 5.00
  - Hectolitres: 5 × 0.1 = 0.5000

**Test 2: Craft IPA 330ml (B=24, H=0.0792)**
- Entrée: 10 casiers
- Résultats attendus:
  - Casiers: 10.00
  - Bouteilles: 10 × 24 = 240.00
  - Hectolitres: 10 × 0.0792 = 0.7920

**Test 3: Dark Ale 750ml (B=12, H=0.09)**
- Entrée: 1 hectolitre
- Résultats attendus:
  - Hectolitres: 1.0000
  - Casiers: 1 ÷ 0.09 = 11.11 (arrondi)
  - Bouteilles: 11.11 × 12 = 133.33 (arrondi)

### PRÉCISION D'AFFICHAGE

| Unité | Décimales | Méthode |
|-------|-----------|---------|
| Bouteilles | 2 | `value.toFixed(2)` |
| Casiers | 2 | `value.toFixed(2)` |
| Hectolitres | 4 | `value.toFixed(4)` |

---

## SECTION 6: DESIGN SYSTEM COMPLET

### Fichier: src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Couleurs de base */
    --background: 0 0% 98%;
    --foreground: 0 0% 10%;

    /* Cartes et surfaces */
    --card: 0 0% 100%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;

    /* Couleur primaire - Vert Brasco */
    --primary: 151 100% 33%;
    --primary-foreground: 0 0% 100%;
    --primary-light: 151 80% 45%;
    --primary-dark: 151 100% 25%;

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

    /* Rayon de bordure global */
    --radius: 1rem;

    /* Gradients personnalisés */
    --gradient-primary: linear-gradient(135deg, hsl(151 100% 33%), hsl(151 80% 45%));
    --gradient-hero: linear-gradient(135deg, hsl(151 100% 33%) 0%, hsl(151 80% 45%) 50%, hsl(151 100% 25%) 100%);
    --gradient-glass: linear-gradient(135deg, rgba(0, 168, 89, 0.1) 0%, rgba(0, 168, 89, 0.05) 100%);

    /* Ombres */
    --shadow-elegant: 0 20px 60px -15px hsl(151 100% 33% / 0.3);
    --shadow-glow: 0 0 80px hsl(151 100% 33% / 0.4);
    --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.08);

    /* Sidebar (optionnel) */
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

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

    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "cv11", "ss01";
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  /* Effet Glassmorphism */
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

  /* Animation de flottement */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  /* Animation de lueur */
  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 20px rgba(0, 168, 89, 0.4);
    }
    to {
      box-shadow: 0 0 40px rgba(0, 168, 89, 0.8);
    }
  }
}
```

### Fichier: tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## SECTION 7: ICÔNES LUCIDE REACT

### Liste exhaustive des icônes utilisées

| Import | Composant | Emplacement | Couleur/Style |
|--------|-----------|-------------|---------------|
| `Beer` | ProductSelector | Label | Blanc sur dégradé primary |
| `ArrowRight` | ConversionInput | Label | Blanc sur dégradé accent |
| `ArrowRightLeft` | ConversionInput | Bouton swap | Blanc |
| `Package` | ConversionResults | Carte bouteilles | text-primary |
| `Container` | ConversionResults | Carte casiers | text-accent |
| `Droplets` | ConversionResults | Carte hectolitres | text-primary-light |
| `TrendingUp` | ConversionResults | Label résultats | Blanc sur dégradé |
| `Clock` | ConversionHistory | Titre | text-primary |
| `Trash2` | ConversionHistory | Bouton effacer | inherit |
| `Calculator` | Index | (importé non utilisé) | - |
| `Sparkles` | Index | État vide | text-muted-foreground |
| `Info` | Index | Spécifications | text-primary |

---

## SECTION 8: COMPOSANTS COMPLETS

### 8.1 ProductSelector.tsx

```tsx
import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Beer } from "lucide-react";

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductChange: (product: Product) => void;
}

export const ProductSelector = ({
  products,
  selectedProduct,
  onProductChange,
}: ProductSelectorProps) => {
  return (
    <div className="space-y-3 group">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light">
          <Beer className="w-4 h-4 text-white" />
        </div>
        Sélectionnez votre produit
      </label>
      <Select
        value={selectedProduct?.id}
        onValueChange={(value) => {
          const product = products.find((p) => p.id === value);
          if (product) onProductChange(product);
        }}
      >
        <SelectTrigger className="w-full h-14 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md group-hover:scale-[1.01] text-base font-medium">
          <SelectValue placeholder="Choisissez un produit..." />
        </SelectTrigger>
        <SelectContent className="bg-popover border-2 border-border rounded-2xl shadow-xl backdrop-blur-xl">
          {products.map((product) => (
            <SelectItem
              key={product.id}
              value={product.id}
              className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200 text-base"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"></div>
                <span className="font-medium">{product.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
```

### 8.2 ConversionInput.tsx

```tsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightLeft } from "lucide-react";

export type UnitType = "bottles" | "crates" | "hectoliters";

interface ConversionInputProps {
  value: string;
  unit: UnitType;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: UnitType) => void;
  disabled?: boolean;
}

export const ConversionInput = ({
  value,
  unit,
  onValueChange,
  onUnitChange,
  disabled,
}: ConversionInputProps) => {
  const handleSwapUnit = () => {
    const units: UnitType[] = ["bottles", "crates", "hectoliters"];
    const currentIndex = units.indexOf(unit);
    const nextIndex = (currentIndex + 1) % units.length;
    onUnitChange(units[nextIndex]);
  };

  return (
    <div className="space-y-3 group">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-accent/80">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
        Convertir depuis
      </label>
      <div className="flex gap-3">
        <div className="flex-1 relative group/input">
          <Input
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            className="h-14 bg-card border-2 border-border focus:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md text-xl font-semibold px-6 group-hover/input:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            min="0"
            step="0.01"
          />
          {value && !disabled && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          )}
        </div>
        <Select value={unit} onValueChange={(value) => onUnitChange(value as UnitType)} disabled={disabled}>
          <SelectTrigger className="w-[180px] h-14 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-2 border-border rounded-2xl shadow-xl backdrop-blur-xl">
            <SelectItem value="bottles" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Bouteilles</span>
            </SelectItem>
            <SelectItem value="crates" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Casiers</span>
            </SelectItem>
            <SelectItem value="hectoliters" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Hectolitres (hl)</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSwapUnit}
          disabled={disabled}
          size="icon"
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light hover:scale-105 transition-transform shadow-sm hover:shadow-md"
          title="Changer d'unité"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
```

### 8.3 ConversionResults.tsx

```tsx
import { Package, Container, Droplets, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ConversionResultsProps {
  bottles: number;
  crates: number;
  hectoliters: number;
  excludeUnit?: "bottles" | "crates" | "hectoliters";
}

export const ConversionResults = ({
  bottles,
  crates,
  hectoliters,
  excludeUnit,
}: ConversionResultsProps) => {
  const results = [
    {
      icon: Package,
      label: "Bouteilles",
      value: bottles.toFixed(2),
      unit: "bouteilles",
      key: "bottles",
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
      key: "crates",
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
      key: "hectoliters",
      color: "from-primary-light/20 to-primary-light/5",
      borderColor: "border-primary-light/30",
      iconBg: "bg-primary-light/10",
      iconColor: "text-primary-light",
    },
  ];

  // Filtrer pour exclure l'unité source
  const filteredResults = results.filter(result => {
    if (excludeUnit === "bottles" && result.label === "Bouteilles") return false;
    if (excludeUnit === "crates" && result.label === "Casiers") return false;
    if (excludeUnit === "hectoliters" && result.label === "Hectolitres") return false;
    return true;
  });

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        Résultats de conversion
      </label>
      <div className="grid gap-4">
        {filteredResults.map((result, index) => {
          const Icon = result.icon;
          return (
            <Card
              key={result.label}
              className={`relative overflow-hidden p-5 bg-gradient-to-br ${result.color} border-2 ${result.borderColor} hover:border-primary transition-all duration-500 hover:shadow-xl hover:scale-[1.02] rounded-2xl group animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Cercle décoratif */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${result.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`w-6 h-6 ${result.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {result.label}
                    </span>
                    <div className="text-xs text-muted-foreground/60 mt-0.5">{result.unit}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground tabular-nums tracking-tight">
                    {result.value}
                  </div>
                </div>
              </div>
              
              {/* Ligne dégradée en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
```

### 8.4 ConversionHistory.tsx

```tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";

export interface HistoryItem {
  id: string;
  productName: string;
  value: number;
  unit: string;
  timestamp: number;
}

interface ConversionHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onItemClick: (item: HistoryItem) => void;
}

export const ConversionHistory = ({ history, onClear, onItemClick }: ConversionHistoryProps) => {
  // Ne rien afficher si l'historique est vide
  if (history.length === 0) return null;

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <Card className="glass-effect border-2 border-border/50 p-6 shadow-xl backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Conversions récentes</h3>
        </div>
        <Button
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Effacer
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer text-left group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.value} {item.unit}
              </p>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {formatTimestamp(item.timestamp)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
```

---

## SECTION 9: PAGE PRINCIPALE INDEX.TSX

```tsx
import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import { ProductSelector } from "@/components/ProductSelector";
import { ConversionInput, UnitType } from "@/components/ConversionInput";
import { ConversionResults } from "@/components/ConversionResults";
import { ConversionHistory, HistoryItem } from "@/components/ConversionHistory";
import { Card } from "@/components/ui/card";
import { Calculator, Sparkles, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import brascoLogo from "@/assets/brasco-logo.png";

const Index = () => {
  // États
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<UnitType>("bottles");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Charger l'historique depuis localStorage au montage
  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sauvegarder dans l'historique
  const saveToHistory = (productName: string, value: number, unit: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      productName,
      value,
      unit,
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history].slice(0, 10); // Maximum 10 items
    setHistory(updatedHistory);
    localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
  };

  // Effacer l'historique
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("conversionHistory");
    toast({
      title: "Historique effacé",
      description: "L'historique des conversions a été effacé.",
    });
  };

  // Restaurer depuis l'historique
  const restoreFromHistory = (item: HistoryItem) => {
    const product = products.find(p => p.name === item.productName);
    if (product) {
      setSelectedProduct(product);
      setInputValue(item.value.toString());
      setInputUnit(item.unit as UnitType);
      toast({
        title: "Conversion restaurée",
        description: `Restauré: ${item.value} ${item.unit} de ${item.productName}`,
      });
    }
  };

  // Calcul des résultats avec useMemo pour éviter les re-renders
  const results = useMemo(() => {
    if (!selectedProduct || !inputValue) {
      return { bottles: 0, crates: 0, hectoliters: 0 };
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return { bottles: 0, crates: 0, hectoliters: 0 };
    }

    let bottles = 0;
    let crates = 0;
    let hectoliters = 0;

    switch (inputUnit) {
      case "bottles":
        bottles = value;
        crates = value / selectedProduct.bottlesPerCrate;
        hectoliters = crates * selectedProduct.hectolitersPerCrate;
        break;
      case "crates":
        crates = value;
        bottles = value * selectedProduct.bottlesPerCrate;
        hectoliters = value * selectedProduct.hectolitersPerCrate;
        break;
      case "hectoliters":
        hectoliters = value;
        crates = value / selectedProduct.hectolitersPerCrate;
        bottles = crates * selectedProduct.bottlesPerCrate;
        break;
    }

    return { bottles, crates, hectoliters };
  }, [selectedProduct, inputValue, inputUnit]);

  // Sauvegarder automatiquement dans l'historique
  useEffect(() => {
    if (selectedProduct && inputValue) {
      const value = parseFloat(inputValue);
      if (!isNaN(value) && value > 0) {
        saveToHistory(selectedProduct.name, value, inputUnit);
      }
    }
  }, [selectedProduct?.name, inputValue, inputUnit]);

  return (
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
            <img
              src={brascoLogo}
              alt="Brasco Logo"
              className="h-24 w-auto object-contain animate-scale-in"
            />
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
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
          />

          {/* Spécifications du produit */}
          {selectedProduct && (
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl border-2 border-primary/20 animate-scale-in shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 uppercase tracking-wide text-sm">
                    Spécifications du produit
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                      <span className="text-muted-foreground">Bouteilles par casier</span>
                      <span className="font-bold text-foreground text-base">
                        {selectedProduct.bottlesPerCrate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                      <span className="text-muted-foreground">Hectolitres par casier</span>
                      <span className="font-bold text-foreground text-base">
                        {selectedProduct.hectolitersPerCrate} hl
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <ConversionInput
            value={inputValue}
            unit={inputUnit}
            onValueChange={setInputValue}
            onUnitChange={setInputUnit}
            disabled={!selectedProduct}
          />

          {/* Résultats */}
          {selectedProduct && inputValue && parseFloat(inputValue) > 0 && (
            <div className="animate-scale-in">
              <ConversionResults
                bottles={results.bottles}
                crates={results.crates}
                hectoliters={results.hectoliters}
                excludeUnit={inputUnit}
              />
            </div>
          )}

          {/* État vide */}
          {!selectedProduct && (
            <div className="text-center py-12 space-y-3">
              <div className="inline-flex p-4 bg-muted/50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Sélectionnez un produit pour commencer la conversion
              </p>
            </div>
          )}
        </Card>

        {/* Historique */}
        <ConversionHistory
          history={history}
          onClear={clearHistory}
          onItemClick={restoreFromHistory}
        />

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
  );
};

export default Index;
```

---

## SECTION 10: FICHIER HTML

### index.html

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>B-Convert - Convertisseur de Produits Brassicoles</title>
    <meta name="description" content="Convertisseur professionnel de produits brassicoles avec calculs instantanés entre bouteilles, casiers et hectolitres" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <meta name="author" content="Bienvenu Sedin Massamba" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## SECTION 11: DÉPENDANCES NPM

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "lucide-react": "^0.462.0",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-toast": "^1.2.14",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "typescript": "latest",
    "vite": "latest",
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1"
  }
}
```

---

## SECTION 12: PERSISTANCE LOCALSTORAGE

### Clé de stockage
```javascript
const STORAGE_KEY = "conversionHistory";
```

### Structure des données stockées
```javascript
// Tableau d'objets HistoryItem sérialisé en JSON
[
  {
    "id": "1702847123456",
    "productName": "Premium Lager 500ml",
    "value": 100,
    "unit": "bottles",
    "timestamp": 1702847123456
  },
  // ... maximum 10 items (les plus récents en premier)
]
```

### Opérations

1. **Chargement (au montage du composant):**
```javascript
const savedHistory = localStorage.getItem("conversionHistory");
if (savedHistory) {
  setHistory(JSON.parse(savedHistory));
}
```

2. **Sauvegarde (à chaque conversion valide):**
```javascript
localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
```

3. **Effacement:**
```javascript
localStorage.removeItem("conversionHistory");
```

---

## SECTION 13: NOTIFICATIONS TOAST

### Messages en français

| Action | Titre | Description |
|--------|-------|-------------|
| Effacement historique | "Historique effacé" | "L'historique des conversions a été effacé." |
| Restauration | "Conversion restaurée" | "Restauré: {value} {unit} de {productName}" |

---

## SECTION 14: RESPONSIVE DESIGN

### Breakpoints Tailwind utilisés
- **Mobile:** < 768px (styles par défaut)
- **Desktop:** md: ≥ 768px

### Adaptations spécifiques
- Titre H1: `text-5xl` (mobile) → `text-5xl md:text-6xl` (desktop)
- Container: `max-w-4xl mx-auto py-12 px-4`
- Les grilles et flexbox s'adaptent automatiquement

---

## SECTION 15: CHECKLIST DE REPRODUCTION

Cochez chaque étape après l'avoir complétée:

- [ ] 1. Créer un nouveau projet Vite avec React + TypeScript
- [ ] 2. Installer toutes les dépendances listées
- [ ] 3. Configurer Tailwind CSS avec le fichier tailwind.config.ts fourni
- [ ] 4. Créer le fichier src/index.css avec le design system complet
- [ ] 5. Installer et configurer shadcn/ui (init)
- [ ] 6. Ajouter les composants shadcn: button, card, input, select, toast
- [ ] 7. Créer src/types/product.ts
- [ ] 8. Créer src/data/products.ts avec les 6 produits
- [ ] 9. Créer src/components/ProductSelector.tsx
- [ ] 10. Créer src/components/ConversionInput.tsx
- [ ] 11. Créer src/components/ConversionResults.tsx
- [ ] 12. Créer src/components/ConversionHistory.tsx
- [ ] 13. Créer src/pages/Index.tsx avec toute la logique
- [ ] 14. Configurer le routage dans App.tsx
- [ ] 15. Ajouter le logo dans src/assets/brasco-logo.png
- [ ] 16. Mettre à jour index.html avec les métadonnées
- [ ] 17. Tester les conversions avec les exemples de vérification
- [ ] 18. Vérifier le responsive design
- [ ] 19. Tester la persistance localStorage
- [ ] 20. Vérifier les animations et transitions

---

## SECTION 16: TESTS DE VALIDATION

Après reproduction, exécutez ces tests:

### Test 1: Conversion Bouteilles → Autres
- Produit: Premium Lager 500ml
- Entrée: 100 bouteilles
- Résultats attendus:
  - Casiers: 5.00
  - Hectolitres: 0.5000

### Test 2: Conversion Casiers → Autres
- Produit: Craft IPA 330ml
- Entrée: 10 casiers
- Résultats attendus:
  - Bouteilles: 240.00
  - Hectolitres: 0.7920

### Test 3: Conversion Hectolitres → Autres
- Produit: Dark Ale 750ml
- Entrée: 1 hectolitre
- Résultats attendus:
  - Casiers: 11.11 (environ)
  - Bouteilles: 133.33 (environ)

### Test 4: Historique
- Effectuer 3 conversions différentes
- Vérifier qu'elles apparaissent dans l'historique
- Rafraîchir la page
- Vérifier que l'historique persiste
- Cliquer sur un item pour restaurer
- Cliquer sur "Effacer" et vérifier la suppression

---

**FIN DU DOCUMENT DE REPRODUCTION**

**Application:** B-Convert  
**Version:** 1.0  
**Auteur:** Bienvenu Sedin Massamba  
**© 2025 Tous droits réservés**
