import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Truck, MapPin, Clock, CheckCircle,
  Phone, Home, Calendar, Navigation
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA8dn8jSR4UFxc6YTqLBvQJ4WSonEm6A2Q';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 8.5241,
  lng: 76.9366,
};

const HarithaDashboard = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [pickupQueue, setPickupQueue] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState(null);

  useEffect(() => {
    const fetchHarithaUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/collector/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching Haritha user:', err);
      }
    };

    const fetchPickupRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/collector/${id}/requests`);
        setPickupQueue(res.data);
      } catch (err) {
        console.error("❌ Error fetching collector requests", err);
      }
    };

    if (id) {
      fetchHarithaUser();
      fetchPickupRequests();
    }
  }, [id]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const results = await Promise.all(
        pickupQueue.map(async (pickup) => {
          const address = pickup.familyId?.address;
          if (!address) return null;

          try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
            const data = await res.json();
            if (data?.results?.length > 0) {
              const { lat, lng } = data.results[0].geometry.location;
              return {
                lat,
                lng,
                address,
                name: pickup.familyId?.name,
                wasteType: pickup.wasteType,
              };
            }
          } catch (err) {
            console.error(`Geocoding failed for ${address}`, err);
            return null;
          }
        })
      );
      setCoordinates(results.filter(Boolean));
    };

    if (pickupQueue.length > 0) fetchCoordinates();
  }, [pickupQueue]);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  const stats = [
    { label: t('haritha.pending.pickups'), value: '12', icon: Clock, color: 'text-orange-600' },
    { label: t('haritha.completed.today'), value: '8', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Routes', value: '3', icon: Navigation, color: 'text-blue-600' },
    { label: 'Active Hours', value: '6.5', icon: Calendar, color: 'text-purple-600' },
  ];

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
            <p className="text-blue-100 mb-4">Ready to make a difference in your community today</p>
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Pickup Queue */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('haritha.pickup.queue')}</h2>
          <Truck className="h-6 w-6 text-blue-500" />
        </div>
        {pickupQueue.length === 0 ? (
          <p className="text-center text-gray-500">No pickups assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {pickupQueue.map((pickup) => (
              <div
                key={pickup._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {pickup.familyId?.name || 'Unknown Household'}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor('Medium')}`}>
                        {pickup.status === 'collected' ? 'Collected' : 'Assigned'}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        {pickup.familyId?.address || 'No address'}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {pickup.familyId?.phone || 'No phone'}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {pickup.pickupDate ? new Date(pickup.pickupDate).toLocaleTimeString() : 'No time'}
                        </span>
                        <span>• {pickup.wasteType}</span>
                        <span>• {pickup.amountKg} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('haritha.map')}</h2>
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
                    <h4 className="font-semibold">{selectedPickup.name}</h4>
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
