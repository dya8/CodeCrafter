import React, { useState } from 'react';
import { Cpu, Leaf, ShieldPlus, Shirt } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom'; // ✅ Import

const wasteTypes = [
  {
    id: 'ewaste',
    title: 'E-Waste',
    description: 'Old electronics like phones, chargers, laptops.',
    guide: 'Drop off at authorized e-waste centers or e-bins. Do not mix with regular garbage.',
    icon: Cpu,
    color: 'from-purple-500 to-indigo-600',
    showPickup: true,
  },
  {
    id: 'biowaste',
    title: 'Bio-Waste',
    description: 'Food waste, vegetable peels, garden waste, etc.',
    guide: 'Use green bins or compost it. Avoid plastic contamination.',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    showPickup: true,
  },
  {
    id: 'biomedical',
    title: 'Biomedical Waste',
    description: 'Used masks, gloves, syringes, sanitary items.',
    guide: 'Use yellow biomedical bags. Hand over to certified collectors only.',
    icon: ShieldPlus,
    color: 'from-pink-500 to-red-600',
    showPickup: true,
  },
  {
    id: 'cloth',
    title: 'Old Clothes',
    description: 'Clothes in good condition can be donated.',
    guide: 'Instead of throwing them away, consider donating to orphanages or NGOs nearby.',
    icon: Shirt,
    color: 'from-yellow-500 to-orange-600',
    showPickup: false,
  },
];

const WasteManagementPage = () => {
  const { id } = useParams(); // ✅ get family ID from URL
  const [expandedId, setExpandedId] = useState(null);
  const [amountKg, setAmountKg] = useState({});

  const toggleCard = (wasteId) => {
    setExpandedId((prev) => (prev === wasteId ? null : wasteId));
  };

  const requestPickup = async (wasteId) => {
    const amount = parseFloat(amountKg[wasteId]);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount in kg.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/pickup-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          familyId: id, // ✅ Use URL param instead of user.id
          wasteType: wasteId,
          amountKg: amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setAmountKg((prev) => ({ ...prev, [wasteId]: '' }));
      } else {
        alert(data.message || 'Pickup failed.');
      }
    } catch (error) {
      console.error('❌ Pickup request error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Manage Your Waste Responsibly ♻️</h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {wasteTypes.map(({ id, title, description, guide, icon: Icon, color, showPickup }) => (
          <div
            key={id}
            className="rounded-2xl shadow-md border hover:shadow-xl cursor-pointer transition-all bg-white dark:bg-gray-800"
            onClick={() => toggleCard(id)}
          >
            <div className={`rounded-t-2xl px-6 py-4 bg-gradient-to-br ${color} text-white flex items-center gap-3`}>
              <Icon className="h-6 w-6" />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>

              {expandedId === id && (
                <div className="mt-4 text-sm text-gray-800 dark:text-gray-200 animate-fade-in">
                  <p className="mb-2 font-semibold">Disposal Guide:</p>
                  <p>{guide}</p>

                  {showPickup ? (
                    <>
                      <div className="mt-4">
                        <label className="block text-xs mb-1 text-gray-500">Enter amount (in kg):</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="e.g., 2.5"
                          value={amountKg[id] || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            setAmountKg((prev) => ({ ...prev, [id]: e.target.value }))
                          }
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          requestPickup(id);
                        }}
                        className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                      >
                        Request Pickup
                      </button>
                    </>
                  ) : (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Nearby Orphanages:</p>
                      <div className="rounded overflow-hidden border shadow-md">
                        <iframe
                          title="Nearby Orphanages"
                          width="100%"
                          height="200"
                          loading="lazy"
                          allowFullScreen
                          className="rounded"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3929.193114292843!2d76.341!3d10.015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1654000000000!5m2!1sen!2sin"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        You can personally donate clean and usable clothes to nearby orphanages.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteManagementPage;
