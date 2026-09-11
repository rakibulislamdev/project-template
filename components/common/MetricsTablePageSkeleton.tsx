import React from 'react';
import { TableSkeleton } from './TableSkeleton';
import { PaginationSkeleton } from './PaginationSkeleton';

export function MetricsTablePageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-40 rounded-md bg-muted animate-pulse"></div>
        <div className="h-4 w-64 rounded-md bg-muted animate-pulse"></div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm h-32 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 rounded bg-muted"></div>
              <div className="h-8 w-8 rounded-full bg-muted"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-8 w-16 rounded bg-muted"></div>
              <div className="h-3 w-32 rounded bg-muted"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 w-full">
        <TableSkeleton />
        <PaginationSkeleton />
      </div>
    </div>
  );
}
