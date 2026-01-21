import React from "react";
import {
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
} from "recharts";
import { DollarSign, Package, TrendingUp, Bell, Calendar } from "lucide-react";
import MetricCard from "./MetricCard";
import TableRow from "./TableRow";

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

  const recentProducts = [
    {
      product: "iPhone 15 Pro Max",
      brand: "Apple",
      price: "RWF 1,199",
      stock: "45",
      updated: "2 hours ago",
      status: "active",
    },
    {
      product: "Galaxy S24 Ultra",
      brand: "Samsung",
      price: "RWF 1,299",
      stock: "32",
      updated: "5 hours ago",
      status: "active",
    },
    {
      product: "Pixel 8 Pro",
      brand: "Google",
      price: "RWF 999",
      stock: "12",
      updated: "1 day ago",
      status: "low",
    },
    {
      product: "OnePlus 12",
      brand: "OnePlus",
      price: "RWF 799",
      stock: "0",
      updated: "2 days ago",
      status: "out",
    },
    {
      product: "Xperia 5 V",
      brand: "Sony",
      price: "RWF 899",
      stock: "15",
      updated: "3 days ago",
      status: "active",
    },
    {
      product: "Nothing Phone 2",
      brand: "Nothing",
      price: "RWF 599",
      stock: "28",
      updated: "1 week ago",
      status: "active",
    },
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
          value="RWF 189.2K"
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
          value="RWF 899"
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
                  tickFormatter={(value) => `RWF ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [`RWF ${value.toLocaleString()}`, ""]}
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

export default Dashboard;
