import React from 'react';

export function PaginationSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 w-full">
      <div className="h-4 w-40 rounded bg-muted animate-pulse"></div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 rounded-md bg-muted animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
