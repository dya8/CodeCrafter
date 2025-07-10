import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Phone,
  Home,
  Calendar,
  Navigation,
  FileText
} from 'lucide-react';

const HarithaDashboard = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { t } = useLanguage(); // ✅ t is declared here

  const [selectedPickup, setSelectedPickup] = useState(null);
    useEffect(() => {
    const fetchHarithaUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/collector/${id}`);
        const data = await res.json();
        setUser(data);
        console.log("🟢 Haritha user fetched:", data);
      } catch (err) {
        console.error('Error fetching Haritha user:', err);
      }
    };

    if (id) fetchHarithaUser();
  }, [id]);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  const stats = [
    { label: t('haritha.pending.pickups'), value: '12', icon: Clock, color: 'text-orange-600' },
    { label: t('haritha.completed.today'), value: '8', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Routes', value: '3', icon: Navigation, color: 'text-blue-600' },
    { label: 'Active Hours', value: '6.5', icon: Calendar, color: 'text-purple-600' },
  ];

  const pickupQueue = [
    {
      id: '1',
      householdName: 'Kumar Family',
      address: 'TC 25/1456, Pattom, Thiruvananthapuram',
      wasteType: 'Organic + Plastic',
      priority: 'High',
      estimatedWeight: '5 kg',
      scheduledTime: '10:30 AM',
      phone: '+91 98765 43210',
      status: 'pending'
    },
    {
      id: '2',
      householdName: 'Nair Residence',
      address: 'MG Road, Statue, Thiruvananthapuram',
      wasteType: 'Mixed Waste',
      priority: 'Medium',
      estimatedWeight: '3 kg',
      scheduledTime: '11:00 AM',
      phone: '+91 98765 43211',
      status: 'pending'
    },
    {
      id: '3',
      householdName: 'Sharma House',
      address: 'Kesavadasapuram, Thiruvananthapuram',
      wasteType: 'Organic',
      priority: 'Low',
      estimatedWeight: '2 kg',
      scheduledTime: '11:30 AM',
      phone: '+91 98765 43212',
      status: 'pending'
    },
  ];

  const handleStatusUpdate = (pickupId, newStatus) => {
    // Simulate status update
    alert(`Pickup ${pickupId} marked as ${newStatus}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'Medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'Low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('welcome')}, {user?.name}!
            </h1>
            <p className="text-blue-100 mb-4">
              Ready to make a difference in your community today
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                <span className="font-semibold">Route #3</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">6.5 hours active</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🚛</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
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

      {/* Pickup Queue */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('haritha.pickup.queue')}
          </h2>
          <Truck className="h-6 w-6 text-blue-500" />
        </div>
        <div className="space-y-4">
          {pickupQueue.map((pickup) => (
            <div
              key={pickup.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {pickup.householdName}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(pickup.priority)}`}>
                      {pickup.priority}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      {pickup.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {pickup.phone}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {pickup.scheduledTime}
                      </span>
                      <span>• {pickup.wasteType}</span>
                      <span>• {pickup.estimatedWeight}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(pickup.id, 'in-progress')}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(pickup.id, 'completed')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('haritha.map')}
          </h2>
          <MapPin className="h-6 w-6 text-green-500" />
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Interactive map with pickup locations
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Map integration coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Employment Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('haritha.employment')}
          </h2>
          <FileText className="h-6 w-6 text-purple-500" />
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Join Our Team
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Help us expand our waste management services. Apply to become a Haritha Karma Sena member.
              </p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors">
                Apply Now
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarithaDashboard;