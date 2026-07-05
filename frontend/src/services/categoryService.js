import axiosClient from "../api/axiosClient";

export const getCategories = async (
    page = 0,
    size = 10
) => {

    const response =
        await axiosClient.get(
            `/categories?page=${page}&size=${size}`
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
        await axiosClient.put(
            `/categories/${id}/activate`
        );

    return response.data;
};

export const deactivateCategory = async (
    id
) => {

    const response =
        await axiosClient.put(
            `/categories/${id}/deactivate`
        );

    return response.data;
};