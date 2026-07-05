import axiosClient from "../api/axiosClient";

export const getDepartments = async (
    page = 0,
    size = 10
) => {

    const response =
        await axiosClient.get(
            `/departments?page=${page}&size=${size}`
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