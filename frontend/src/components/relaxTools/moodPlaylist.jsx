import React, { useState } from "react";
import {
  FaMusic,
  FaSmile,
  FaSadTear,
  FaLeaf,
  FaBolt,
  FaHeart,
  FaAngry,
  FaBrain,
} from "react-icons/fa";

const moodPlaylists = {
  Happy: [
    {
      name: "Happy Vibes",
      url: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
      cover: "https://i.scdn.co/image/ab67616d0000b273a2b4a0276e46788d3f9b6b56",
    },
    {
      name: "Feel Good",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      cover: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/205/1000x0/feel-good-1586947464-m1y8kbZ5x7.jpg",
    },
  ],
  Sad: [
    {
      name: "Sad Songs",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
      cover: "",
    },
    {
      name: "Heartbreak",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      cover: "",
    },
  ],
  Relaxed: [
    {
      name: "Chill Vibes",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY",
      cover: "",
    },
    {
      name: "Relax & Unwind",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      cover: "",
    },
  ],
  Energetic: [
    {
      name: "Workout Beats",
      url: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO1mWvp6",
      cover:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84e18a728197cd5ed80a00773b",
    },
    {
      name: "High Energy",
      url: "https://open.spotify.com/playlist/2mPJZaM1CNmpBGWntvEtEG",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQoZdriwYUyrraLUCwsj-e_M6vCZEUGDJ0g&s",
    },
  ],
  Focused: [
    {
      name: "Deep Focus",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS",
      cover: "",
    },
    {
      name: "Concentration",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      cover: "",
    },
  ],
  Angry: [
    {
      name: "Angry Metal",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634",
      cover: "",
    },
    {
      name: "Rage Beats",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      cover: "",
    },
  ],
};

const icons = {
  Happy: <FaSmile className="text-yellow-400 text-4xl" />,
  Sad: <FaSadTear className="text-blue-400 text-4xl" />,
  Relaxed: <FaLeaf className="text-green-400 text-4xl" />,
  Energetic: <FaBolt className="text-orange-400 text-4xl" />,
  Focused: <FaBrain className="text-purple-400 text-4xl" />,
  Romantic: <FaHeart className="text-pink-400 text-4xl" />,
  Angry: <FaAngry className="text-red-400 text-4xl" />,
};

const MoodMusic = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-8 flex items-center gap-3 text-gray-200">
        <FaMusic className="text-green-400" /> Mood-Based Music
      </h1>

      {/* Mood Selection */}
      {!selectedMood && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Object.keys(moodPlaylists).map((mood) => (
            <button
              key={mood}
              onClick={() => {
                setSelectedMood(mood);
                setSelectedPlaylist(null);
              }}
              className="flex flex-col items-center bg-white/10 text-gray-200 px-6 py-5 rounded-xl shadow-lg backdrop-blur-md transition transform hover:scale-105 hover:shadow-2xl"
            >
              {icons[mood]}
              <span className="text-lg font-semibold mt-2">{mood}</span>
            </button>
          ))}
        </div>
      )}

      {/* Playlist Selection */}
      {selectedMood && (
        <div className="mt-6 p-6 bg-white/10 text-gray-200 rounded-xl shadow-lg w-full max-w-2xl backdrop-blur-md">
          <button
            onClick={() => setSelectedMood(null)}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            ← Back
          </button>

          <p className="font-bold text-2xl mb-4">{selectedMood} Playlists</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {moodPlaylists[selectedMood].map((playlist, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer bg-white/10 p-4 rounded-lg shadow-md hover:scale-105 transition"
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <img
                  src={playlist.cover || "https://i.pinimg.com/236x/e2/49/b6/e249b699dfdd4b7c316c18560e03f9bf.jpg"}
                  alt={playlist.name}
                  className="w-44 h-44 rounded-lg shadow-md"
                />
                <span className="mt-3 text-lg font-semibold">{playlist.name}</span>
              </div>
            ))}
          </div>

          {/* Spotify Embed */}
          {selectedPlaylist && (
            <div className="mt-6">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.url
                  .split("/")
                  .pop()}`}
                width="100%"
                height="380"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodMusic;
