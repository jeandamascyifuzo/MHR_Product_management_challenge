import React from "react";
import { Smartphone } from "lucide-react";

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
          <div className="h-10 w-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all">
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
              className={`h-2 rounded-full ${
                config.dot === "bg-green-500"
                  ? "bg-green-500"
                  : config.dot === "bg-yellow-500"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
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

export default TableRow;
