"use client";
import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:ml-72">
        <Header activeTab={activeTab} setIsOpen={setSidebarOpen} />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
