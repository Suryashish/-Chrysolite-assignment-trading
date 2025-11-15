import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit?: (term: string) => void;
  isSearching?: boolean; 
}

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, isSearching }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 lg:h-5 lg:w-5 text-(--text-tertiary)" />
      </div>
      <input
        type="text"
        placeholder="Search stocks or symbols..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearchSubmit?.(searchTerm);
          }
        }}
        className="w-full bg-(--bg-secondary) border border-(--border-color) rounded-lg px-4 py-2.5 lg:py-3 pl-10 lg:pl-12 text-sm lg:text-base text-(--text-primary) placeholder-(--text-tertiary) focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        aria-label="Search stocks"
      />

      <button
        type="button"
        onClick={() => onSearchSubmit?.(searchTerm)}
        disabled={isSearching}
        aria-label="Search and add stock"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSearching ? 'Searching...' : 'Add'}
      </button>
    </div>
  );
};

export default SearchBar;
