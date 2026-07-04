import axiosClient from "../api/axiosClient";

export const getDepartments = async (
    page = 0,
    size = 10
) => {

    const response = await axiosClient.get(
        `/departments?page=${page}&size=${size}`
    );

    return response.data;
};