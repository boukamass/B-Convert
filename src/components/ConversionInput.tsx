import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightLeft } from "lucide-react";

export type UnitType = "bottles" | "crates" | "hectoliters";

interface ConversionInputProps {
  value: string;
  unit: UnitType;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: UnitType) => void;
  disabled?: boolean;
}

export const ConversionInput = ({
  value,
  unit,
  onValueChange,
  onUnitChange,
  disabled,
}: ConversionInputProps) => {
  const handleSwapUnit = () => {
    const units: UnitType[] = ["bottles", "crates", "hectoliters"];
    const currentIndex = units.indexOf(unit);
    const nextIndex = (currentIndex + 1) % units.length;
    onUnitChange(units[nextIndex]);
  };

  return (
    <div className="space-y-3 group">
      <label className="text-sm font-semibold text-foreground flex items-center gap-2 uppercase tracking-wider">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent to-accent/80">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
        Convert From
      </label>
      <div className="flex gap-3">
        <div className="flex-1 relative group/input">
          <Input
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="0.00"
            disabled={disabled}
            className="h-14 bg-card border-2 border-border focus:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md text-xl font-semibold px-6 group-hover/input:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            min="0"
            step="0.01"
          />
          {value && !disabled && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          )}
        </div>
        <Select value={unit} onValueChange={(value) => onUnitChange(value as UnitType)} disabled={disabled}>
          <SelectTrigger className="w-[180px] h-14 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-2 border-border rounded-2xl shadow-xl backdrop-blur-xl">
            <SelectItem value="bottles" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Bottles</span>
            </SelectItem>
            <SelectItem value="crates" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Crates</span>
            </SelectItem>
            <SelectItem value="hectoliters" className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 rounded-xl my-1 py-3 transition-all duration-200">
              <span className="font-medium">Hectoliters (hl)</span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSwapUnit}
          disabled={disabled}
          size="icon"
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light hover:scale-105 transition-transform shadow-sm hover:shadow-md"
          title="Swap unit"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
