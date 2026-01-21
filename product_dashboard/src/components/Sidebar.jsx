import React from "react";
import NavItem from "./NavItem";
import { LayoutDashboard } from "lucide-react";

const Sidebar = ({ sidebarOpen, activeView, setActiveView }) => {
  if (!sidebarOpen) return null;

  return (
    <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-sm border-r border-gray-200 w-72 transition-all duration-300 z-20">
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
    </aside>
  );
};

export default Sidebar;
