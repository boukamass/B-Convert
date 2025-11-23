import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";

export interface HistoryItem {
  id: string;
  productName: string;
  value: number;
  unit: string;
  timestamp: number;
}

interface ConversionHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onItemClick: (item: HistoryItem) => void;
}

export const ConversionHistory = ({ history, onClear, onItemClick }: ConversionHistoryProps) => {
  if (history.length === 0) return null;

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <Card className="glass-effect border-2 border-border/50 p-6 shadow-xl backdrop-blur-xl animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Conversions récentes</h3>
        </div>
        <Button
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Effacer
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer text-left group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex-1">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.productName}</p>
              <p className="text-sm text-muted-foreground">
                {item.value} {item.unit}
              </p>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {formatTimestamp(item.timestamp)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
