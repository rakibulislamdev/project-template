import React from 'react';

export function SettingsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full pb-10">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-40 rounded-md bg-muted animate-pulse"></div>
        <div className="h-4 w-64 rounded-md bg-muted animate-pulse"></div>
      </div>

      <div className="flex flex-col w-full">
        {/* Profile Form Skeleton */}
        <div className="w-full max-w-4xl mx-auto bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="h-6 w-40 rounded bg-muted animate-pulse mb-6"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar Skeleton */}
            <div className="h-24 w-24 rounded-full bg-muted animate-pulse shrink-0"></div>
            
            {/* Form Fields Skeleton */}
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><div className="h-4 w-20 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
                <div className="space-y-2"><div className="h-4 w-20 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
              </div>
              <div className="space-y-2"><div className="h-4 w-20 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
              <div className="pt-2"><div className="h-10 w-32 rounded-md bg-muted animate-pulse"></div></div>
            </div>
          </div>
        </div>
        
        {/* Divider Skeleton */}
        <div className="h-px w-full max-w-4xl mx-auto bg-border my-8" />
        
        {/* Password Form Skeleton */}
        <div className="w-full max-w-4xl mx-auto bg-card rounded-xl border border-border p-6 shadow-sm">
           <div className="h-6 w-48 rounded bg-muted animate-pulse mb-6"></div>
           <div className="space-y-4 max-w-md">
             <div className="space-y-2"><div className="h-4 w-32 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
             <div className="space-y-2"><div className="h-4 w-32 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
             <div className="space-y-2"><div className="h-4 w-32 rounded bg-muted"></div><div className="h-10 w-full rounded-md bg-muted animate-pulse"></div></div>
             <div className="pt-2"><div className="h-10 w-32 rounded-md bg-muted animate-pulse"></div></div>
           </div>
        </div>
      </div>
    </div>
  );
}
