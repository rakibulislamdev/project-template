import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const recentActivity = [
  { activity: 'Seller "Maria Santos" approved', type: "Seller", time: "2h ago", badgeColor: "bg-green-100 text-green-700" },
  { activity: 'New application from "Raj Patel"', type: "Application", time: "3h ago", badgeColor: "bg-orange-100 text-orange-700" },
  { activity: 'Order #2024-091 completed', type: "Order", time: "4h ago", badgeColor: "bg-blue-100 text-blue-700" },
  { activity: 'Review reported by user', type: "Report", time: "5h ago", badgeColor: "bg-red-100 text-red-700" },
  { activity: 'Food listing "Biryani" published', type: "Listing", time: "6h ago", badgeColor: "bg-green-100 text-green-700" },
];

export function RecentActivity() {
  return (
    <Card className="rounded-xl border-border shadow-sm overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-6 border-b">
        <CardTitle className="text-sm font-bold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[50%] px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity</TableHead>
              <TableHead className="w-[30%] px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</TableHead>
              <TableHead className="px-6 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((item, i) => (
              <TableRow key={i} className="hover:bg-muted/30 border-border last:border-0">
                <TableCell className="font-medium text-xs text-foreground px-6 py-4">{item.activity}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="secondary" className={`border-none rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.badgeColor}`}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground px-6 py-4">{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
