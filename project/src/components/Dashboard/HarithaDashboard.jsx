

import React, { useState, useEffect  } from 'react';
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
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as Geocode from 'react-geocode';
const GOOGLE_MAPS_API_KEY = 'AIzaSyA8dn8jSR4UFxc6YTqLBvQJ4WSonEm6A2Q';
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 8.5241, // Trivandrum latitude
  lng: 76.9366, // Trivandrum longitude
};
const HarithaDashboard = () => {
  // Initialize Geocode API
  Geocode.setKey(GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage('en');
  Geocode.setRegion('in');

  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedPickup, setSelectedPickup] = useState(null);

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
const [coordinates, setCoordinates] = useState([]);

useEffect(() => {
  const fetchCoords = async () => {
    const results = await Promise.all(
      pickupQueue.map(async (pickup) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              pickup.address
            )}&key=${GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { ...pickup, lat, lng };
          } else {
            console.error(`No results for ${pickup.address}`);
            return null;
          }
        } catch (err) {
          console.error(`Geocoding failed for ${pickup.address}`, err);
          return null;
        }
      })
    );
    setCoordinates(results.filter(Boolean));
  };

  fetchCoords();
}, []);


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
  <div className="h-64 rounded-lg overflow-hidden">
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
        {coordinates.map((pickup, index) => (
          <Marker
            key={index}
            position={{ lat: pickup.lat, lng: pickup.lng }}
            onClick={() => setSelectedPickup(pickup)}
          />
        ))}

        {selectedPickup && (
          <InfoWindow
            position={{ lat: selectedPickup.lat, lng: selectedPickup.lng }}
            onCloseClick={() => setSelectedPickup(null)}
          >
            <div>
              <h4 className="font-semibold">{selectedPickup.householdName}</h4>
              <p className="text-sm">{selectedPickup.address}</p>
              <p className="text-xs">{selectedPickup.wasteType}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  </div>
</div>
 
    
    </div>
  );
};

export default HarithaDashboard;