import axiosClient from "../api/axiosClient";

export const getAssets = async (
    page = 0,
    size = 10
) => {

    const response = await axiosClient.get(
        `/assets?page=${page}&size=${size}`
    );

    return response.data;
};