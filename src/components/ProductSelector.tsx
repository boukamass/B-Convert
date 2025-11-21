import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Beer, ChevronDown } from "lucide-react";

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
        Select Your Product
      </label>
      <Select
        value={selectedProduct?.id}
        onValueChange={(value) => {
          const product = products.find((p) => p.id === value);
          if (product) onProductChange(product);
        }}
      >
        <SelectTrigger className="w-full h-14 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md group-hover:scale-[1.01] text-base font-medium">
          <SelectValue placeholder="Choose a product..." />
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
