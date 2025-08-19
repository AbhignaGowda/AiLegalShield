import React, { useState } from 'react';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  // Mock data
  const stats = {
    totalContracts: 24,
    riskySaved: 8,
    moneySaved: 2400,
    avgScore: 7.2
  };

  const recentActivity = [
    { id: 1, action: 'Contract Analyzed', contract: 'Employment Agreement', time: '2 hours ago', risk: 'high' },
    { id: 2, action: 'Report Downloaded', contract: 'Lease Agreement', time: '1 day ago', risk: 'medium' },
    { id: 3, action: 'Contract Shared', contract: 'NDA Document', time: '2 days ago', risk: 'low' },
    { id: 4, action: 'Contract Analyzed', contract: 'Service Contract', time: '3 days ago', risk: 'medium' },
  ];

  const contractTypes = [
    { type: 'Employment', count: 8, percentage: 33 },
    { type: 'Lease', count: 6, percentage: 25 },
    { type: 'NDA', count: 5, percentage: 21 },
    { type: 'Service', count: 3, percentage: 13 },
    { type: 'Other', count: 2, percentage: 8 },
  ];

  const riskTrends = [
    { month: 'Jan', high: 2, medium: 4, low: 2 },
    { month: 'Feb', high: 1, medium: 3, low: 4 },
    { month: 'Mar', high: 3, medium: 2, low: 3 },
    { month: 'Apr', high: 1, medium: 5, low: 2 },
    { month: 'May', high: 1, medium: 2, low: 5 },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your contract analysis overview</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Analyzed</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.totalContracts}</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +12% this month
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Risks Avoided</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.riskySaved}</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +3 this week
                </p>
              </div>
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Money Saved</p>
                <p className="text-3xl font-bold text-white mt-1">${stats.moneySaved.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +$600 this month
                </p>
              </div>
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Avg Safety Score</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.avgScore}/10</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +0.3 improvement
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contract Types Distribution */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Contract Types</h3>
              <div className="space-y-4">
                {contractTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][index]
                      }`}></div>
                      <span className="text-gray-300 font-medium">{type.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{type.count}</span>
                      <span className="text-gray-500 text-sm">({type.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Trends Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Risk Trends</h3>
              <div className="h-64 flex items-end justify-between gap-4">
                {riskTrends.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full max-w-20 space-y-1">
                      <div 
                        className="bg-red-500 rounded-t"
                        style={{ height: `${data.high * 8}px` }}
                        title={`High Risk: ${data.high}`}
                      ></div>
                      <div 
                        className="bg-yellow-500"
                        style={{ height: `${data.medium * 8}px` }}
                        title={`Medium Risk: ${data.medium}`}
                      ></div>
                      <div 
                        className="bg-green-500 rounded-b"
                        style={{ height: `${data.low * 8}px` }}
                        title={`Low Risk: ${data.low}`}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400 text-sm">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-400 text-sm">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-400 text-sm">Low Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-700">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.contract}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getRiskColor(activity.risk)}`}>
                      {activity.risk.toUpperCase()}
                    </span>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;