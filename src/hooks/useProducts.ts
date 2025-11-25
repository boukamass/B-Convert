import { useEffect, useState } from "react";
import { Mbs_produitsService } from "@/generated/services/Mbs_produitsService";
import type { Mbs_produits } from "@/generated/models/Mbs_produitsModel";
import type { Product } from "@/types/product";

// IGetAllOptions is assumed to be imported or defined elsewhere

export function useProducts() {
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  // FIX: Define options without 'as const' to make the 'select' array a mutable string[]
  const options = { 
   select: ['mbs_produitid', 'mbs_name', 'mbs_quantityperuom','mbs_unitvolumehl'],
   top: 50
  };

  async function load() {
   try {
    // Pass the corrected 'options' object to the service call
    const response = await Mbs_produitsService.getAll(options);
    
    const items: Mbs_produits[] = (response.data) || [];
    console.log("Dataverse response data:", response.data);
    console.log("Number of items fetched:", items.length);

    const mapped: Product[] = items.map((item) => ({
     id: item.mbs_produitid ?? "",
     name: item.mbs_name ?? "Unnamed Product",
     bottlesPerCrate: Number(item.mbs_quantityperuom ?? 0),
     hectolitersPerCrate: Number(item.mbs_unitvolumehl ?? 0),
    }));

    setProducts(mapped);
   } catch (error) {
    console.error("Failed to load products from Dataverse:", error);
   } finally {
    setLoading(false);
   }
  }

  load();
 }, []); 

 return { products, loading };
}