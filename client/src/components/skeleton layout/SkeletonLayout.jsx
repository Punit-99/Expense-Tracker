// components/SkeletonLayout.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLayout() {
  return (
    <div className="flex h-screen w-full bg-muted/30">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r space-y-4">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
