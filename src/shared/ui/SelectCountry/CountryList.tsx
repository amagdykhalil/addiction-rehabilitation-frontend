import type { Country } from "@/entities/countries/model";
import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui/badge";
import { Check } from "lucide-react";
import { FixedSizeList as VirtualList } from "react-window";
import { CommandItem } from "../command";

interface CountryListProps {
  items: Country[];
  onSelect: (country: Country) => void;
  selectedCode?: string;
}

export function CountryList({
  items,
  onSelect,
  selectedCode,
}: CountryListProps) {
  return (
    <VirtualList
      height={240}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => {
        const country = items[index];
        return (
          <div style={style} key={country.id}>
            <CommandItem
              value={String(country.id)}
              onSelect={() => onSelect(country)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Check
                className={cn(
                  "h-4 w-4",
                  selectedCode && country.code === selectedCode
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                {country.code}
              </Badge>
              <div className="flex flex-col">
                <span className="font-medium">{country.name}</span>
                <span className="text-xs text-muted-foreground">
                  {country.iso3}
                </span>
              </div>
            </CommandItem>
          </div>
        );
      }}
    </VirtualList>
  );
}
