import React from 'react';

export function CardGridPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 rounded-md bg-muted animate-pulse"></div>
        <div className="h-4 w-64 rounded-md bg-muted animate-pulse"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm h-[220px] animate-pulse">
             {/* Card header */}
             <div className="flex gap-4 items-center mb-2">
               <div className="h-12 w-12 rounded-full bg-muted shrink-0"></div>
               <div className="space-y-2 flex-1">
                 <div className="h-5 w-2/3 rounded bg-muted"></div>
                 <div className="h-4 w-1/2 rounded bg-muted"></div>
               </div>
             </div>
             {/* Card body - Info row */}
             <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-24 rounded bg-muted"></div>
                <div className="h-4 w-24 rounded bg-muted"></div>
             </div>
             {/* Buttons */}
             <div className="flex gap-3 mt-auto">
               <div className="h-10 flex-1 rounded-xl bg-muted"></div>
               <div className="h-10 flex-1 rounded-xl bg-muted"></div>
             </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
        <div className="h-4 w-40 rounded bg-muted animate-pulse"></div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-9 rounded-md bg-muted animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
