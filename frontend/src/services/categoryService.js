import axiosClient from "../api/axiosClient";

export const getCategories = async (
    page = 0,
    size = 10
) => {

    const response = await axiosClient.get(
        `/asset-categories?page=${page}&size=${size}`
    );

    return response.data;
};