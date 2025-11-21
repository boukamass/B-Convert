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
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Beer className="w-4 h-4 text-primary" />
        Select Product
      </label>
      <Select
        value={selectedProduct?.id}
        onValueChange={(value) => {
          const product = products.find((p) => p.id === value);
          if (product) onProductChange(product);
        }}
      >
        <SelectTrigger className="w-full bg-card border-border hover:border-primary transition-colors">
          <SelectValue placeholder="Choose a product..." />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {products.map((product) => (
            <SelectItem
              key={product.id}
              value={product.id}
              className="cursor-pointer hover:bg-muted"
            >
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
