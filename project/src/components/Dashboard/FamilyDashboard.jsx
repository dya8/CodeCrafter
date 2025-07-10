import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Leaf, 
  Upload, 
  Camera, 
  BookOpen, 
  Trophy, 
  TrendingUp,
  Award,
  FileText,
  PieChart,
  Target,
  Calendar
} from 'lucide-react';

const FamilyDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate file upload
      setTimeout(() => {
        setSelectedFile(null);
        alert('File uploaded successfully!');
      }, 1000);
    }
  };

  const ecoMetrics = [
    { label: 'This Month', value: '₹850', change: '+12%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Electricity Saved', value: '15 kWh', change: '+8%', icon: Target, color: 'text-blue-600' },
    { label: 'Water Saved', value: '120 L', change: '+5%', icon: Target, color: 'text-cyan-600' },
    { label: 'Waste Reduced', value: '2.5 kg', change: '+18%', icon: Target, color: 'text-emerald-600' },
  ];

  const quickActions = [
    { 
      title: t('family.upload.bills'), 
      icon: Upload, 
      color: 'from-blue-500 to-blue-600',
      action: 'upload'
    },
    { 
      title: t('family.waste.segregation'), 
      icon: Camera, 
      color: 'from-green-500 to-green-600',
      action: 'camera'
    },
    { 
      title: t('family.education'), 
      icon: BookOpen, 
      color: 'from-purple-500 to-purple-600',
      action: 'education'
    },
    { 
      title: t('family.leaderboard'), 
      icon: Trophy, 
      color: 'from-amber-500 to-amber-600',
      action: 'leaderboard'
    },
  ];

  const leaderboardData = [
    { rank: 1, name: 'Kumar Family', points: 2150, trend: '+15%' },
    { rank: 2, name: 'Nair Family', points: 1980, trend: '+12%' },
    { rank: 3, name: 'Your Family', points: 1250, trend: '+8%' },
    { rank: 4, name: 'Sharma Family', points: 1100, trend: '+5%' },
    { rank: 5, name: 'Menon Family', points: 980, trend: '+3%' },
  ];

  const handleQuickAction = (action) => {
    if (action === 'upload') {
      document.getElementById('file-upload')?.click();
    } else {
      alert(`${action} feature coming soon!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('welcome')}, {user?.name}!
            </h1>
            <p className="text-green-100 mb-4">
              Continue your sustainability journey today
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                <span className="font-semibold">{user?.ecoPoints} {t('family.eco.points')}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-semibold">{user?.badges?.length || 0} {t('family.badges')}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🌱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eco Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ecoMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${metric.color}`} />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {t('family.quick.actions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className={`p-6 rounded-xl bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-transform`}
              >
                <Icon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-sm">
                  {action.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('family.leaderboard')}
          </h2>
          <Trophy className="h-6 w-6 text-amber-500" />
        </div>
        <div className="space-y-4">
          {leaderboardData.map((family, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                family.rank === 3 
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700' 
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  family.rank === 1 ? 'bg-yellow-500' :
                  family.rank === 2 ? 'bg-gray-400' :
                  family.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                }`}>
                  {family.rank}
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    family.rank === 3 ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {family.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {family.points} points
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {family.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Your {t('family.badges')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user?.badges?.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {badge}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
              Energy Saver
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
              Eco Champion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;