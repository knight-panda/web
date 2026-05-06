import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const UserProtectedRoute = ({ children }: Props) => {
    const storeTokens = JSON.parse(
        localStorage.getItem("storeTokens") || "{}"
    );

    const activeStoreId =
        localStorage.getItem("activeStoreId");

    const token =
        storeTokens[activeStoreId || ""];

    // ❌ no token
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default UserProtectedRoute;