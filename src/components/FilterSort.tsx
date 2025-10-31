import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

export interface FilterOptions {
  genre: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: string;
}

interface FilterSortProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  genres: string[];
}

const FilterSort = ({ filters, onFilterChange, genres }: FilterSortProps) => {
  const handleGenreChange = (genre: string) => {
    onFilterChange({ ...filters, genre });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handlePriceChange = (values: number[]) => {
    onFilterChange({ ...filters, minPrice: values[0], maxPrice: values[1] });
  };

  const handleRatingChange = (value: number[]) => {
    onFilterChange({ ...filters, minRating: value[0] });
  };

  const resetFilters = () => {
    onFilterChange({
      genre: 'all',
      minPrice: 0,
      maxPrice: 50,
      minRating: 0,
      sortBy: 'featured',
    });
  };

  const hasActiveFilters = filters.genre !== 'all' || filters.minPrice > 0 || filters.maxPrice < 50 || filters.minRating > 0;

  return (
    <div className="bg-card border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Genre</Label>
          <Select value={filters.genre} onValueChange={handleGenreChange}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border z-50">
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border z-50">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={50}
              step={1}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Minimum Rating</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={[filters.minRating]}
              onValueChange={handleRatingChange}
              className="mb-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filters.minRating === 0 ? 'Any rating' : `${filters.minRating}+ stars`}
            </span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <Label className="text-xs text-muted-foreground mb-2 block">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {filters.genre !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {filters.genre}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleGenreChange('all')}
                />
              </Badge>
            )}
            {filters.minRating > 0 && (
              <Badge variant="secondary" className="gap-1">
                {filters.minRating}+ stars
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRatingChange([0])}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
