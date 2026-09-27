import {
    useCallback,
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";

/**
 * Loads one record by id for a detail page.
 *
 * Returns `{ record, notFound, loading, reload }`. A 404 (or a 400 for a
 * malformed id) sets `notFound` instead of showing an error toast. Like
 * useServerList, a response for an id the page has already moved away from
 * is ignored.
 */
function useRecord(
    fetchRecord,
    id,
    errorMessage
) {

    const [version, setVersion] =
        useState(0);

    const requestKey =
        `${id}|${version}`;

    const [result, setResult] =
        useState({
            key: null,
            record: null,
            notFound: false
        });

    useEffect(() => {

        let ignore = false;

        fetchRecord(id)
            .then((record) => {

                if (!ignore) {

                    setResult({
                        key: requestKey,
                        record,
                        notFound: false
                    });
                }
            })
            .catch((error) => {

                if (ignore) {
                    return;
                }

                const status =
                    error?.response?.status;

                const notFound =
                    status === 404 ||
                    status === 400;

                if (!notFound) {

                    toast.error(
                        error?.userMessage ||
                        errorMessage
                    );
                }

                setResult({
                    key: requestKey,
                    record: null,
                    notFound
                });
            });

        return () => {
            ignore = true;
        };

    }, [
        fetchRecord,
        id,
        requestKey,
        errorMessage
    ]);

    const reload =
        useCallback(
            () => setVersion((v) => v + 1),
            []
        );

    // Keep showing the previous record while a reload for the same id is in
    // flight, so the page does not flash back to a spinner.
    const sameId =
        result.key?.startsWith(`${id}|`);

    return {
        record: sameId ? result.record : null,
        notFound: sameId && result.notFound,
        loading: result.key !== requestKey,
        reload
    };
}

export default useRecord;
