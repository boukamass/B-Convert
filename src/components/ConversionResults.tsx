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
      label: "Bottles",
      value: bottles.toFixed(2),
      unit: "bottles",
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary/30",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Container,
      label: "Crates",
      value: crates.toFixed(2),
      unit: "crates",
      color: "from-accent/20 to-accent/5",
      borderColor: "border-accent/30",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Droplets,
      label: "Hectoliters",
      value: hectoliters.toFixed(4),
      unit: "hl",
      color: "from-primary-light/20 to-primary-light/5",
      borderColor: "border-primary-light/30",
      iconBg: "bg-primary-light/10",
      iconColor: "text-primary-light",
    },
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        Conversion Results
      </label>
      <div className="grid gap-4">
        {results.filter(result => {
          const unitMap = { bottles: "bottles", crates: "crates", hectoliters: "hectoliters" };
          return result.label.toLowerCase() !== excludeUnit;
        }).map((result, index) => {
          const Icon = result.icon;
          return (
            <Card
              key={result.label}
              className={`relative overflow-hidden p-5 bg-gradient-to-br ${result.color} border-2 ${result.borderColor} hover:border-primary transition-all duration-500 hover:shadow-xl hover:scale-[1.02] rounded-2xl group animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
