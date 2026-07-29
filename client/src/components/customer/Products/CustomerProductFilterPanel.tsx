import { Badge } from "@/components/ui/badge.tsx";
import {
  getSwatchColor,
  type CustomerProductFilter,
  type FacetKey,
} from "@/features/customer/products/product-list.shared";
import type {
  ProductBrand,
  ProductCategory,
} from "@/features/customer/products/types.ts";

type CustomerProductFilterPanelProps = {
  categories: ProductCategory[];
  brands: ProductBrand[];
  filters: CustomerProductFilter;
  availableColors: string[];
  hasActiveFilters: boolean;
  colorLoading: boolean;
  onToggleFacet: (key: FacetKey, value: string) => void;
  onClearFilters: () => void;
};

export default function CustomerProductFilterPanel({
  categories,
  brands,
  filters,
  availableColors,
  hasActiveFilters,
  colorLoading,
  onClearFilters,
  onToggleFacet,
}: CustomerProductFilterPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-1">
        <h4 className="text-sm font-medium text-slate-500 mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = filters.category === cat._id;
            return (
              <Badge
                key={cat._id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onToggleFacet("category", cat._id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-sm cursor-pointer transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                }`}
              >
                {cat.name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 " />

      {/* Brands */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-500 mb-3">Brand</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => {
            const isActive = filters.brand === brand._id;
            return (
              <Badge
                key={brand._id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onToggleFacet("brand", brand._id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-sm cursor-pointer transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                }`}
              >
                {brand.name}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-500 mb-3">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {colorLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-8 w-8 rounded-full bg-slate-200 animate-pulse"
              />
            ))
          ) : availableColors.length ? (
            availableColors.map((color) => {
              const isActive = filters.color === color;
              return (
                <button
                  key={color}
                  type="button"
                  className={`flex flex-col items-center gap-2 text-xs text-muted-foreground ${
                    isActive ? "text-foreground" : ""
                  }`}
                  onClick={() => onToggleFacet("color", color)}
                >
                  <span
                    className={`h-4 w-4 border ${isActive ? "border-primary ring-2 ring-primary/30" : "border"}`}
                    style={{ backgroundColor: getSwatchColor(color) }}
                  />
                </button>
              );
            })
          ) : (
            <p className="text-xs text-slate-400">No colors available</p>
          )}
        </div>
      </div>
    </>
  );
}
