import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./AdminDashboard.css";
import { useStoreAnalytics } from "../../../hooks/admin/adminStoreAnalytics/useAdminStoreAnalytics";
import { useAdminProfile } from "../../../hooks/admin/auth/useAdminProfile";
import { useAdminStoreDomain } from "../../../hooks/admin/storeDomain/useAdminStoreDomain";

const AdminDashboard = () => {

    const [selectedPeriod, setSelectedPeriod] = useState(30);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [profile, setProfile] = useState("");
    const periodLabel =
        selectedPeriod === 7
            ? "Last 7 Days"
            : selectedPeriod === 30
                ? "Last 30 Days"
                : selectedPeriod === 90
                    ? "Last 90 Days"
                    : "Last 1 Year";
    const {
        analytics,
        fetchAnalytics,
        loading,
        error
    } = useStoreAnalytics();

    const {
        fetchAdminProfile,
        data,
    } = useAdminProfile();

    const {
        fetchStoreDomain,
    } = useAdminStoreDomain();

    useEffect(() => {
        fetchAnalytics(selectedPeriod);
    }, [selectedPeriod]);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const res =
                    await fetchAdminProfile();

                setProfile(
                    res.data.profile || ""
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchData();

    }, []);

    // ==============================
    // VIEW STORE
    // ==============================
    const handleViewStore = async () => {

        try {

            const response =
                await fetchStoreDomain();

            const storeData =
                response.data;

            if (!storeData) {

                alert("Store information not found");

                return;
            }


            const domain =
                storeData.domain?.trim();

            const subdomain =
                storeData.subdomain?.trim();


            let storeUrl = "";


            // ==============================
            // CUSTOM DOMAIN
            // ==============================

            if (domain) {

                storeUrl =
                    domain.startsWith("http://") ||
                        domain.startsWith("https://")
                        ? domain
                        : `https://${domain}`;

            }


            // ==============================
            // SUBDOMAIN
            // ==============================

            else if (subdomain) {

                storeUrl =
                    `https://${subdomain}.crazoweb.com`;

            }


            // ==============================
            // NOTHING FOUND
            // ==============================

            else {

                alert(
                    "Your store domain is not configured yet."
                );

                return;
            }


            // Open store in new tab
            window.open(
                storeUrl,
                "_blank",
                "noopener,noreferrer"
            );


        } catch (error) {

            console.error(
                "Failed to open store:",
                error
            );

            alert(
                "Unable to open your store"
            );
        }

    };

    const totalRevenue =
        analytics.reduce(
            (sum, item) =>
                sum + item.revenue,
            0
        );

    const totalOrders =
        analytics.reduce(
            (sum, item) =>
                sum + item.orders,
            0
        );

    const totalVisitors =
        analytics.reduce(
            (sum, item) =>
                sum + item.visitors,
            0
        );

    const totalCustomers =
        analytics.reduce(
            (sum, item) =>
                sum + item.customers,
            0
        );

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="admin-dashboard">

            {/* Header */}
            <div className="dashboard-header">

                <div>
                    <div className="ad-user-name">
                        Welcome Back.
                    </div>

                    <div className="ad-user-subtitle">
                        Welcome to the Dashboard
                    </div>
                </div>

                <div className="header-right">

                    <button
                        className="dashboard-view-store-btn"
                        onClick={handleViewStore}>
                        View Your Store
                    </button>

                    <div className="date-filter">

                        <button
                            className="icon-btn date-filter-btn"
                            onClick={() =>
                                setShowDateDropdown((prev) => !prev)
                            }
                        >
                            📅
                            <span>
                                {selectedPeriod === 7 && "7 Days"}
                                {selectedPeriod === 30 && "30 Days"}
                                {selectedPeriod === 90 && "90 Days"}
                                {selectedPeriod === 360 && "1 Year"}
                            </span>

                            <span className="date-arrow">
                                {showDateDropdown ? "▲" : "▼"}
                            </span>
                        </button>


                        {showDateDropdown && (

                            <div className="date-dropdown">

                                <button
                                    className={selectedPeriod === 7 ? "active" : ""}
                                    onClick={() => {
                                        setSelectedPeriod(7);
                                        setShowDateDropdown(false);
                                    }}
                                >
                                    7 Days
                                </button>

                                <button
                                    className={selectedPeriod === 30 ? "active" : ""}
                                    onClick={() => {
                                        setSelectedPeriod(30);
                                        setShowDateDropdown(false);
                                    }}
                                >
                                    30 Days
                                </button>

                                <button
                                    className={selectedPeriod === 90 ? "active" : ""}
                                    onClick={() => {
                                        setSelectedPeriod(90);
                                        setShowDateDropdown(false);
                                    }}
                                >
                                    90 Days
                                </button>

                                <button
                                    className={selectedPeriod === 360 ? "active" : ""}
                                    onClick={() => {
                                        setSelectedPeriod(360);
                                        setShowDateDropdown(false);
                                    }}
                                >
                                    1 Year
                                </button>

                            </div>

                        )}

                    </div>

                    <div className="profile">

                        <img
                            src={
                                profile ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="Profile"
                            className="ad-profile-img"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                            }}
                        />

                        <div>
                            <div className="profile-name">
                                {data?.data.name}
                            </div>

                            <span className="profile-role">
                                Admin
                            </span>
                        </div>

                    </div>

                </div>

            </div>

            {/* Stats */}
            <div className="stats-grid">

                {/* Revenue */}
                <div className="card">

                    <div className="card-header">

                        <span>
                            Total Revenue
                        </span>

                    </div>

                    <h3>
                        ₹ {totalRevenue.toFixed(2)}
                    </h3>

                    <p className="card-sub">
                        {periodLabel} Revenue
                    </p>

                </div>

                {/* Orders */}
                <div className="card">

                    <div className="card-header">

                        <span>
                            Total Orders
                        </span>

                    </div>

                    <h3>
                        {totalOrders}
                    </h3>

                    <p className="card-sub">
                        {periodLabel} Orders
                    </p>

                </div>

                {/* Visitors */}
                <div className="card">

                    <div className="card-header">

                        <span>
                            Total Visitors
                        </span>

                    </div>

                    <h3>
                        {totalVisitors}
                    </h3>

                    <p className="card-sub">
                        {periodLabel} Visitors
                    </p>

                </div>

                {/* Customers */}
                <div className="card">

                    <div className="card-header">

                        <span>
                            Total Customers
                        </span>

                    </div>

                    <h3>
                        {totalCustomers}
                    </h3>

                    <p className="card-sub">
                        {periodLabel} Customers
                    </p>

                </div>

            </div>

            {/* Chart Section */}
            <div className="chart-card">

                <div className="card-header">

                    <span>
                        Transaction Activity
                    </span>

                    <span>⋮</span>

                </div>

                <div
                    className="chart-placeholder"
                    style={{
                        width: "100%",
                        height: "350px"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={analytics}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis
                                yAxisId="left"
                                domain={[0, (dataMax: number) => dataMax + 1]}
                            />

                            <Tooltip />

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="customers"
                                stroke="#8884d8"
                                strokeWidth={3}
                                dot={false}
                            />

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="orders"
                                stroke="#82ca9d"
                                strokeWidth={3}
                                dot={false}
                            />

                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="visitors"
                                stroke="#ff7300"
                                strokeWidth={3}
                                dot={false}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* Analytics Table */}
            <div className="table-card">

                <div className="card-header">

                    <span>
                        Daily Analytics
                    </span>

                    <span>⋮</span>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Visitors</th>

                            <th>Orders</th>

                            <th>Customers</th>

                            <th>Revenue</th>

                            <th>Profit</th>

                        </tr>

                    </thead>

                    <tbody>

                        {analytics.map((item) => (

                            <tr
                                key={
                                    item.dailyAnalyticsId
                                }
                            >

                                <td>
                                    {item.date}
                                </td>

                                <td>
                                    {item.visitors}
                                </td>

                                <td>
                                    {item.orders}
                                </td>

                                <td>
                                    {item.customers}
                                </td>

                                <td>
                                    ₹ {item.revenue}
                                </td>

                                <td>
                                    ₹ {item.profit}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminDashboard;