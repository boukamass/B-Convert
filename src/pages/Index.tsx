import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import { ProductSelector } from "@/components/ProductSelector";
import { ConversionInput, UnitType } from "@/components/ConversionInput";
import { ConversionResults } from "@/components/ConversionResults";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<UnitType>("bottles");

  const calculateConversions = () => {
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
  };

  const results = calculateConversions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-primary-glow rounded-2xl shadow-lg">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Brewery Product Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert between bottles, crates, and hectoliters instantly
          </p>
        </div>

        {/* Main Conversion Card */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl space-y-6">
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
          />

          {selectedProduct && (
            <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Bottles per crate:</span>
                  <span className="font-medium text-foreground">
                    {selectedProduct.bottlesPerCrate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hectoliters per crate:</span>
                  <span className="font-medium text-foreground">
                    {selectedProduct.hectolitersPerCrate} hl
                  </span>
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

          {selectedProduct && inputValue && (
            <div className="animate-scale-in">
              <ConversionResults
                bottles={results.bottles}
                crates={results.crates}
                hectoliters={results.hectoliters}
              />
            </div>
          )}
        </Card>

        {/* Info Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Select a product and enter a quantity to start converting</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
