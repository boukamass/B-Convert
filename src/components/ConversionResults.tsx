import { Package, Container, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ConversionResultsProps {
  bottles: number;
  crates: number;
  hectoliters: number;
}

export const ConversionResults = ({
  bottles,
  crates,
  hectoliters,
}: ConversionResultsProps) => {
  const results = [
    {
      icon: Package,
      label: "Bottles",
      value: bottles.toFixed(2),
      unit: "bottles",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Container,
      label: "Crates",
      value: crates.toFixed(2),
      unit: "crates",
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Droplets,
      label: "Hectoliters",
      value: hectoliters.toFixed(4),
      unit: "hl",
      gradient: "from-primary-glow/20 to-primary-glow/5",
    },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Results</label>
      <div className="grid gap-3">
        {results.map((result) => {
          const Icon = result.icon;
          return (
            <Card
              key={result.label}
              className={`p-4 bg-gradient-to-br ${result.gradient} border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background/80">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {result.label}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {result.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{result.unit}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
