import { useEffect, useState } from "react";
import { Mbs_produitsService } from "@/generated/services/Mbs_produitsService";
import type { Mbs_produits } from "@/generated/models/Mbs_produitsModel";
import type { Product } from "@/types/product";

// IGetAllOptions is assumed to be imported or defined elsewhere

export function useProducts() {
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const options = { 
   select: ['mbs_produitid', 'mbs_name', 'mbs_quantityperuom','mbs_unitvolumehl'],
   top: 50
  };

  async function load() {
   try {
    console.log('[useProducts] Starting to fetch products from Dataverse...');
    const response = await Mbs_produitsService.getAll(options);
    
    console.log('[useProducts] Raw response:', response);
    
    if (!response || !response.data) {
     throw new Error('No data received from Dataverse');
    }

    const items: Mbs_produits[] = response.data || [];
    console.log('[useProducts] Number of items fetched:', items.length);

    if (items.length === 0) {
     console.warn('[useProducts] No products found in Dataverse table mbs_produits');
    }

    const mapped: Product[] = items.map((item) => ({
     id: item.mbs_produitid ?? "",
     name: item.mbs_name ?? "Unnamed Product",
     bottlesPerCrate: Number(item.mbs_quantityperuom ?? 0),
     hectolitersPerCrate: Number(item.mbs_unitvolumehl ?? 0),
    }));

    console.log('[useProducts] Mapped products:', mapped);
    setProducts(mapped);
    setError(null);
   } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[useProducts] Failed to load products:', err);
    setError(`Erreur de chargement: ${errorMessage}`);
   } finally {
    setLoading(false);
   }
  }

  load();
 }, []); 

 return { products, loading, error };
}