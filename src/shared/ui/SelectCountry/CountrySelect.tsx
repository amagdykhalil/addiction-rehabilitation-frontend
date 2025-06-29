"use client";

import type React from "react";

import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/shared/ui/command";
import { Badge } from "@/shared/ui/badge";
import { ChevronDown, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Country } from "@/entities/countries/model";
import { useGetCountries } from "@/features/countries/hooks/useGetCountries";
import { CountryList } from "./CountryList";

interface CountrySelectProps {
  value?: number;
  onSelectCountry: (id: number) => void;
  placeholder?: string;
  className?: string;
}
const MIN_DIALOG_WIDTH = 280;
export function CountrySelect({
  value,
  onSelectCountry,
  placeholder = "Select country...",
  className,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { countries, isLoading } = useGetCountries();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [contentWidth, setContentWidth] = useState<number | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setContentWidth(
        triggerRef.current.offsetWidth <= MIN_DIALOG_WIDTH
          ? MIN_DIALOG_WIDTH
          : triggerRef.current.offsetWidth,
      );
    }
  }, [open, className]);

  const selectedCountry = useMemo(() => {
    if (isLoading || !value || !countries.length) return null;
    return countries.find((country) => country.id === value) || null;
  }, [countries, value, isLoading]);

  const filteredCountries = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.iso3.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [countries, searchQuery],
  );

  const handleSelect = (country: Country) => {
    if (selectedCountry && country.id === selectedCountry.id) {
      onSelectCountry(0);
    } else {
      onSelectCountry(country.id);
    }
    setOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCountry(0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between h-10 cursor-pointer w-full",
            className,
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {selectedCountry ? (
              <div className="flex items-center gap-2 min-w-0">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {selectedCountry.code}
                </Badge>
                <span className="truncate">{selectedCountry.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground truncate">
                {placeholder}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {selectedCountry && (
              <div
                className="h-4 w-4 p-0 hover:bg-muted rounded-sm flex items-center justify-center cursor-pointer"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </div>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={contentWidth ? { width: contentWidth } : undefined}
        align="start"
        className="p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search countries..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading countries...
              </div>
            ) : (
              <>
                <CommandEmpty>No countries found.</CommandEmpty>
                <CommandGroup>
                  <CountryList
                    items={filteredCountries}
                    onSelect={handleSelect}
                    selectedCode={selectedCountry?.code}
                  />
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
