
import React, { useEffect, useState, useRef } from 'react';
import type { User } from './Types';

interface SecurityWrapperProps {
  children: React.ReactNode;
  user: User;
}

export const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children, user }) => {
  const [isSecure, setIsSecure] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const videoCaptureRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Prevent Right Click & DevTools
    const handleContext = (e: MouseEvent) => e.preventDefault();
    const handleKeydown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        setWarning("Unauthorized system inspection detected. Security protocol engaged.");
      }
    };

    // 2. Advanced Screen Capture Detection (Heuristics)
    const handleSecurityThreat = (reason: string) => {
      setIsSecure(false);
      setWarning(reason);
    };

    const onVisibilityChange = () => {
      if (document.hidden) handleSecurityThreat("Screen recording or task switch detected.");
    };

    const onWindowBlur = () => {
      handleSecurityThreat("Window focus lost. Playback paused for integrity.");
    };

    const onDeviceChange = () => {
      // Detecting new displays or capture devices being plugged in
      handleSecurityThreat("Hardware change detected. External capture devices are prohibited.");
    };

    // 3. Active Monitoring initialization
    const startMonitor = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoCaptureRef.current) videoCaptureRef.current.srcObject = stream;
      } catch (err) {
        setWarning("Active biometric monitoring is required for this secure module.");
      }
    };

    document.addEventListener('contextmenu', handleContext);
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    navigator.mediaDevices.addEventListener('devicechange', onDeviceChange);
    startMonitor();

    return () => {
      document.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
      navigator.mediaDevices.removeEventListener('devicechange', onDeviceChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden select-none">
      {/* High-End Professional Watermark (Paid User Branding) */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
        <div className="absolute animate-watermark whitespace-nowrap">
           <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-white/20 text-sm font-black tracking-widest uppercase">
                AUTHORIZED FOR: {user.email} | {user.instituteCode} | ID-{user.id.toUpperCase()}
              </span>
           </div>
        </div>
      </div>

      {/* Modern Security Barrier Overlay */}
      {warning && (
        <div className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-8 animate-in zoom-in duration-500">
            <div className="relative mx-auto w-24 h-24">
               <div className="absolute inset-0 bg-red-600/30 blur-3xl rounded-full"></div>
               <div className="relative w-24 h-24 bg-zinc-900 border border-red-500/50 rounded-3xl flex items-center justify-center">
                 <i className="fas fa-eye-slash text-red-500 text-3xl"></i>
               </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Security Alert</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{warning}</p>
            </div>
            <button 
              onClick={() => { setWarning(null); setIsSecure(true); }}
              className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all uppercase text-xs tracking-[0.2em]"
            >
              Resume Secure Session
            </button>
          </div>
        </div>
      )}

      {/* Hidden Hardware Monitoring Feed */}
      <video ref={videoCaptureRef} autoPlay playsInline muted className="hidden" />

      <div className={`${!isSecure ? 'blur-[80px] grayscale brightness-50 pointer-events-none' : ''} transition-all duration-1000 h-full`}>
        {children}
      </div>

      <style>{`
        @keyframes watermark {
          0% { transform: translate(5vw, 5vh) rotate(-5deg); }
          25% { transform: translate(60vw, 20vh) rotate(5deg); }
          50% { transform: translate(10vw, 80vh) rotate(-10deg); }
          75% { transform: translate(70vw, 60vh) rotate(5deg); }
          100% { transform: translate(5vw, 5vh) rotate(-5deg); }
        }
        .animate-watermark { animation: watermark 45s infinite linear; }
      `}</style>
    </div>
  );
};
