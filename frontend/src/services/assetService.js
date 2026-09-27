import axiosClient from "../api/axiosClient";

// Empty filters are sent as undefined so axios leaves them out of the query.
export const getAssets = async ({
    page = 0,
    size = 10,
    search,
    status,
    categoryId,
    warranty
} = {}) => {

    const response =
        await axiosClient.get(
            "/assets",
            {
                params: {
                    page,
                    size,
                    search: search || undefined,
                    status: status || undefined,
                    categoryId: categoryId || undefined,
                    warranty: warranty || undefined
                }
            }
        );

    return response.data;
};

export const createAsset = async (
    assetData
) => {

    const response =
        await axiosClient.post(
            "/assets",
            assetData
        );

    return response.data;
};

export const updateAsset = async (
    id,
    assetData
) => {

    const response =
        await axiosClient.put(
            `/assets/${id}`,
            assetData
        );

    return response.data;
};

export const setAssetAvailable =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/assets/${id}/available`
            );

        return response.data;
    };

export const setAssetRepair =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/assets/${id}/repair`
            );

        return response.data;
    };

export const setAssetRetired =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/assets/${id}/retire`
            );

        return response.data;
    };

export const setAssetLost =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/assets/${id}/lost`
            );

        return response.data;
    };

export const setAssetBroken =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/assets/${id}/broken`
            );

        return response.data;
    };