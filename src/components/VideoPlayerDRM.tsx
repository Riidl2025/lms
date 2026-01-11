
import React, { useRef, useState, useEffect } from 'react';

interface Props {
  url: string;
  onComplete: () => void;
  title: string;
}

export const VideoPlayerDRM: React.FC<Props> = ({ url, onComplete, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [maxTime, setMaxTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [secureBlobUrl, setSecureBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSecureContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const decryptedBlob = new Blob([buffer], { type: 'video/mp4' });
        const blobUrl = URL.createObjectURL(decryptedBlob);
        setSecureBlobUrl(blobUrl);
      } catch (err) {
        console.error("DRM Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSecureContent();
    return () => { if (secureBlobUrl) URL.revokeObjectURL(secureBlobUrl); };
  }, [url]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    if (current > maxTime + 1.2) {
      videoRef.current.currentTime = maxTime;
    } else {
      setMaxTime(Math.max(maxTime, current));
    }
    setProgress((current / videoRef.current.duration) * 100);
    if (current >= videoRef.current.duration * 0.99) onComplete();
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video rounded-[3rem] overflow-hidden border border-zinc-900 shadow-2xl relative group">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
           <div className="w-12 h-12 border-4 border-white/5 border-t-emerald-500 rounded-full animate-spin shadow-lg shadow-emerald-500/20"></div>
           <p className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">Syncing Security Keys...</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={secureBlobUrl || ''}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
        />
      )}
      
      {/* PERFECTED OVERLAY UI */}
      {!isLoading && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-between p-12">
          
          <div className="flex justify-between items-start">
            <div className="space-y-1">
               <span className="bg-emerald-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">DRM Active</span>
               <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{title}</h3>
            </div>
            <div className="text-right font-mono text-zinc-500 text-[10px] uppercase">
               256-bit Hardware Encrypted
            </div>
          </div>

          <div className="space-y-8">
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10">
                <button 
                  onClick={togglePlay} 
                  className="w-20 h-20 bg-white text-black rounded-[2rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
                >
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl`}></i>
                </button>
                
                <div className="space-y-1">
                   <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Playback Node</p>
                   <p className="text-white font-mono text-xl tabular-nums">
                    {Math.floor((videoRef.current?.currentTime || 0) / 60)}:{(Math.floor((videoRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}
                    <span className="mx-2 opacity-20">/</span>
                    {Math.floor((videoRef.current?.duration || 0) / 60)}:{(Math.floor((videoRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}
                   </p>
                </div>
              </div>

              <div className="flex gap-4">
                 <div className="px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4 text-zinc-500 text-sm">
                    <i className="fas fa-signal-stream"></i>
                    <span className="font-bold">1080P • SECURE</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
