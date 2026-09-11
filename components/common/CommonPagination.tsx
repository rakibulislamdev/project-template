import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CommonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CommonPagination({ currentPage, totalPages, onPageChange }: CommonPaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-end mt-2">
      <Pagination className="justify-end w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={`border-border text-muted-foreground hover:bg-muted transition-colors duration-300 ${
                currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                    : "border-border text-foreground hover:bg-muted cursor-pointer transition-colors duration-300"
                }
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              className={`border-border text-muted-foreground hover:bg-muted transition-colors duration-300 ${
                currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
