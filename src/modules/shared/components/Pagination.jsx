import Button from "../../shared/components/Button";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mt-6">
      <div className="flex flex-row items-center justify-center w-full gap-2 mt-6 sm:flex-row">
        {totalPages > 1 && (
          <>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Anterior
            </Button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                  <Button
                    variant="secondary"
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={index} className="px-1 text-sm text-gray-400">
                    ...
                  </span>
                )
              )}
            </div>

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Siguiente
            </Button>
          </>
        )}
      </div>
      <div>
        <span className="text-sm text-gray-600">Items por Página </span>
        {pageSize && setPageSize && (
          <select
            value={pageSize}
            onChange={(evt) => {
              setCurrentPage(1);
              setPageSize(Number(evt.target.value));
            }}
            className="text-sm px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Pagination;
