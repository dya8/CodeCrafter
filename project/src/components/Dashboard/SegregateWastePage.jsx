import React, { useState } from 'react';
import { Leaf, Trash2, Cpu, ShieldPlus, Shirt, ImageIcon } from 'lucide-react';

const wasteCategories = [
  {
    id: 'biodegradable',
    title: 'Biodegradable Waste',
    items: ['Food leftovers', 'Vegetable peels', 'Garden waste', 'Tea leaves'],
    color: 'from-green-500 to-emerald-600',
    icon: Leaf,
    bin: 'Green Bin',
  },
  {
    id: 'non-biodegradable',
    title: 'Non-Biodegradable Waste',
    items: ['Plastic bottles', 'Glass', 'Aluminum cans', 'Tetra packs'],
    color: 'from-blue-500 to-sky-600',
    icon: Trash2,
    bin: 'Blue Bin',
  },
  {
    id: 'ewaste',
    title: 'E-Waste',
    items: ['Mobile phones', 'Chargers', 'Laptops', 'Batteries'],
    color: 'from-purple-500 to-indigo-600',
    icon: Cpu,
    bin: 'E-Bin / Collection Center',
  },
  {
    id: 'biomedical',
    title: 'Biomedical Waste',
    items: ['Used masks', 'Sanitary pads', 'Syringes'],
    color: 'from-pink-500 to-red-500',
    icon: ShieldPlus,
    bin: 'Yellow Bag',
  },
  {
    id: 'textile',
    title: 'Old Clothes / Textile',
    items: ['Torn clothes', 'Bed sheets', 'Curtains'],
    color: 'from-yellow-400 to-orange-500',
    icon: Shirt,
    bin: 'Donation / Special Drives',
  },
];

const SegregateWastePage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!selectedFile) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await fetch('http://localhost:5000/api/classify-waste', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(`Predicted Waste Type: ${data.prediction}`);
    } catch (err) {
      console.error(err);
      alert('Failed to classify image.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">♻️ Segregate Waste Properly</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        Proper segregation of waste helps with recycling and safe disposal. Below is a guide to help you identify which waste goes where.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wasteCategories.map(({ id, title, items, color, icon: Icon, bin }) => (
          <div
            key={id}
            className="rounded-2xl border shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition"
          >
            <div className={`rounded-t-2xl px-6 py-4 bg-gradient-to-br ${color} text-white flex items-center gap-3`}>
              <Icon className="w-6 h-6" />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="p-4">
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                Recommended Disposal: <span className="font-medium text-green-600">{bin}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Image for Classification */}
      <div className="mt-12 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-green-600 text-center">
          <ImageIcon className="inline-block w-5 h-5 mr-2" />
          Classify Waste by Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow w-full"
        >
          Upload & Predict
        </button>
      </div>
    </div>
  );
};

export default SegregateWastePage;