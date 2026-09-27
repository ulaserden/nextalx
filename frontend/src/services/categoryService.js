import axiosClient from "../api/axiosClient";

// Empty filters are sent as undefined so axios leaves them out of the query.
export const getCategories = async ({
    page = 0,
    size = 10,
    search,
    status
} = {}) => {

    const response =
        await axiosClient.get(
            "/categories",
            {
                params: {
                    page,
                    size,
                    search: search || undefined,
                    status: status || undefined
                }
            }
        );

    return response.data;
};

export const createCategory = async (
    categoryData
) => {

    const response =
        await axiosClient.post(
            "/categories",
            categoryData
        );

    return response.data;
};

export const updateCategory = async (
    id,
    categoryData
) => {

    const response =
        await axiosClient.put(
            `/categories/${id}`,
            categoryData
        );

    return response.data;
};

export const activateCategory = async (
    id
) => {

    const response =
        await axiosClient.patch(
            `/categories/${id}/activate`
        );

    return response.data;
};

export const deactivateCategory = async (
    id
) => {

    const response =
        await axiosClient.patch(
            `/categories/${id}/deactivate`
        );

    return response.data;
};