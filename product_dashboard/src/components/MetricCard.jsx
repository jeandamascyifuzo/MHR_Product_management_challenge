import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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
              className={`flex items-center ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
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
          className={`p-3 rounded-xl bg-linear-to-br ${gradientClasses[color]} text-white shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
