import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  // Gösterilecek sayfa numaralarını hesapla
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    // İlk sayfa her zaman gösterilsin
    pages.push(1);
    
    // Mevcut sayfaya yakın sayfalar
    if (currentPage > 3) {
      pages.push('ellipsis');
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Son sayfaya yakın değilse ellipsis ekle
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }
    
    // Son sayfa (1'den büyükse)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationUI>
      <PaginationPrevious 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
      >    
        Previous
      </PaginationPrevious>
      
      <PaginationContent>
        {pageNumbers.map((page, index) => (
          page === 'ellipsis' ? (
            <PaginationEllipsis key={`ellipsis-${index}`} />
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        ))}
      </PaginationContent>
      
      <PaginationNext
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
      >
        Next
      </PaginationNext>
    </PaginationUI>
  );
}