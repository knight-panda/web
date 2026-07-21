export interface AdminResponse {
    success: boolean;
    message: string;
    data: {
        adminId: string;
        storeId: string;
        email: string;
        name: string;
        phone: string;
        profile: string;
    };
}