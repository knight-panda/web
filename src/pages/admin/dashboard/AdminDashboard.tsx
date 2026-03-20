import "./AdminDashboard.css"

const AdminDashboard = () => {

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <div>Welcome Back, Gulraiz.</div>
                    <p className="subtitle">Welcome to the Dashboard</p>
                </div>

                <div className="header-right">
                    <button className="icon-btn">📅 Date</button>
                    <button className="export-btn">⬇ Export</button>

                    <div className="profile">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="profile-img"
                        />
                        <div>
                            <p className="profile-name">Gulraiz Khan</p>
                            <span className="profile-role">Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="search-bar">
                <input type="text" placeholder="Search" />
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="card">
                    <div className="card-header">
                        <span>Total Revenue</span>
                        <span className="badge positive">+12%</span>
                    </div>
                    <h3>$ 25,334</h3>
                    <p className="card-sub">From Jan 01, 2024 - March 30, 2024</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span>Avg. Order Value</span>
                        <span className="badge negative">+12%</span>
                    </div>
                    <h3>5,634</h3>
                    <p className="card-sub">From Jan 01, 2024 - March 30, 2024</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span>Total Shipment</span>
                        <span className="badge positive">+12%</span>
                    </div>
                    <h3>5,334</h3>
                    <p className="card-sub">From Jan 01, 2024 - March 30, 2024</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="chart-card">
                <div className="card-header">
                    <span>Transaction Activity</span>
                    <span>⋮</span>
                </div>
                <div className="chart-placeholder">
                    <p>Chart goes here</p>
                </div>
            </div>

            {/* Customer Table */}
            <div className="table-card">
                <div className="card-header">
                    <span>Customer Details</span>
                    <span>⋮</span>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Purchase</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>#3066</td>
                            <td>
                                <div className="customer-cell">
                                    <img src="https://i.pravatar.cc/35?img=1" alt="" />
                                    <div>
                                        <p>Krystal Beer</p>
                                        <span>example@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>Jan 6, 2022</td>
                            <td><span className="status paid">Paid</span></td>
                            <td>Monthly subscription</td>
                            <td>
                                <button className="link-btn">Delete</button>
                                <button className="link-btn edit">Edit</button>
                            </td>
                        </tr>

                        <tr>
                            <td>#3065</td>
                            <td>
                                <div className="customer-cell">
                                    <img src="https://i.pravatar.cc/35?img=2" alt="" />
                                    <div>
                                        <p>Mr. Tanya</p>
                                        <span>hotmail@gmail.com</span>
                                    </div>
                                </div>
                            </td>
                            <td>Jan 6, 2022</td>
                            <td><span className="status paid">Paid</span></td>
                            <td>Monthly subscription</td>
                            <td>
                                <button className="link-btn">Delete</button>
                                <button className="link-btn edit">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard