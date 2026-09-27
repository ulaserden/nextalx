import axiosClient from "../api/axiosClient";

// Empty filters are sent as undefined so axios leaves them out of the query.
export const getAssignments = async ({
    page = 0,
    size = 10,
    search,
    status,
    employeeId,
    assetId
} = {}) => {

    const response =
        await axiosClient.get(
            "/assignments",
            {
                params: {
                    page,
                    size,
                    search: search || undefined,
                    status: status || undefined,
                    employeeId: employeeId || undefined,
                    assetId: assetId || undefined
                }
            }
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