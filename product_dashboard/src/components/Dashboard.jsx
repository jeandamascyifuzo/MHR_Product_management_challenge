import React, { useEffect, useState } from "react";
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
import { DollarSign, Package, TrendingUp, Bell } from "lucide-react";
import MetricCard from "./MetricCard";
import TableRow from "./TableRow";
import { brandData, recentProducts, revenueData } from "../assets/data/Data";

const Dashboard = () => {
  /* ================= LOADING STATE ================= */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Product Dashboard
          </h2>
          <p className="text-gray-600">
            Real-time insights into your mobile phone inventory and sales
          </p>
        </div>
      </div>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
          </>
        ) : (
          <>
            {/* Revenue & Profit */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" />
                    <Area dataKey="profit" stroke="#10B981" fill="#10B981" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Brand Distribution Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Market Share
                  </h3>
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
          </>
        )}
      </div>

      {/* ================= TABLE ================= */}
      {!loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
      )}
    </div>
  );
};

export default Dashboard;
