import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, Plus, X, Building2 } from "lucide-react";

export interface IndustryOption {
  name: string;
  icon?: string;
  color?: string;
}

interface SearchableIndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
  industries: IndustryOption[];
  placeholder?: string;
  allowCustom?: boolean;
  className?: string;
}

export const SearchableIndustrySelect: React.FC<SearchableIndustrySelectProps> = ({
  value,
  onChange,
  industries,
  placeholder = "Select an industry...",
  allowCustom = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Filter items based on search query
  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) return industries;
    const q = searchQuery.toLowerCase().trim();
    return industries.filter((ind) => ind.name.toLowerCase().includes(q));
  }, [industries, searchQuery]);

  // Find currently selected option
  const selectedOption = useMemo(() => {
    if (!value) return null;
    const match = industries.find(
      (ind) => ind.name.toLowerCase() === value.trim().toLowerCase()
    );
    return match || { name: value, color: "#1657FF" };
  }, [industries, value]);

  // Check if current search query exactly matches an existing option
  const exactMatch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return industries.some((ind) => ind.name.toLowerCase() === q);
  }, [industries, searchQuery]);

  const handleSelect = (indName: string) => {
    onChange(indName);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface border transition-all text-left outline-none ${
          isOpen
            ? "border-primary ring-2 ring-primary/20 shadow-xs"
            : "border-outline-variant/30 hover:border-outline-variant/60"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                style={{ backgroundColor: selectedOption.color || "#1657FF" }}
              />
              <span className="truncate text-on-surface font-medium">
                {selectedOption.name}
              </span>
            </>
          ) : (
            <span className="text-on-surface-variant font-normal">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-on-surface-variant">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              title="Clear selection"
              className="p-0.5 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </span>
          )}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl bg-surface border border-outline-variant/40 shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2 border-b border-outline-variant/20 bg-surface-container-lowest flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-on-surface-variant shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search industry or type new..."
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/60 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-md text-on-surface-variant hover:text-on-surface"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Quick Stats Header */}
          <div className="px-3 py-1.5 bg-surface-container-low text-[10px] font-semibold text-on-surface-variant border-b border-outline-variant/10 flex items-center justify-between">
            <span>
              {filteredIndustries.length} of {industries.length} industries
            </span>
            {selectedOption && (
              <span className="text-primary truncate max-w-[120px]">
                Selected: {selectedOption.name}
              </span>
            )}
          </div>

          {/* Scrollable Items List */}
          <div className="max-h-56 overflow-y-auto p-1 divide-y divide-outline-variant/10">
            {filteredIndustries.length > 0 ? (
              filteredIndustries.map((ind) => {
                const isSelected =
                  value.trim().toLowerCase() === ind.name.trim().toLowerCase();
                return (
                  <button
                    key={ind.name}
                    type="button"
                    onClick={() => handleSelect(ind.name)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                        style={{ backgroundColor: ind.color || "#1657FF" }}
                      />
                      <span className="truncate">{ind.name}</span>
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-on-surface-variant">
                No matching industries found
              </div>
            )}

            {/* Custom Industry Option */}
            {allowCustom && searchQuery.trim() && !exactMatch && (
              <div className="p-1 border-t border-outline-variant/20 mt-1">
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery.trim())}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10 transition-colors cursor-pointer text-left"
                >
                  <Plus className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Add "{searchQuery.trim()}" as custom industry
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
