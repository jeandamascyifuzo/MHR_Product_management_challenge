import React from "react";

const NavItem = ({ icon, label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
    }`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`transition-colors ${
          active ? "text-white" : "text-gray-400 group-hover:text-gray-600"
        }`}
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

export default NavItem;
