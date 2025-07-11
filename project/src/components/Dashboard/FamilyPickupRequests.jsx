import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FamilyPickupRequests = () => {
  const { id } = useParams(); // Using URL id
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/family/${id}/requests`);
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Error fetching requests", err);
      }
    };

    fetchRequests(); // ✅ Always fetch using URL param
  }, [id]);

  return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">📦 Your Pickup Requests</h2>

    {requests.length === 0 ? (
      <p className="text-gray-500 text-center text-sm">No pickup requests yet.</p>
    ) : (
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                <strong>Pickup Date:</strong> {new Date(req.pickupDate).toLocaleDateString()}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full
                ${
                  req.status === 'assigned'
                    ? 'bg-green-100 text-green-800'
                    : req.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }
              `}>
                {req.status.toUpperCase()}
              </span>
            </div>

            <div className="text-sm space-y-1 text-gray-800 dark:text-gray-200">
              <p><strong>Waste Type:</strong> {req.wasteType}</p>
              <p><strong>Amount:</strong> {req.amountKg} kg</p>
              {req.collectorId && (
                <p><strong>Collector:</strong> {req.collectorId.name}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default FamilyPickupRequests;