// import React, { useState, useEffect } from 'react';
// import { TrendingUp, Clock, Shield, Hash, Users, FileText, Zap, CheckCircle } from 'lucide-react';
// import { BlockchainService } from '../services/blockchainService';

// export const Stats: React.FC = () => {
//   const [stats, setStats] = useState({
//     totalFiles: 0,
//     verifiedFiles: 0,
//     totalTransactions: 0,
//     confirmedTransactions: 0,
//     totalUsers: 1,
//     avgVerificationTime: 2.3
//   });

//   useEffect(() => {
//     const updateStats = () => {
//       const fileRecords = BlockchainService.getFileRecords();
//       const transactions = BlockchainService.getTransactions();

//       setStats({
//         totalFiles: fileRecords.length,
//         verifiedFiles: fileRecords.filter(f => f.verified).length,
//         totalTransactions: transactions.length,
//         confirmedTransactions: transactions.filter(t => t.status === 'confirmed').length,
//         totalUsers: 1,
//         avgVerificationTime: 2.3 + Math.random() * 0.5
//       });
//     };

//     updateStats();
//     const interval = setInterval(updateStats, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const statItems = [
//     {
//       icon: FileText,
//       label: 'Total Files',
//       value: stats.totalFiles.toLocaleString(),
//       change: '+12%',
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100'
//     },
//     {
//       icon: CheckCircle,
//       label: 'Verified Files',
//       value: stats.verifiedFiles.toLocaleString(),
//       change: '+8%',
//       color: 'text-green-600',
//       bgColor: 'bg-green-100'
//     },
//     {
//       icon: Hash,
//       label: 'Transactions',
//       value: stats.totalTransactions.toLocaleString(),
//       change: '+15%',
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-100'
//     },
//     {
//       icon: Shield,
//       label: 'Confirmed',
//       value: stats.confirmedTransactions.toLocaleString(),
//       change: '+10%',
//       color: 'text-indigo-600',
//       bgColor: 'bg-indigo-100'
//     },
//     {
//       icon: Users,
//       label: 'Active Users',
//       value: stats.totalUsers.toLocaleString(),
//       change: '+5%',
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-100'
//     },
//     {
//       icon: Zap,
//       label: 'Avg Verification',
//       value: `${stats.avgVerificationTime.toFixed(1)}s`,
//       change: '-3%',
//       color: 'text-cyan-600',
//       bgColor: 'bg-cyan-100'
//     }
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-3">
//           <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
//             <TrendingUp className="w-5 h-5 text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-900">System Statistics</h2>
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-green-600">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           <span>Live Updates</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {statItems.map((item, index) => (
//           <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
//             <div className="flex items-center justify-between mb-2">
//               <div className={`inline-flex items-center justify-center w-8 h-8 ${item.bgColor} rounded-lg`}>
//                 <item.icon className={`w-4 h-4 ${item.color}`} />
//               </div>
//               <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                 item.change.startsWith('+') 
//                   ? 'text-green-600 bg-green-100' 
//                   : 'text-red-600 bg-red-100'
//               }`}>
//                 {item.change}
//               </span>
//             </div>
//             <div className="space-y-1">
//               <p className="text-2xl font-bold text-gray-900">{item.value}</p>
//               <p className="text-xs text-gray-600">{item.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <Clock className="w-4 h-4 text-gray-500" />
//             <span className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Shield className="w-4 h-4 text-green-500" />
//             <span className="text-gray-600">Network Status: Healthy</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Hash className="w-4 h-4 text-blue-500" />
//             <span className="text-gray-600">Block Height: {(1000000 + stats.totalTransactions).toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
      label: 'TOTAL_FILES',
      value: stats.totalFiles.toLocaleString(),
      change: '+12%',
      color: 'text-neon-blue',
      bgColor: 'bg-neon-blue/10',
      borderColor: 'border-neon-blue/30'
    },
    {
      icon: CheckCircle,
      label: 'VERIFIED',
      value: stats.verifiedFiles.toLocaleString(),
      change: '+8%',
      color: 'text-radium-400',
      bgColor: 'bg-radium-400/10',
      borderColor: 'border-radium-400/30'
    },
    {
      icon: Hash,
      label: 'TRANSACTIONS',
      value: stats.totalTransactions.toLocaleString(),
      change: '+15%',
      color: 'text-neon-purple',
      bgColor: 'bg-neon-purple/10',
      borderColor: 'border-neon-purple/30'
    },
    {
      icon: Shield,
      label: 'CONFIRMED',
      value: stats.confirmedTransactions.toLocaleString(),
      change: '+10%',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      borderColor: 'border-cyan-400/30'
    },
    {
      icon: Users,
      label: 'ACTIVE_USERS',
      value: stats.totalUsers.toLocaleString(),
      change: '+5%',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      icon: Zap,
      label: 'AVG_VERIFY',
      value: `${stats.avgVerificationTime.toFixed(1)}s`,
      change: '-3%',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30'
    }
  ];

  return (
    <div className="relative bg-dark-800 rounded-xl border border-dark-700 p-6 glow-border">
      {/* Corner accents */}
      <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
      <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative inline-flex items-center justify-center w-10 h-10 bg-dark-700 rounded-lg glow-border">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-20 rounded-lg"></div>
            <TrendingUp className="w-5 h-5 text-neon-blue" />
          </div>
          <h2 className="text-xl font-bold font-mono text-neon-blue tracking-wider">
            <span className="text-radium-400">{">>"}</span> SYSTEM_STATS
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-radium-400">
          <div className="w-2 h-2 bg-radium-400 rounded-full animate-pulse"></div>
          <span>LIVE_FEED</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statItems.map((item, index) => (
          <div 
            key={index} 
            className={`bg-dark-700 rounded-lg p-3 border ${item.borderColor} hover:shadow-glow-sm transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`inline-flex items-center justify-center w-7 h-7 ${item.bgColor} rounded-md`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                item.change.startsWith('+') 
                  ? 'text-radium-400 bg-radium-400/10' 
                  : 'text-red-400 bg-red-400/10'
              }`}>
                {item.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold font-mono text-white">{item.value}</p>
              <p className="text-xs font-mono text-metal-400 tracking-wider">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-dark-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-metal-400">
            <Clock className="w-3 h-3 text-neon-blue" />
            <span>LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-metal-400">
            <Shield className="w-3 h-3 text-radium-400" />
            <span>NETWORK: <span className="text-radium-400">SECURE</span></span>
          </div>
          <div className="flex items-center space-x-2 text-metal-400">
            <Hash className="w-3 h-3 text-neon-purple" />
            <span>BLOCK: #{(1000000 + stats.totalTransactions).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Bottom corner accents */}
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-purple"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
    </div>
  );
};