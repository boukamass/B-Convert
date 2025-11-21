import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import { ProductSelector } from "@/components/ProductSelector";
import { ConversionInput, UnitType } from "@/components/ConversionInput";
import { ConversionResults } from "@/components/ConversionResults";
import { Card } from "@/components/ui/card";
import { Calculator, Sparkles, Info } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-4xl mx-auto py-12 px-4 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary via-primary-light to-primary rounded-3xl shadow-2xl animate-glow">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-scale-in">
              Brewery Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instant conversions between bottles, crates, and hectoliters with precision
            </p>
          </div>
        </div>

        {/* Main Conversion Card */}
        <Card className="p-8 glass-effect border-2 border-border/50 shadow-2xl space-y-8 rounded-3xl backdrop-blur-xl hover:border-primary/30 transition-all duration-500">
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
          />

          {selectedProduct && (
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl border-2 border-primary/20 animate-scale-in shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 uppercase tracking-wide text-sm">
                    Product Specifications
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                      <span className="text-muted-foreground">Bottles per crate</span>
                      <span className="font-bold text-foreground text-base">
                        {selectedProduct.bottlesPerCrate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                      <span className="text-muted-foreground">Hectoliters per crate</span>
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

          {!selectedProduct && (
            <div className="text-center py-12 space-y-3">
              <div className="inline-flex p-4 bg-muted/50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Select a product to start converting
              </p>
            </div>
          )}
        </Card>

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground/80">
            Real-time precision calculations for brewery inventory management
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span>Powered by advanced conversion algorithms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
