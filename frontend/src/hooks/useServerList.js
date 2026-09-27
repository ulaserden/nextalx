import {
    useCallback,
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";

const DEFAULT_PAGE_SIZE = 10;

/**
 * Loads one page of a paginated list endpoint for a MUI DataGrid running in
 * server pagination mode.
 *
 * - `fetchPage` receives `{ ...filters, page, size }` and must resolve to a
 *   Spring `Page` (`content` + `totalElements`). Pass a module-level function
 *   so its identity is stable.
 * - Changing `filters` jumps back to the first page.
 * - Responses that arrive after a newer request was issued are ignored, so
 *   fast typing in a search box never shows stale results.
 *
 * Returns `tableProps` to spread onto the table and `reload()` to refetch
 * the current page after a create / update.
 */
function useServerList(
    fetchPage,
    filters,
    errorMessage
) {

    const filterKey =
        JSON.stringify(filters);

    const [pageState, setPageState] =
        useState({
            filterKey,
            page: 0,
            pageSize: DEFAULT_PAGE_SIZE
        });

    const [version, setVersion] =
        useState(0);

    const [result, setResult] =
        useState({
            key: null,
            rows: [],
            rowCount: 0
        });

    // A page number chosen under different filters no longer applies.
    const page =
        pageState.filterKey === filterKey
            ? pageState.page
            : 0;

    const pageSize =
        pageState.pageSize;

    const requestKey =
        `${filterKey}|${page}|${pageSize}|${version}`;

    useEffect(() => {

        let ignore = false;

        fetchPage({
            ...JSON.parse(filterKey),
            page,
            size: pageSize
        })
            .then((data) => {

                if (!ignore) {

                    setResult({
                        key: requestKey,
                        rows: data.content,
                        rowCount: data.totalElements
                    });
                }
            })
            .catch((error) => {

                if (!ignore) {

                    toast.error(
                        error?.userMessage ||
                        errorMessage
                    );

                    setResult((previous) => ({
                        ...previous,
                        key: requestKey
                    }));
                }
            });

        return () => {
            ignore = true;
        };

    }, [
        fetchPage,
        filterKey,
        page,
        pageSize,
        requestKey,
        errorMessage
    ]);

    const onPaginationModelChange =
        useCallback(
            (model) =>
                setPageState({
                    filterKey,
                    page: model.page,
                    pageSize: model.pageSize
                }),
            [filterKey]
        );

    const reload =
        useCallback(
            () => setVersion((v) => v + 1),
            []
        );

    return {
        tableProps: {
            rows: result.rows,
            rowCount: result.rowCount,
            loading: result.key !== requestKey,
            paginationModel: {
                page,
                pageSize
            },
            onPaginationModelChange
        },
        reload
    };
}

export default useServerList;
