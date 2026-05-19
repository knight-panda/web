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

const AdminDashboard = () => {

    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const {
        analytics,
        fetchAnalytics,
        loading,
        error
    } = useStoreAnalytics();

    const {
        fetchAdminProfile,
        updateAdminProfile,
        data,
        adminProfileloading,
    } = useAdminProfile();

    useEffect(() => {
        fetchAnalytics(30);

    }, []);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const res =
                    await fetchAdminProfile();

                setName(res.data.name || "");

                setProfile(
                    res.data.profile || ""
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchData();

    }, []);

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

                    <button className="icon-btn">
                        📅 Date
                    </button>

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
                        Last 30 Days Revenue
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
                        Last 30 Days Orders
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
                        Last 30 Days Visitors
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
                        Last 30 Days Customers
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