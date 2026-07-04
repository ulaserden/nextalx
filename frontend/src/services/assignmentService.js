import axiosClient from "../api/axiosClient";

export const getAssignments = async (
    page = 0,
    size = 10
) => {

    const response = await axiosClient.get(
        `/assignments?page=${page}&size=${size}`
    );

    return response.data;
};