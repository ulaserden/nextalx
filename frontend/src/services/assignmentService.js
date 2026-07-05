import axiosClient from "../api/axiosClient";

export const getAssignments = async (
    page = 0,
    size = 10
) => {

    const response =
        await axiosClient.get(
            `/assignments?page=${page}&size=${size}`
        );

    return response.data;
};

export const createAssignment = async (
    assignmentData
) => {

    const response =
        await axiosClient.post(
            "/assignments",
            assignmentData
        );

    return response.data;
};

export const returnAssignment = async (
    id
) => {

    const response =
        await axiosClient.put(
            `/assignments/${id}/return`
        );

    return response.data;
};