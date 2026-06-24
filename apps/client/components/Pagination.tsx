import { calculatePageNumbers } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type Props = {
  totalPages: number;
  currentPages: number;
  pageNeighbors?: number;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPages,
  pageNeighbors = 2,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPages,
    totalPages,
  });
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* PREVIOUS PAGE BUTTON */}
      {currentPages !== 1 && (
        <button className={cn("rounded-md bg-slate-200 px-2 py-2")}>
          <Link href={`?page=${currentPages - 1}`}>
            <ChevronLeftIcon className="w-4" />
          </Link>
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn("px-3 py-1 rounded-md transition hover:text-sky-600", {
            "bg-slate-200": currentPages !== page && page !== "...",
            "bg-blue-500 text-white": currentPages === page,
          })}
        >
          {page === "..." ? "..." : <Link href={`?page=${page}`}>{page}</Link>}
        </button>
      ))}

      {/* NEXT PAGE BUTTON */}
      {currentPages !== totalPages && (
        <button className="rounded-md bg-slate-200 px-2 py-2">
          <Link href={`?page=${currentPages + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
