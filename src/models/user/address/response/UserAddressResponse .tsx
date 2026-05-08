export interface UserAddressResponse {
    success: boolean;
    message: string;
    data: UserAddressData;
}

export interface UserAddressData {
    userId: string;
    name: string;
    email: string;
    phone: string;
    houseNo: string;
    area: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude: number | null;
    longitude: number | null;
}