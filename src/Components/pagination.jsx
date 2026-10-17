"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@heroui/react";

export default function Pagination({ totalPages, currentPage, status, basePath }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage) => {
    startTransition(() => {
      // basePath ব্যবহার করে ইউআরএল-টি ডাইনামিক করা হলো
      router.push(`${basePath}?status=${status}&page=${newPage}`, { scroll: false });
    });
  };

  return (
    <div className={`flex justify-center items-center gap-4 mt-8 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      <Button 
        isDisabled={currentPage <= 1 || isPending}
        variant="flat"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <span className="text-sm font-medium text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button 
        isDisabled={currentPage >= totalPages || isPending}
        variant="flat"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
