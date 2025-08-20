"use client";
import Layout from "@/component/Layout";

export default function DashboardPage() {
  return (
    <Layout activeTab="Dashboard">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Overview of your contract analyses and activity.</p>

        {/* Example Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">Contracts Analyzed</h2>
            <p className="text-3xl font-bold text-blue-400">42</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">Templates Used</h2>
            <p className="text-3xl font-bold text-green-400">15</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">High-Risk Contracts</h2>
            <p className="text-3xl font-bold text-red-400">3</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
