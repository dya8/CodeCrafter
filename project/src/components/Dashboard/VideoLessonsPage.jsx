import React, { useState } from 'react';
import { Youtube, RefreshCcw, Scissors, Repeat, Trash2, Package, Shirt, BookOpen } from 'lucide-react';

const videoData = [
  {
    title: '25 AWESOME DIYS FROM PLASTIC BOTTLES',
    description: 'Creative DIYs using plastic bottles.',
    url: 'https://www.youtube.com/embed/1MvbNwmqDvY',
    tag: 'Plastic',
    icon: RefreshCcw,
  },
  {
    title: '3 Ways to Reuse Cardboard Boxes!',
    description: 'Easy cardboard box reuse ideas.',
    url: 'https://www.youtube.com/embed/R6--28uMjR0',
    tag: 'Cardboard',
    icon: Package,
  },
  {
    title: 'Transforming Fabric & Waste Material ♻️',
    description: '6 genius DIY upcycle crafts.',
    url: 'https://www.youtube.com/embed/pFgX1iby7EA',
    tag: 'Fabric',
    icon: Shirt,
  },
  {
    title: 'DIY Crafts from Old Clothes',
    description: 'Turn clothes into useful items.',
    url: 'https://www.youtube.com/embed/JhlL7J3DOJs',
    tag: 'Cloth',
    icon: Repeat,
  },
  {
    title: 'Newspaper Craft Ideas',
    description: 'Fun crafts using newspaper.',
    url: 'https://www.youtube.com/embed/YL3OxfKFo1g',
    tag: 'Paper',
    icon: BookOpen,
  },
  {
    title: 'How to reuse glass bottles at home',
    description: 'Decor ideas from glass waste.',
    url: 'https://www.youtube.com/embed/10Vm3hR_2kI',
    tag: 'Glass',
    icon: Trash2,
  },
];

const tags = ['All', 'Plastic', 'Cardboard', 'Fabric', 'Cloth', 'Paper', 'Glass'];

const VideoLessonsPage = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = selectedTag === 'All'
    ? videoData
    : videoData.filter((video) => video.tag === selectedTag);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎥 Video Lessons</h1>

      {/* Tag Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedTag === tag
                ? 'bg-green-600 text-white'
                : 'text-green-700 border-green-600 hover:bg-green-100'
            } transition`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <div
            key={index}
            onClick={() => setSelectedVideo(video)}
            className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl cursor-pointer rounded-xl p-4 transition"
          >
            <div className="flex items-center gap-2 mb-3 text-green-600">
              <video.icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{video.tag}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{video.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
            <div className="mt-3 flex items-center text-sm text-blue-500 hover:underline">
              <Youtube className="w-4 h-4 mr-1" />
              Watch Video
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="p-4 flex justify-between items-center bg-green-600 text-white">
              <h2 className="text-md font-semibold">{selectedVideo.title}</h2>
              <button onClick={() => setSelectedVideo(null)} className="text-white text-xl">×</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLessonsPage;