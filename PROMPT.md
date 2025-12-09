# B-Convert - Application de Conversion Brassicole

## Description
Application web de conversion d'unités pour produits de brasserie. Permet de convertir entre bouteilles, casiers et hectolitres pour différents produits Brasco.

## Produits Disponibles
| Produit | Bouteilles/Casier | Litres/Bouteille |
|---------|-------------------|------------------|
| Primus 72cl | 12 | 0.72 |
| Primus 65cl | 12 | 0.65 |
| Primus 50cl | 20 | 0.50 |
| Tembo 72cl | 12 | 0.72 |
| Tembo 50cl | 20 | 0.50 |
| Nkoyi 50cl | 20 | 0.50 |
| Beaufort 33cl | 24 | 0.33 |
| Doppel 50cl | 20 | 0.50 |
| Heineken 33cl | 24 | 0.33 |
| Turbo King 50cl | 20 | 0.50 |
| Maltina 33cl | 24 | 0.33 |

## Formules de Conversion
- **Bouteilles → Casiers**: bouteilles ÷ bouteilles_par_casier
- **Bouteilles → Hectolitres**: (bouteilles × litres_par_bouteille) ÷ 100
- **Casiers → Bouteilles**: casiers × bouteilles_par_casier
- **Casiers → Hectolitres**: (casiers × bouteilles_par_casier × litres_par_bouteille) ÷ 100
- **Hectolitres → Bouteilles**: (hectolitres × 100) ÷ litres_par_bouteille
- **Hectolitres → Casiers**: résultat_bouteilles ÷ bouteilles_par_casier

## Fonctionnalités

### 1. Sélection de Produit
- Menu déroulant avec tous les produits
- Affiche les caractéristiques du produit sélectionné

### 2. Saisie de Conversion
- Champ numérique pour la quantité
- Sélecteur d'unité source (Bouteilles, Casiers, Hectolitres)
- Conversion en temps réel

### 3. Affichage des Résultats
- Montre les 3 unités simultanément
- Met en évidence l'unité source
- Précision: 2 décimales (bouteilles/casiers), 4 décimales (hectolitres)

### 4. Historique
- Sauvegarde automatique des conversions (localStorage)
- Maximum 10 entrées
- Bouton pour vider l'historique
- Format: "100 Bouteilles Primus 72cl → 8.33 Casiers, 0.7200 HL"

## Design
- **Couleurs**: Vert Brasco (#166534 principal), fond sombre avec dégradés
- **Style**: Glassmorphisme (cartes semi-transparentes avec blur)
- **Logo**: Logo Brasco en haut
- **Animations**: Effets de flottement subtils, transitions fluides
- **Responsive**: Adapté mobile et desktop

## Notifications
- Toast de succès quand une conversion est sauvegardée
- Toast d'info quand l'historique est vidé

## Technologies
React, TypeScript, Tailwind CSS, Shadcn/UI, Lucide React icons

## Langue
Interface entièrement en français
