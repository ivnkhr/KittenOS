import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function Winamp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');

  const playlistTracks = [
    { title: 'Sample Track 1', artist: 'Artist 1' },
    { title: 'Sample Track 2', artist: 'Artist 2' },
    { title: 'Sample Track 3', artist: 'Artist 3' },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const loadPlaylist = () => {
    if (playlistUrl.includes('youtube.com') || playlistUrl.includes('youtu.be')) {
      alert('YouTube playlist loaded! (Note: This is a demo - real YouTube integration would require API keys)');
    } else {
      alert('Please enter a valid YouTube playlist URL');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      {/* Header */}
      <div className="bg-black rounded-lg p-3 mb-4">
        <div className="text-center text-green-400 font-mono text-sm">
          *** WINAMP v2.9 ***
        </div>
        <div className="text-center text-xs mt-1">
          {isPlaying ? '♪ PLAYING ♪' : '■ STOPPED ■'}
        </div>
      </div>

      {/* Display */}
      <div className="bg-black rounded p-2 mb-4 text-green-400 font-mono text-xs">
        <div className="h-8 overflow-hidden">
          {currentTrack || 'No track selected'}
        </div>
        <div className="text-right">00:00 / 00:00</div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mb-4">
        <Button size="sm" variant="outline" className="w-8 h-8 p-0">
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-8 h-8 p-0" 
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button size="sm" variant="outline" className="w-8 h-8 p-0">
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="w-8 h-8 p-0">
          <Volume2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Playlist URL Input */}
      <div className="mb-4">
        <label className="block text-xs mb-1">YouTube Playlist URL:</label>
        <div className="flex gap-2">
          <Input
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="https://youtube.com/playlist?list=..."
            className="text-xs"
          />
          <Button size="sm" onClick={loadPlaylist}>
            Load
          </Button>
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-black rounded p-2 overflow-y-auto max-h-32">
        <div className="text-green-400 text-xs mb-2">PLAYLIST:</div>
        {playlistTracks.map((track, index) => (
          <div 
            key={index}
            className="text-xs py-1 px-2 hover:bg-gray-700 cursor-pointer rounded"
            onClick={() => {
              setCurrentTrack(`${track.title} - ${track.artist}`);
              setIsPlaying(true);
            }}
          >
            {index + 1}. {track.title} - {track.artist}
          </div>
        ))}
      </div>
    </div>
  );
}