import type { UserAddressRequest } from "../../models/user/address/request/UserAddressRequest";
import type { UserAddressResponse } from "../../models/user/address/response/UserAddressResponse ";
import userApiClient from "../userApiClient";

export const getUserAddress =
    async (): Promise<UserAddressResponse> => {

        const response =
            await userApiClient.get(
                "/user/address"
            );

        return response.data;
    };

export const updateUserAddress =
    async (
        request: UserAddressRequest
    ): Promise<UserAddressResponse> => {

        const response =
            await userApiClient.put(
                "/user/address",
                request
            );

        return response.data;
    };