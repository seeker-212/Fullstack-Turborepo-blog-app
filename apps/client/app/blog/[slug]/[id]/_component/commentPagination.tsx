import { calculatePageNumbers } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type Props = {
  totalPages: number;
  currentPages: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

const CommentPagination = ({
  pageNeighbors = 2,
  currentPages,
  totalPages,
  setCurrentPage,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPages,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={cn(className, "flex items-center justify-center gap-2")}>
      {currentPages !== 1 && (
        <button
          onClick={() => handleClick(currentPages - 1)}
          className={cn("rounded-md bg-slate-200 px-2 py-2")}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          onClick={() => handleClick(page)}
          key={index}
          disabled={page === "..."}
          className={cn("px-3 py-1 rounded-md transition hover:text-sky-600", {
            "bg-slate-200": currentPages !== page && page !== "...",
            "bg-blue-500 text-white": currentPages === page,
            "cursor-not-allowed": page === "...",
          })}
        >
          {page === "..." ? "..." : <span>{page}</span>}
        </button>
      ))}

      {/* NEXT PAGE BUTTON */}
      {currentPages !== totalPages && (
        <button
          onClick={() => handleClick(currentPages + 1)}
          className="rounded-md bg-slate-200 px-2 py-2"
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
};

export default CommentPagination;
