import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

export default function CustomerProductCardSkeleton() {
  return (
    <Card className="p-0 rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
      <CardHeader className="aspect-square bg-slate-100 border-b" />
      <CardContent className="p-5">
        {/* Color swatches */}
        <div className="flex gap-2 my-2">
          <span className="h-4 w-4 rounded-full bg-slate-200" />
          <span className="h-4 w-4 rounded-full bg-slate-200" />
          <span className="h-4 w-4 rounded-full bg-slate-200" />
        </div>

        {/* Brand + Category row */}
        <div className="flex items-center justify-between mb-2">
          <span className="h-5 w-16 rounded-full bg-slate-200" />
          <span className="h-4 w-12 rounded bg-slate-100" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 rounded bg-slate-200 mb-2" />

        {/* Price + Button row */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 w-16 rounded bg-slate-200" />
          <div className="h-9 w-24 rounded-lg bg-slate-200" />
        </div>
      </CardContent>
    </Card>
  );
}
