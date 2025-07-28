import React from "react";
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function Winamp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');

  return (
    <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      {/* Header */}
      <div className="bg-black rounded-lg p-3 mb-4">
        <div className="text-center text-green-400 font-mono text-sm">
          *** KITTENAMP v2.9 ***
        </div>
      </div>

      <iframe width="100%" height="350" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2056729983&color=%23e66f51&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

    </div>
  );
}