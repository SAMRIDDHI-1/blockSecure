import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Shield, Hash, Users, FileText, Zap, CheckCircle } from 'lucide-react';
import { BlockchainService } from '../services/blockchainService';

export const Stats: React.FC = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    verifiedFiles: 0,
    totalTransactions: 0,
    confirmedTransactions: 0,
    totalUsers: 1,
    avgVerificationTime: 2.3
  });

  useEffect(() => {
    const updateStats = () => {
      const fileRecords = BlockchainService.getFileRecords();
      const transactions = BlockchainService.getTransactions();

      setStats({
        totalFiles: fileRecords.length,
        verifiedFiles: fileRecords.filter(f => f.verified).length,
        totalTransactions: transactions.length,
        confirmedTransactions: transactions.filter(t => t.status === 'confirmed').length,
        totalUsers: 1,
        avgVerificationTime: 2.3 + Math.random() * 0.5
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: FileText,
      label: 'Total Files',
      value: stats.totalFiles.toLocaleString(),
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: CheckCircle,
      label: 'Verified Files',
      value: stats.verifiedFiles.toLocaleString(),
      change: '+8%',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Hash,
      label: 'Transactions',
      value: stats.totalTransactions.toLocaleString(),
      change: '+15%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Shield,
      label: 'Confirmed',
      value: stats.confirmedTransactions.toLocaleString(),
      change: '+10%',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+5%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Zap,
      label: 'Avg Verification',
      value: `${stats.avgVerificationTime.toFixed(1)}s`,
      change: '-3%',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">System Statistics</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className={`inline-flex items-center justify-center w-8 h-8 ${item.bgColor} rounded-lg`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.change.startsWith('+') 
                  ? 'text-green-600 bg-green-100' 
                  : 'text-red-600 bg-red-100'
              }`}>
                {item.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-600">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">Network Status: Healthy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">Block Height: {(1000000 + stats.totalTransactions).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};