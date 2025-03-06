import { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
    LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import './Dashboard.css';

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        closed: 0,
        pending: 0,
        customers: 0,
        users: 0
    });

    const [ticketTrend, setTicketTrend] = useState([]);
    const [customerDistribution, setCustomerDistribution] = useState([]);

    useEffect(() => {
        // Fetch tickets for statistics
        fetch("https://crm-app-api-ybms.onrender.com/api/ticket")
            .then(res => res.json())
            .then(tickets => {
                const openTickets = tickets.filter(t => t.status === "New").length;
                const closedTickets = tickets.filter(t => t.status === "Resolved").length;
                const pendingTickets = tickets.filter(t => 
                    t.status === "In Progress" || t.status === "Assigned"
                ).length;

                // Create trend data (example data - replace with real data)
                const trend = [
                    { name: 'Jan', tickets: 4 },
                    { name: 'Feb', tickets: 7 },
                    { name: 'Mar', tickets: 5 },
                    { name: 'Apr', tickets: 8 },
                    { name: 'May', tickets: 12 },
                    { name: 'Jun', tickets: 9 }
                ];

                setTicketTrend(trend);
                setStats(prev => ({
                    ...prev,
                    total: tickets.length,
                    open: openTickets,
                    closed: closedTickets,
                    pending: pendingTickets
                }));
            });

        // Fetch customers
        fetch("https://crm-app-api-ybms.onrender.com/api/customer")
            .then(res => res.json())
            .then(customers => {
                setStats(prev => ({ ...prev, customers: customers.length }));

                // Create customer distribution data
                const distribution = [
                    { name: 'New', value: customers.filter(c => c.status === 'New').length },
                    { name: 'Active', value: customers.filter(c => c.status === 'Accepted').length },
                    { name: 'Inactive', value: customers.filter(c => c.status === 'Rejected').length }
                ];
                setCustomerDistribution(distribution);
            });

        // Fetch users
        fetch("https://crm-app-api-ybms.onrender.com/api/user")
            .then(res => res.json())
            .then(users => {
                setStats(prev => ({ ...prev, users: users.length }));
            });
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="action-buttons">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => window.location.href = '/ticketform'}
                    >
                        New Ticket
                    </button>
                    <button 
                        className="btn btn-success"
                        onClick={() => window.location.href = '/customerform'}
                    >
                        Add Customer
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Tickets</h3>
                    <p className="stat-number">{stats.total}</p>
                </div>
                <div className="stat-card">
                    <h3>Open Tickets</h3>
                    <p className="stat-number text-primary">{stats.open}</p>
                </div>
                <div className="stat-card">
                    <h3>Closed Tickets</h3>
                    <p className="stat-number text-success">{stats.closed}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Tickets</h3>
                    <p className="stat-number text-warning">{stats.pending}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Customers</h3>
                    <p className="stat-number text-info">{stats.customers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number text-secondary">{stats.users}</p>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Ticket Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={ticketTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="tickets" 
                                stroke="#8884d8" 
                                activeDot={{ r: 8 }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Customer Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={customerDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {customerDistribution.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[index % COLORS.length]} 
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Ticket Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                            { name: 'Open', tickets: stats.open },
                            { name: 'Pending', tickets: stats.pending },
                            { name: 'Closed', tickets: stats.closed }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tickets" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
