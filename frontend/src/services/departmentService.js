import axiosClient from "../api/axiosClient";

// Empty filters are sent as undefined so axios leaves them out of the query.
export const getDepartments = async ({
    page = 0,
    size = 10,
    search,
    status
} = {}) => {

    const response =
        await axiosClient.get(
            "/departments",
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

export const createDepartment =
    async (departmentData) => {

        const response =
            await axiosClient.post(
                "/departments",
                departmentData
            );

        return response.data;
    };

export const updateDepartment =
    async (
        id,
        departmentData
    ) => {

        const response =
            await axiosClient.put(
                `/departments/${id}`,
                departmentData
            );

        return response.data;
    };

export const deactivateDepartment =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/departments/${id}/deactivate`
            );

        return response.data;
    };

export const activateDepartment =
    async (id) => {

        const response =
            await axiosClient.patch(
                `/departments/${id}/activate`
            );

        return response.data;
    };