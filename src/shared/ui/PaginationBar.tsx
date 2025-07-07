import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { useTranslation } from "react-i18next";
import { NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { COMMON_KEYS } from "@/shared/i18n/keys";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common]);

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <Pagination className={className} dir="ltr">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className="cursor-pointer"
            disabled={currentPage === 1}
            text={t(COMMON_KEYS.pagination.previous, {
              ns: NAMESPACE_KEYS.common,
            })}
            aria-label={t(COMMON_KEYS.pagination.previous, {
              ns: NAMESPACE_KEYS.common,
            })}
          />
        </PaginationItem>
        {getPageNumbers().map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={"ellipsis-" + idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationButton
                isActive={page === currentPage}
                onClick={() => onPageChange(Number(page))}
                aria-current={page === currentPage ? "page" : undefined}
                className="cursor-pointer"
                aria-label={`${t(COMMON_KEYS.pagination.page, { ns: NAMESPACE_KEYS.common })} ${page}`}
              >
                {page}
              </PaginationButton>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className="cursor-pointer"
            disabled={currentPage === totalPages}
            text={t(COMMON_KEYS.pagination.next, {
              ns: NAMESPACE_KEYS.common,
            })}
            aria-label={t(COMMON_KEYS.pagination.next, {
              ns: NAMESPACE_KEYS.common,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
