import { useEffect, useState } from "react";

import AssetsTable
    from "../features/assets/AssetsTable";

import {
    getAssets
} from "../services/assetService";

function AssetsPage() {

    const [assets, setAssets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    useEffect(() => {

        const fetchAssets =
            async () => {

                try {

                    const response =
                        await getAssets(
                            page,
                            10
                        );

                    setAssets(
                        response.content
                    );

                    setTotalPages(
                        response.totalPages
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchAssets();

    }, [page]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>
                Assets
            </h1>

            <AssetsTable
                assets={assets}
            />

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <button
                    disabled={
                        page === 0
                    }
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </button>

                <span>
                    Page {page + 1} / {totalPages}
                </span>

                <button
                    disabled={
                        page + 1 >= totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default AssetsPage;