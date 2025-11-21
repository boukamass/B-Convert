import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">From</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Enter quantity"
          disabled={disabled}
          className="flex-1 bg-card border-border focus:border-primary transition-colors text-lg"
          min="0"
          step="0.01"
        />
        <Select value={unit} onValueChange={(value) => onUnitChange(value as UnitType)}>
          <SelectTrigger className="w-[140px] bg-card border-border hover:border-primary transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="bottles" className="cursor-pointer hover:bg-muted">
              Bottles
            </SelectItem>
            <SelectItem value="crates" className="cursor-pointer hover:bg-muted">
              Crates
            </SelectItem>
            <SelectItem value="hectoliters" className="cursor-pointer hover:bg-muted">
              Hectoliters (hl)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
