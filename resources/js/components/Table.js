import React from "react";
import { useTable, usePagination } from "react-table";

export default function Table({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        getTrProps,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize }
    } = useTable(
        {
            getTrProps,
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount
        },
        usePagination
    );

    const [term, setTerm] = React.useState("");

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return (
        <>
            <div className="row d-flex justify-content-between container mb-2 mt-2">
                <div className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        onClick={() =>
                            fetchData({ pageIndex, pageSize, searchTerm: term })
                        }
                    >
                        Search
                    </button>
                </div>
                <div className="pagination justify-content-end mt-0">
                    <button
                        className="page-item page-link"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>{" "}
                    <button
                        className="page-item page-link"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>{" "}
                    <button
                        className="page-item page-link disabled"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>{" "}
                    <button
                        className="page-item page-link"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </button>{" "}
                </div>
            </div>
            <table className="table table-hover" {...getTableProps()}>
                <thead className="table-primary">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) => (
                                <th key={idx}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/*
          Pagination can be built however you'd like.
          This is just a very basic UI implementation:
        */}
            <div className="row d-flex justify-content-between">
                <div>
                    Showing {page.length} of ~{controlledPageCount} results{" "}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pagination justify-content-end mt-0">
                    <button
                        className="page-item page-link"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {"<<"}
                    </button>{" "}
                    <button
                        className="page-item page-link"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {"<"}
                    </button>{" "}
                    <button
                        className="page-item page-link disabled"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        {">"}
                    </button>{" "}
                    <button
                        className="page-item page-link"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </button>{" "}
                </div>
            </div>
        </>
    );
}
