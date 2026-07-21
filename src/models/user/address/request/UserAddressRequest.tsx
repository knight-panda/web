export interface UserAddressRequest {
    name: string;
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
