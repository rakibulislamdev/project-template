import React from 'react';
import { TableSkeleton } from './TableSkeleton';
import { PaginationSkeleton } from './PaginationSkeleton';

export function TablePageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-40 rounded-md bg-muted animate-pulse"></div>
        <div className="h-4 w-64 rounded-md bg-muted animate-pulse"></div>
      </div>

      {/* Search & Tabs Skeleton */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="w-full sm:max-w-[280px] h-10 rounded-xl bg-muted animate-pulse"></div>
        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-20 sm:w-24 rounded-full bg-muted animate-pulse"></div>
          ))}
        </div>
      </div>

      <TableSkeleton />
      <PaginationSkeleton />
    </div>
  );
}
