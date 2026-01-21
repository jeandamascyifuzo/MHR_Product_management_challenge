import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Sidebar
        sidebarOpen={sidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main
        className={`pt-20 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}
      >
        <div className="p-6">
          <Dashboard timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </main>
    </div>
  );
};

export default App;
