import axiosClient from "../api/axiosClient";

export const getEmployees = async (
    page = 0,
    size = 10
) => {

    const response =
        await axiosClient.get(
            `/employees?page=${page}&size=${size}`
        );

    return response.data;
};