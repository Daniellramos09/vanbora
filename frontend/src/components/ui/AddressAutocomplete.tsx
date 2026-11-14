import React, { useState, useEffect, useRef } from 'react';
import { searchAddress, GeoLocation } from '../../services/geoService';
import { MapPin, Loader2, Navigation, Check } from 'lucide-react';

interface AddressAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (address: string, location?: GeoLocation) => void;
  required?: boolean;
  iconColor?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  iconColor = 'text-brand-blue',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincroniza se o valor pai mudar externamente (ex: cliques em presets)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce para busca no OpenStreetMap
  useEffect(() => {
    if (!inputValue || inputValue.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Se o valor digitado for exatamente o selecionado, não precisa rebuscar
    if (inputValue === value && !isOpen) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchAddress(inputValue);
      setSuggestions(results);
      setIsLoading(false);
      setIsOpen(results.length > 0);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: GeoLocation) => {
    setInputValue(item.displayName);
    onChange(item.displayName, item);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val); // Atualiza texto mesmo sem escolher da lista
  };

  return (
    <div ref={containerRef} className="relative w-full space-y-1">
      <label className="block text-xs font-bold text-brand-ink">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-brand-muted animate-spin" />
          ) : (
            <MapPin className={`w-4 h-4 ${iconColor}`} />
          )}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-ink placeholder:text-brand-muted/70 transition-all shadow-2xs"
        />
      </div>

      {/* Dropdown de Sugestões de Endereço */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border-2 border-brand-border-strong rounded-2xl shadow-towel overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-2 text-[10px] font-bold text-brand-muted uppercase tracking-wider bg-slate-50 border-b border-brand-border">
            Sugestões na Grande SP & Região
          </div>
          <ul className="divide-y divide-brand-border/60">
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className="px-3.5 py-2.5 text-xs text-brand-ink hover:bg-brand-blue-soft/50 cursor-pointer flex items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{item.displayName}</p>
                    <p className="text-[10px] text-brand-muted">
                      {item.suburb ? `${item.suburb}, ` : ''}{item.city}
                    </p>
                  </div>
                </div>
                <Check className="w-3.5 h-3.5 text-brand-green opacity-0 hover:opacity-100 flex-shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
