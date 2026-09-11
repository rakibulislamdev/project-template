import React from 'react';

export function TableSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden w-full">
      {/* Table Header */}
      <div className="h-12 bg-muted/50 border-b border-border"></div>
      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center p-4 border-b border-border last:border-0 gap-4 animate-pulse">
          {/* Primary Column */}
          <div className="flex flex-col gap-2 w-1/3">
            <div className="h-4 w-2/3 rounded bg-muted"></div>
            <div className="h-3 w-1/3 rounded bg-muted"></div>
          </div>
          {/* Secondary Column */}
          <div className="hidden sm:block flex-1">
            <div className="h-4 w-32 rounded bg-muted"></div>
          </div>
          {/* Third Column */}
          <div className="hidden md:block w-24">
            <div className="h-4 w-16 rounded bg-muted"></div>
          </div>
          {/* Status Column */}
          <div className="w-24">
            <div className="h-6 w-20 rounded-full bg-muted"></div>
          </div>
          {/* Actions */}
          <div className="flex gap-2 w-8">
            <div className="h-8 w-8 rounded bg-muted"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
