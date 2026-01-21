// App.jsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  Smartphone,
  TrendingUp,
  Menu,
  Bell,
  Search,
  Plus,
  Download,
  Filter,
  Calendar,
  ChevronUp,
  ChevronDown,
  Users,
  DollarSign,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                <Smartphone size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Product Manager System
                </h1>
                <p className="text-xs text-gray-500">Mobile Phone Analytics</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products, brands, models..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 bg-gray-50"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2.5 rounded-xl hover:bg-gray-100 relative transition-all duration-200 group">
                <Bell
                  size={20}
                  className="text-gray-600 group-hover:text-blue-600"
                />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-sm border-r border-gray-200 transition-all duration-300 z-20 ${sidebarOpen ? "w-72" : "w-0"}`}
      >
        {sidebarOpen && (
          <div className="py-8 px-5 overflow-y-auto h-full">
            <div className="mb-8">
              <nav className="space-y-1.5">
                <NavItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                  active={activeView === "dashboard"}
                  onClick={() => setActiveView("dashboard")}
                  count={24}
                />
              </nav>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`pt-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}
      >
        <div className="p-6">
          {activeView === "dashboard" && (
            <Dashboard timeRange={timeRange} setTimeRange={setTimeRange} />
          )}
          {activeView === "products" && <Products />}
          {activeView === "analytics" && <Analytics />}
          {activeView === "teams" && <Teams />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
    }`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`transition-colors ${active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </div>
    {count && (
      <span
        className={`px-2 py-1 rounded-full text-xs font-bold ${
          active
            ? "bg-white/20 text-white"
            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const Dashboard = ({ timeRange, setTimeRange }) => {
  const brandData = [
    { name: "Apple", value: 35, color: "#3B82F6" },
    { name: "Samsung", value: 25, color: "#10B981" },
    { name: "Google", value: 15, color: "#8B5CF6" },
    { name: "OnePlus", value: 12, color: "#EF4444" },
    { name: "Xiaomi", value: 8, color: "#F59E0B" },
    { name: "Others", value: 5, color: "#6B7280" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 42000, profit: 12000 },
    { month: "Feb", revenue: 32000, profit: 8000 },
    { month: "Mar", revenue: 51000, profit: 15000 },
    { month: "Apr", revenue: 38000, profit: 10000 },
    { month: "May", revenue: 45000, profit: 13000 },
    { month: "Jun", revenue: 52000, profit: 16000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Range */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Product Dashboard
          </h2>
          <p className="text-gray-600">
            Real-time insights into your mobile phone inventory and sales
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["week", "month", "quarter", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$189.2K"
          change="+24.5%"
          icon={<DollarSign size={20} />}
          color="blue"
          trend="up"
          description="vs last month"
        />
        <MetricCard
          title="Products Sold"
          value="2,845"
          change="+18.2%"
          icon={<Package size={20} />}
          color="green"
          trend="up"
          description="units this month"
        />
        <MetricCard
          title="Avg. Price"
          value="$899"
          change="+5.3%"
          icon={<TrendingUp size={20} />}
          color="purple"
          trend="up"
          description="per unit"
        />
        <MetricCard
          title="Stock Alert"
          value="5"
          change="+2"
          icon={<Bell size={20} />}
          color="red"
          trend="up"
          description="items need restock"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Revenue & Profit
              </h3>
              <p className="text-sm text-gray-600">Monthly performance</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Distribution Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Market Share</h3>
              <p className="text-sm text-gray-600">By brand percentage</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {brandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Market Share"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Products</h3>
            <p className="text-sm text-gray-600">
              Latest updates in your inventory
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 hover:border-gray-400 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar size={16} />
            <span className="font-medium">Filter by Date</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-4 font-semibold pl-4">Product</th>
                <th className="pb-4 font-semibold">Brand</th>
                <th className="pb-4 font-semibold">Price</th>
                <th className="pb-4 font-semibold">Stock</th>
                <th className="pb-4 font-semibold">Last Updated</th>
                <th className="pb-4 font-semibold pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product, index) => (
                <TableRow key={index} {...product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  change,
  icon,
  color,
  trend,
  description,
}) => {
  const gradientClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-3">
            <div
              className={`flex items-center ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {trend === "up" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              <span className="text-sm font-semibold ml-1">{change}</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">{description}</span>
          </div>
        </div>
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${gradientClasses[color]} text-white shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ product, brand, price, stock, updated, status }) => {
  const statusConfig = {
    active: {
      bg: "bg-green-100",
      text: "text-green-800",
      dot: "bg-green-500",
      label: "Active",
    },
    low: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
      label: "Low Stock",
    },
    out: {
      bg: "bg-red-100",
      text: "text-red-800",
      dot: "bg-red-500",
      label: "Out of Stock",
    },
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <tr className="border-b last:border-0 hover:bg-gray-50 transition-colors group">
      <td className="py-4 pl-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all">
            <Smartphone size={18} className="text-gray-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{product}</div>
            <div className="text-xs text-gray-500">
              SKU: {product.replace(/\s/g, "").toLowerCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4">
        <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
          {brand}
        </span>
      </td>
      <td className="py-4">
        <div className="font-bold text-gray-900">{price}</div>
      </td>
      <td className="py-4">
        <div className="flex items-center">
          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
            <div
              className={`h-2 rounded-full ${config.dot === "bg-green-500" ? "bg-green-500" : config.dot === "bg-yellow-500" ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${Math.min((stock / 50) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="font-semibold">{stock}</span>
        </div>
      </td>
      <td className="py-4">
        <div className="text-gray-600">{updated}</div>
      </td>
      <td className="py-4 pr-4">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${config.dot} mr-2`}></div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
          >
            {config.label}
          </span>
        </div>
      </td>
    </tr>
  );
};

// Placeholder components for other views
const Products = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
    <p className="text-gray-600">Product management view coming soon...</p>
  </div>
);

const Analytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
    <p className="text-gray-600">Detailed analytics coming soon...</p>
  </div>
);

const Teams = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
    <p className="text-gray-600">Team management view coming soon...</p>
  </div>
);

// Sample Data
const recentProducts = [
  {
    product: "iPhone 15 Pro Max",
    brand: "Apple",
    price: "$1,199",
    stock: "45",
    updated: "2 hours ago",
    status: "active",
  },
  {
    product: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: "$1,299",
    stock: "32",
    updated: "5 hours ago",
    status: "active",
  },
  {
    product: "Pixel 8 Pro",
    brand: "Google",
    price: "$999",
    stock: "12",
    updated: "1 day ago",
    status: "low",
  },
  {
    product: "OnePlus 12",
    brand: "OnePlus",
    price: "$799",
    stock: "0",
    updated: "2 days ago",
    status: "out",
  },
  {
    product: "Xperia 5 V",
    brand: "Sony",
    price: "$899",
    stock: "15",
    updated: "3 days ago",
    status: "active",
  },
  {
    product: "Nothing Phone 2",
    brand: "Nothing",
    price: "$599",
    stock: "28",
    updated: "1 week ago",
    status: "active",
  },
];

export default App;
