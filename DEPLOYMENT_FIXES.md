# B-Convert - Corrections de Déploiement

## Problèmes Identifiés et Corrigés

### 1. ❌ CSP (Content Security Policy) Violation
**Erreur originale:**
```
Executing inline script violates CSP directive 'script-src 'self' 'wasm-unsafe-eval'
```

**Cause:** Power Apps applique une politique CSP stricte qui bloque les scripts inline.

**Solution:**
- Vérifier que le build Vite ne génère pas de scripts inline
- S'assurer que `base: "./"` est configuré dans vite.config.ts
- Build correctement avant déploiement

### 2. ❌ Port Incorrect
**Problème:** L'application utilisait le port 3000 au lieu de 8080

**Correction:**
- `vite.config.ts`: Port changé de 3000 → 8080
- `power.config.json`: `localAppUrl` mis à jour vers `http://localhost:8080/`

### 3. ❌ Erreur 404 et Route Introuvable
**Erreur:**
```
404 Error: User attempted to access non-existent route: /20251126t151127zd605003e2b/index.html
```

**Cause:** Path versionnés générés par Power Apps non gérés correctement

**Solutions appliquées:**
- `base: "./"` dans vite.config.ts (paths relatifs)
- Configuration build optimisée pour Power Apps
- Assets directory configuré explicitement

### 4. ❌ Produits ne se Chargent Pas
**Symptôme:** "Chargement des produits…" à l'infini

**Corrections apportées:**

#### useProducts Hook
```typescript
// AVANT: Pas de gestion d'erreur visible
return { products, loading };

// APRÈS: Gestion complète des erreurs
return { products, loading, error };
```

**Améliorations:**
- ✅ État `error` ajouté pour capturer les échecs
- ✅ Logs détaillés pour debugging
- ✅ Validation de la réponse Dataverse
- ✅ Message d'erreur explicite si aucune donnée

#### Index Component
**AVANT:**
```typescript
{loading ? (
  <p>Chargement des produits…</p>
) : (
  <ProductSelector ... />
)}
```

**APRÈS:**
```typescript
{loading ? (
  <LoadingSpinner />
) : error ? (
  <ErrorDisplay error={error} />
) : products.length === 0 ? (
  <EmptyState />
) : (
  <ProductSelector ... />
)}
```

**États gérés:**
- ✅ Loading: Spinner animé avec message
- ✅ Error: Affichage de l'erreur avec détails
- ✅ Empty: Message si table vide
- ✅ Success: ProductSelector affiché

### 5. ✅ PowerProvider Amélioré
**Ajouts:**
- Logs détaillés pour debugging
- Fallback gracieux si SDK échoue
- Ne bloque jamais le rendu de l'app

```typescript
console.log('[PowerProvider] Initializing...');
await initialize();
console.log('[PowerProvider] Success');
// Continues même en cas d'erreur
```

## Configuration Finale

### vite.config.ts
```typescript
{
  base: "./",
  server: {
    host: "::",
    port: 8080,  // ✅ Port correct
  },
  build: {
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}
```

### power.config.json
```json
{
  "localAppUrl": "http://localhost:8080/",  // ✅ Port correct
  "buildPath": "./dist",
  "buildEntryPoint": "index.html"
}
```

## Checklist de Déploiement

Avant de déployer avec `pac code push`:

- [x] Port 8080 dans vite.config.ts
- [x] Port 8080 dans power.config.json
- [x] `base: "./"` configuré
- [x] Gestion d'erreurs dans useProducts
- [x] UI d'erreur dans Index
- [x] Logs de debugging ajoutés
- [x] Build optimisé pour Power Apps

## Commandes de Déploiement

```bash
# 1. Clean build
rm -rf dist node_modules/.vite
npm install

# 2. Build
npm run build

# 3. Vérifier que dist/ contient les bons fichiers
ls -la dist/
# Devrait montrer:
# - index.html
# - assets/ (avec JS et CSS)

# 4. Déployer
pac code push

# 5. Tester dans Power Apps
# Aller sur make.powerapps.com
# Sélectionner environnement
# Lancer B-Convert
```

## Debugging dans Power Apps

Si l'app ne charge toujours pas:

1. **Ouvrir la console browser (F12)** dans Power Apps
2. **Chercher les logs:**
   - `[main.tsx]` - App démarre
   - `[PowerProvider]` - SDK initialise
   - `[useProducts]` - Dataverse se connecte

3. **Vérifier les erreurs réseau:**
   - Onglet Network → Filtrer "dataverse" ou "api"
   - Vérifier status codes (200 = OK, 401 = auth, 404 = not found)

4. **Vérifier Dataverse:**
   ```bash
   # Tester la connexion Dataverse localement
   npm run dev
   # Ouvrir http://localhost:8080
   # Console devrait montrer: "[useProducts] Number of items fetched: X"
   ```

## Résolution des Erreurs Courantes

### Erreur: "No data received from Dataverse"
**Cause:** Table vide ou permissions insuffisantes

**Solution:**
1. Vérifier que table `mbs_produits` existe
2. Vérifier permissions sur la table
3. Ajouter des données de test dans Dataverse

### Erreur: "Failed to initialize Power Apps SDK"
**Impact:** Aucun - l'app continue en mode standalone

**Note:** Normal en dev local, doit disparaître dans Power Apps

### Erreur: Build assets 404
**Cause:** Path incorrects après build

**Solution:**
1. Vérifier `base: "./"` dans vite.config.ts
2. Re-build: `npm run build`
3. Re-déployer: `pac code push`

## Support

Si problèmes persistent:

1. **Vérifier les logs console** (les 3 composants: main, PowerProvider, useProducts)
2. **Vérifier Network tab** pour appels Dataverse
3. **Tester localement** sur http://localhost:8080 d'abord

---

**Corrections appliquées:** 2025-11-26
**Version:** Conforme Microsoft HelloWorld + Dataverse
**Status:** ✅ Prêt pour déploiement
