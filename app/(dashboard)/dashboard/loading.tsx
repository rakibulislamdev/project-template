export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 rounded-md bg-muted animate-pulse"></div>
        <div className="h-4 w-72 rounded-md bg-muted animate-pulse"></div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm h-32">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 rounded bg-muted animate-pulse"></div>
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-8 w-16 rounded bg-muted animate-pulse"></div>
              <div className="h-3 w-32 rounded bg-muted animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6 h-[400px] animate-pulse">
          <div className="h-6 w-32 rounded bg-muted mb-4"></div>
          <div className="h-full w-full rounded bg-muted/50"></div>
        </div>
        <div className="col-span-3 rounded-xl border border-border bg-card p-6 h-[400px] animate-pulse">
          <div className="h-6 w-48 rounded bg-muted mb-4"></div>
          <div className="h-full w-full rounded bg-muted/50"></div>
        </div>
      </div>
      
      {/* Recent Activity Skeleton */}
      <div className="rounded-xl border border-border bg-card p-6 h-[300px] animate-pulse">
         <div className="h-6 w-40 rounded bg-muted mb-6"></div>
         <div className="space-y-4">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-muted"></div>
               <div className="space-y-2 flex-1">
                 <div className="h-4 w-1/4 rounded bg-muted"></div>
                 <div className="h-3 w-1/2 rounded bg-muted"></div>
               </div>
             </div>
           ))}
         </div>
      </div>
      
    </div>
  );
}
