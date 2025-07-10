import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

import { 
  Home, 
  Users, 
  BookOpen, 
  User, 
  Truck, 
  MapPin, 
  FileText, 
  X,
  BarChart3,
  Leaf,
  Trash2,
  Youtube
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const navigate = useNavigate();
const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  

  const familyNavItems = [
  { id: 'dashboard', label: t('nav.home'), icon: Home, route: `/family-dashboard/${user?.id}` },
  { id: 'community', label: t('nav.community'), icon: Users, route: '/community' },
  { id: 'waste', label: t('Manage Waste'), icon: Trash2, route: `/waste/${user?.id}` },
  { id: 'requests', label: t('Pickup Requests'), icon: Truck, route: `/pickup-requests/${user?.id}` },
  { id: 'videos', label: t('Video Lessons'), icon: Youtube, route: '/videos' },
  { id: 'segregation', label: t('Segregate Waste'), icon: BarChart3, route: '/segregation' },
  { id: 'profile', label: t('nav.profile'), icon: User, route: '/profile' } // Coming soon
];


  const harithaNavItems = [
  { id: 'dashboard', label: t('nav.home'), icon: Home, route: `/haritha-dashboard/${user?.id}` },
  { id: 'pickups', label: t('haritha.pickup.queue'), icon: Truck, route: `/pickups` },
  { id: 'map', label: t('haritha.map'), icon: MapPin, route: '/map' },
  { id: 'profile', label: t('nav.profile'), icon: User, route: '/profile' }
];


  const navItems = user?.role === 'Family' ? familyNavItems : harithaNavItems;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                {t('app.title')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.route;

              
              return (
                <button
                  key={item.id}
                  onClick={() => {
  if (item.route) {
    navigate(item.route);
    onClose();
  }
}}

                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          {user && (
  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {user?.name?.charAt(0) || ''}
        </span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {user?.name || 'User'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {user?.role?.replace('-', ' ') || ''}
        </p>
        {user.ecoPoints && (
          <div className="flex items-center mt-1">
            <Leaf className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              {user.ecoPoints} {t('family.eco.points')}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </>
  );
};

export default Sidebar;