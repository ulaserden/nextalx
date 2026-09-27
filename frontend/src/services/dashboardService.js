import axiosClient from "../api/axiosClient";

export const getDashboardStats = async () => {
    const response = await axiosClient.get(
        "/dashboard/stats"
    );

    return response.data;
};

export const getExpiringWarranties = async (
    limit = 5
) => {
    const response = await axiosClient.get(
        "/dashboard/expiring-warranties",
        {
            params: {
                limit
            }
        }
    );

    return response.data;
};
