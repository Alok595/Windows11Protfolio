import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera as CameraIcon, CameraOff, RefreshCw, Image as ImageIcon, Download, Trash2, Settings, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CameraProps {
  onSavePhoto?: (dataUrl: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onSavePhoto }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isShutterActive, setIsShutterActive] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraOn(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (streamRef.current) return;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      setIsCameraOn(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 100));

      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false 
      });
      
      streamRef.current = mediaStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.error('Error playing video:', playErr);
        }
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      let message = err.message || 'Could not access camera.';
      
      if (err.name === 'NotAllowedError') {
        message = 'Camera access denied. Please grant permission in your browser.';
      } else if (err.name === 'NotReadableError' || err.message?.includes('Could not start video source')) {
        message = 'Camera is already in use by another application or hardware error.';
      }
      
      setError(message);
      setIsCameraOn(false);
      stopCamera();
    }
  }, [stopCamera]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startCamera();
    }, 500);
    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setIsShutterActive(true);
      setTimeout(() => setIsShutterActive(false), 150);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedPhotos(prev => [dataUrl, ...prev]);
        if (onSavePhoto) onSavePhoto(dataUrl);
      }
    }
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white overflow-hidden select-none">
      {/* Viewfinder Area */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700",
            isCameraOn ? "opacity-100" : "opacity-0 pointer-events-none absolute"
          )}
        />

        {/* Shutter Flash Effect */}
        <AnimatePresence>
          {isShutterActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-50"
            />
          )}
        </AnimatePresence>

        {/* Camera UI Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
          <div className="flex justify-between items-start pointer-events-auto">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div className={cn("w-2 h-2 rounded-full", isCameraOn ? "bg-red-500 animate-pulse" : "bg-gray-500")} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                <Settings size={16} />
              </button>
              <button className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Grid Lines (Visual only) */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
            <div className="border-r border-b border-white/30" />
            <div className="border-r border-b border-white/30" />
            <div className="border-b border-white/30" />
            <div className="border-r border-b border-white/30" />
            <div className="border-r border-b border-white/30" />
            <div className="border-b border-white/30" />
            <div className="border-r border-white/30" />
            <div className="border-r border-white/30" />
          </div>
        </div>

        {!isCameraOn && (
          <div className="flex flex-col items-center gap-6 text-center z-10 p-8">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
              <CameraOff size={36} className="text-white/20" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-white">{error || 'Camera is off'}</p>
              <p className="text-xs text-white/40 max-w-[280px] leading-relaxed">
                Please ensure your camera is connected and you have granted permission in your browser settings.
              </p>
            </div>
            <button 
              onClick={() => {
                setError(null);
                startCamera();
              }}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Shutter Button Container */}
        {isCameraOn && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-40">
              <ImageIcon size={20} />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={takePhoto}
              className="w-20 h-20 rounded-full border-[6px] border-white flex items-center justify-center bg-transparent p-1 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-white hover:bg-white/90 transition-colors" />
            </motion.button>

            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-40">
              <RefreshCw size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Gallery Bar */}
      <div className="h-32 bg-[#0a0a0a] border-t border-white/5 p-4 flex items-center gap-4 overflow-x-auto custom-scrollbar">
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-white/[0.03] border border-white/5 text-white/20 gap-1">
          <ImageIcon size={24} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Gallery</span>
        </div>
        
        <AnimatePresence mode="popLayout">
          {capturedPhotos.map((photo, index) => (
            <motion.div 
              key={photo} 
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative group flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img src={photo} alt={`Captured ${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = photo;
                    link.download = `niraj_photo_${Date.now()}.png`;
                    link.click();
                  }}
                  className="p-2 bg-white/10 rounded-full hover:bg-blue-500 hover:text-white transition-all border border-white/10"
                >
                  <Download size={14} />
                </button>
                <button 
                  onClick={() => deletePhoto(index)}
                  className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-all border border-white/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {capturedPhotos.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[11px] text-white/20 font-medium tracking-widest uppercase">No captures yet</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
