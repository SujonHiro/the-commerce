import type {ProductBrand, ProductCategory} from "@/features/customer/products/types.ts";
import {Badge} from "@/components/ui/badge.tsx";


type CustomerProductFilterPanelProps={
    categories:ProductCategory[];
    brands:ProductBrand[];
}

export default function CustomerProductFilterPanel({categories,brands}:CustomerProductFilterPanelProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900">Filters</h3>
                <button
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Categories */}
            <div className="mb-1">
                <h4 className="text-sm font-medium text-slate-500 mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <Badge
                            key={cat._id}
                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-600 font-sm cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                        >
                            {cat.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 " />

            {/* Brands */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-500 mb-3">Brand</h4>
                <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                        <Badge
                            key={brand._id}
                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-600 font-sm cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                        >
                            {brand.name}
                        </Badge>
                    ))}
                </div>
            </div>
        </>
    );
};