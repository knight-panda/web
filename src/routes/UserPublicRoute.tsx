// routes/UserPublicRoute.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const UserPublicRoute = ({ children }: Props) => {
    const storeTokens = JSON.parse(
        localStorage.getItem("storeTokens") || "{}"
    );

    const activeStoreId =
        localStorage.getItem("activeStoreId");

    const token =
        storeTokens[activeStoreId || ""];

    // ✅ already logged in
    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default UserPublicRoute;