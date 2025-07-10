import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Users, 
  MessageSquare, 
  TrendingDown, 
  PieChart, 
  Trophy,
  Zap,
  Droplets,
  Trash2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const CommunityDashboard = () => {
  const { t } = useLanguage();

  const usageData = [
    { month: 'Jan', electricity: 450, water: 320 },
    { month: 'Feb', electricity: 420, water: 310 },
    { month: 'Mar', electricity: 380, water: 290 },
    { month: 'Apr', electricity: 340, water: 270 },
    { month: 'May', electricity: 320, water: 250 },
    { month: 'Jun', electricity: 300, water: 230 },
  ];

  const wasteData = [
    { name: 'Organic', value: 45, color: '#10B981' },
    { name: 'Plastic', value: 25, color: '#3B82F6' },
    { name: 'Paper', value: 15, color: '#F59E0B' },
    { name: 'Glass', value: 10, color: '#EF4444' },
    { name: 'Metal', value: 5, color: '#8B5CF6' },
  ];

  const communityLeaderboard = [
    { rank: 1, name: 'Pattom Community', points: 8500, members: 45 },
    { rank: 2, name: 'Kesavadasapuram', points: 7200, members: 38 },
    { rank: 3, name: 'Statue Ward', points: 6800, members: 42 },
    { rank: 4, name: 'MG Road Area', points: 6200, members: 35 },
    { rank: 5, name: 'Vazhuthacaud', points: 5900, members: 29 },
  ];

  const communityStats = [
    { label: 'Active Families', value: '189', icon: Users, color: 'text-blue-600' },
    { label: 'Electricity Saved', value: '2.3 MWh', icon: Zap, color: 'text-yellow-600' },
    { label: 'Water Saved', value: '15.6k L', icon: Droplets, color: 'text-cyan-600' },
    { label: 'Waste Processed', value: '850 kg', icon: Trash2, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('community.dashboard')}
            </h1>
            <p className="text-indigo-100 mb-4">
              Track our collective sustainability impact
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏘️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('community.usage.trends')}
            </h2>
            <TrendingDown className="h-6 w-6 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="electricity" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Electricity (kWh)"
                />
                <Line 
                  type="monotone" 
                  dataKey="water" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  name="Water (L)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('community.waste.distribution')}
            </h2>
            <PieChart className="h-6 w-6 text-purple-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Tooltip />
                <RechartsPieChart.Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart.Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('community.leaderboard')}
          </h2>
          <Trophy className="h-6 w-6 text-amber-500" />
        </div>
        <div className="space-y-4">
          {communityLeaderboard.map((community, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  community.rank === 1 ? 'bg-yellow-500' :
                  community.rank === 2 ? 'bg-gray-400' :
                  community.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                }`}>
                  {community.rank}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {community.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {community.members} families
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  {community.points.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Feedback */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('community.feedback')}
          </h2>
          <MessageSquare className="h-6 w-6 text-blue-500" />
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Share Your Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Help us improve our sustainability initiatives
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Open Feedback Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;