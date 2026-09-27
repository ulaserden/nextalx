import axiosClient from "../api/axiosClient";

// Empty filters are sent as undefined so axios leaves them out of the query.
export const getEmployees = async ({
    page = 0,
    size = 10,
    search,
    status,
    departmentId
} = {}) => {

    const response =
        await axiosClient.get(
            "/employees",
            {
                params: {
                    page,
                    size,
                    search: search || undefined,
                    status: status || undefined,
                    departmentId: departmentId || undefined
                }
            }
        );

    return response.data;
};

export const createEmployee = async (
    employeeData
) => {

    const response =
        await axiosClient.post(
            "/employees",
            employeeData
        );

    return response.data;
};

export const updateEmployee = async (
    id,
    employeeData
) => {

    const response =
        await axiosClient.put(
            `/employees/${id}`,
            employeeData
        );

    return response.data;
};

export const deactivateEmployee =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/employees/${id}/deactivate`
            );

        return response.data;
    };

export const activateEmployee =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/employees/${id}/activate`
            );

        return response.data;
    };