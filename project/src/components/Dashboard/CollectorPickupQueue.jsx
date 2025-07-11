import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const CollectorPickupQueue = () => {
  const { id } = useParams(); // collector ID from URL
  const [requests, setRequests] = useState([]);
  console.log(id)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/collector/${id}/requests`);
        setRequests(res.data);
      } catch (err) {
        console.error("❌ Error fetching collector requests", err);
      }
    };

    fetchRequests();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-emerald-700 text-center">🚛 Assigned Pickup Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pickups assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(req.pickupDate).toLocaleDateString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  req.status === 'assigned'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {req.status.toUpperCase()}
                </span>
              </div>

              <div className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
                <p><strong>Waste Type:</strong> {req.wasteType}</p>
                <p><strong>Amount:</strong> {req.amountKg} kg</p>
                {req.familyId && (
                  <>
                    <p><strong>Family Name:</strong> {req.familyId.name}</p>
                    <p><strong>Address:</strong> {req.familyId.address}</p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectorPickupQueue;