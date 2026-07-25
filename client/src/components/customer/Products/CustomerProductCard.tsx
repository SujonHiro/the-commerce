import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { getCoverImage } from "@/features/customer/products/product-list.shared.ts";
import type { CustomerProduct } from "@/features/customer/products/types.ts";

type CustomerProductCardProps = {
  product: CustomerProduct;
};
export default function CustomerProductCard({
  product,
}: CustomerProductCardProps) {
  const coverImage = getCoverImage(product);
  return (
    <Card className="group p-0 rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300">
      <CardHeader className="aspect-square bg-slate-50 flex items-center justify-center text-6xl border-b  group-hover:bg-slate-100 transition-colors">
        {coverImage ? (
          <img src={coverImage} alt={product.title} />
        ) : (
          <div>no image</div>
        )}
      </CardHeader>
      <CardContent className="p-5">
        {product.colors.length ? (
          <div className="flex gap-2 my-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                className="h-4 w-4"
                style={{ backgroundColor: color }}
              ></span>
            ))}
            {product.colors.length > 4 ? (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {product.brand.name}
          </span>
          <span className="text-xs text-slate-400 ">
            {product.category.name}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 tracking-tight group-hover:text-emerald-700 line-clamp-1 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-slate-900">৳ {product.price}</p>
          <Button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 active:scale-95 transition-all duration-200">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
