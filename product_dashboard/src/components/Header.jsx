import React from "react";
import { Menu, Bell, Search, Smartphone } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-200 z-30 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
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
          <div className="flex items-center space-x-3">
            <button className="p-2.5 rounded-xl hover:bg-gray-100 relative transition-all duration-200 group">
              <Bell
                size={20}
                className="text-gray-600 group-hover:text-blue-600"
              />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="h-10 w-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
