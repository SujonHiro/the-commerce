import CustomerProductCard from "@/components/customer/Products/CustomerProductCard.tsx";
import { Card } from "@/components/ui/card.tsx";
import { useCustomerCollections } from "@/features/customer/products/use-customer-collections.ts";

import CommonLoader from "@/components/common/Loader.tsx";
import CustomerProductFilterPanel from "@/components/customer/Products/CustomerProductFilterPanel.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import type { ProductSort } from "@/features/customer/products/types";

export default function Collections() {
  const { categories, brands, products, loading, sort, changeSort } =
    useCustomerCollections();
  if (loading) return <CommonLoader />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <section className="relative overflow-hidden rounded-2xl mt-6">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-emerald-800 to-emerald-500" />
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 md:py-14">
          <p className="text-emerald-200/50 text-sm mb-2">
            Home <span className="mx-1.5">/</span>{" "}
            <span className="text-emerald-100/80">Shop</span>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            All Products
          </h2>
          <p className="mt-1.5 text-sm text-emerald-100/50">
            Browse our full collection — filter by category, price & more
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <Card className="p-6 sticky top-6">
            <CustomerProductFilterPanel
              categories={categories}
              brands={brands}
            />
          </Card>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 bg-white px-5 py-3 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                Total Product {products.length}
              </span>{" "}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-slate-500">
                Sort by:
              </label>
              <Select
                value={sort}
                onValueChange={(value) => changeSort(value as ProductSort)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {!loading && products.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((item) => (
                <CustomerProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
