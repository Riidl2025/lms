
// import React, { useState, useEffect, useMemo } from 'react';
// import type { User, Module, InstituteCode, Lecture } from './components/Types';
// import { SecurityWrapper } from './components/SecurityWrapper';
// import { VideoPlayerDRM } from './components/VideoPlayerDRM';
// import { QuizSystem } from './components/QuizSystem';
// import { AuthSystem } from './components/AuthSystem';

// const getModulesForInstitute = (code: InstituteCode): Module[] => {
//   const common = [
//     {
//       id: 'm-laser', name: 'Laser Precision Module',
//       lectures: Array(10).fill(0).map((_, i) => ({
//         id: `l-laser-${i}`, title: `Industrial High-Energy Part ${i+1}`,
//         videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//         duration: 300,
//         quiz: Array(10).fill(0).map((_, j) => ({
//           question: `Safe Operation Check ${j+1}: What is the primary safety protocol?`,
//           options: ['Standard Glasses', 'Certified Safety Goggles', 'None', 'Sunglasses'],
//           correctAnswer: 1,
//           explanation: 'Only certified goggles block high-frequency radiation.'
//         }))
//       }))
//     }
//   ];
//   if (code === 'MUM01') return [...common, { id: 'm-3dp', name: '3D Additive Lab', lectures: [] }, { id: 'm-cnc', name: 'CNC Precision', lectures: [] }];
//   if (code === 'DEL02') return [...common, { id: 'm-milling', name: 'Mechanical Milling', lectures: [] }];
//   return common;
// };

// const App: React.FC = () => {
//   const [auth, setAuth] = useState<{ user: User | null; token: string | null }>({ user: null, token: null });
//   const [activeModule, setActiveModule] = useState<Module | null>(null);
//   const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [progress, setProgress] = useState<{ completed: string[], unlocked: string[] }>({ completed: [], unlocked: [] });

//   const instituteModules = useMemo(() => auth.user ? getModulesForInstitute(auth.user.instituteCode) : [], [auth.user]);

//   useEffect(() => {
//     if (auth.user && instituteModules.length > 0) {
//       const firstId = instituteModules[0].lectures[0]?.id;
//       if (firstId) setProgress(p => ({ ...p, unlocked: [firstId] }));
//     }
//   }, [auth.user]);

//   if (!auth.user) return <AuthSystem onLogin={(user, token) => setAuth({ user, token })} />;

//   return (
//     <SecurityWrapper user={auth.user}>
//       <div className="flex h-screen bg-black text-zinc-100 font-sans">
        
//         {/* REFINED SIDEBAR */}
//         <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-zinc-950 border-r border-zinc-900 transition-all duration-300 overflow-hidden flex flex-col`}>
//           <div className="p-10 border-b border-zinc-900 flex items-center gap-4">
//             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
//               <i className="fas fa-shield-halved text-xl"></i>
//             </div>
//             <div>
//               <h1 className="font-black tracking-tighter text-xl leading-none">CORE VAULT</h1>
//               <span className="text-[9px] text-zinc-700 font-black tracking-widest uppercase">Premium LMS</span>
//             </div>
//           </div>

//           <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-4">
//              <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em] mb-4">Authorized Modules</p>
//              {instituteModules.map(mod => (
//                <div key={mod.id} className="space-y-1">
//                  <button 
//                    onClick={() => setActiveModule(activeModule?.id === mod.id ? null : mod)}
//                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeModule?.id === mod.id ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
//                  >
//                    <span className="text-sm font-black uppercase tracking-tight">{mod.name}</span>
//                    <i className={`fas fa-chevron-${activeModule?.id === mod.id ? 'down' : 'right'} text-[10px]`}></i>
//                  </button>
//                  {activeModule?.id === mod.id && (
//                    <div className="pl-4 space-y-1 mt-2">
//                      {mod.lectures.map((lec, idx) => {
//                        const isUnlocked = progress.unlocked.includes(lec.id) || idx === 0;
//                        const isCompleted = progress.completed.includes(lec.id);
//                        return (
//                          <button
//                            key={lec.id}
//                            disabled={!isUnlocked}
//                            onClick={() => { setActiveLecture(lec); setShowQuiz(false); }}
//                            className={`w-full text-left p-3 rounded-xl text-[11px] flex items-center justify-between ${activeLecture?.id === lec.id ? 'bg-emerald-500/10 text-emerald-500 font-bold' : isUnlocked ? 'text-zinc-600 hover:text-zinc-300' : 'text-zinc-800 cursor-not-allowed'}`}
//                          >
//                            <span className="truncate pr-4">{idx + 1}. {lec.title}</span>
//                            {isCompleted ? <i className="fas fa-check-circle text-emerald-500"></i> : !isUnlocked && <i className="fas fa-lock text-[10px]"></i>}
//                          </button>
//                        );
//                      })}
//                    </div>
//                  )}
//                </div>
//              ))}
//           </div>

//           {/* PERFECTED LOGOUT UI */}
//           <div className="p-8 border-t border-zinc-900 bg-[#070707]">
//              <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
//                   <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center font-black text-zinc-400">
//                     {auth.user.name.charAt(0)}
//                   </div>
//                   <div className="flex-1 overflow-hidden">
//                     <p className="text-xs font-black truncate text-zinc-100">{auth.user.name}</p>
//                     <p className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">{auth.user.instituteCode}</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setAuth({ user: null, token: null })}
//                   className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95"
//                 >
//                   <i className="fas fa-power-off group-hover:animate-pulse"></i>
//                   Terminate Session
//                 </button>
//              </div>
//           </div>
//         </aside>

//         <main className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
//            <header className="h-16 border-b border-zinc-900/50 flex items-center justify-between px-10 bg-zinc-950/20 backdrop-blur-3xl sticky top-0 z-10">
//             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-zinc-700 hover:text-white transition-colors">
//               <i className={`fas fa-${isSidebarOpen ? 'outdent' : 'indent'}`}></i>
//             </button>
//             <div className="flex items-center gap-4">
//               <div className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-[10px] font-black text-emerald-500 flex items-center gap-3">
//                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                  ACTIVE DEVICE MONITORING: ENABLED
//               </div>
//             </div>
//            </header>

//            <div className="flex-1 overflow-y-auto no-scrollbar p-16">
//              {!activeLecture ? (
//                <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-12">
//                   <div className="w-48 h-48 bg-zinc-900 border border-zinc-800 rounded-[3.5rem] flex items-center justify-center shadow-3xl">
//                     <i className="fas fa-shield-virus text-6xl text-emerald-500"></i>
//                   </div>
//                   <div className="space-y-4">
//                     <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Authorized Gateway</h2>
//                     <p className="text-zinc-600 text-sm leading-relaxed">Select a curriculum module to begin your secure learning protocol. All interactions are logged via IP and biometric telemetry.</p>
//                   </div>
//                </div>
//              ) : showQuiz ? (
//                <div className="h-full flex items-center justify-center">
//                  <QuizSystem 
//                    questions={activeLecture.quiz} 
//                    onPass={() => {
//                      const currentIdx = activeModule?.lectures.findIndex(l => l.id === activeLecture.id) ?? -1;
//                      const nextLec = activeModule?.lectures[currentIdx + 1];
//                      setProgress(p => ({
//                        completed: [...p.completed, activeLecture.id],
//                        unlocked: nextLec ? [...p.unlocked, nextLec.id] : p.unlocked
//                      }));
//                      setShowQuiz(false);
//                      if (nextLec) setActiveLecture(nextLec);
//                    }}
//                    onFail={() => setShowQuiz(false)}
//                  />
//                </div>
//              ) : (
//                <div className="max-w-6xl mx-auto space-y-16 animate-in slide-in-from-bottom-12 duration-700">
//                   <div className="space-y-4">
//                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Current Knowledge Node</span>
//                     <h1 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">{activeLecture.title}</h1>
//                   </div>
//                   <VideoPlayerDRM url={activeLecture.videoUrl} title={activeLecture.title} onComplete={() => setShowQuiz(true)} />
//                   <div className="grid grid-cols-2 gap-10">
//                      <div className="p-12 bg-zinc-900/40 border border-zinc-900 rounded-[3rem] space-y-6">
//                         <i className="fas fa-fingerprint text-emerald-500 text-3xl"></i>
//                         <h4 className="text-xl font-black text-white uppercase tracking-tighter">Biometric Lock</h4>
//                         <p className="text-zinc-600 text-xs font-bold leading-relaxed uppercase tracking-widest opacity-50">Authorized for: {auth.user.email}</p>
//                      </div>
//                      <div className="p-12 bg-zinc-900/40 border border-zinc-900 rounded-[3rem] space-y-6">
//                         <i className="fas fa-radar text-blue-500 text-3xl"></i>
//                         <h4 className="text-xl font-black text-white uppercase tracking-tighter">Capture Guard</h4>
//                         <p className="text-zinc-600 text-xs font-bold leading-relaxed uppercase tracking-widest opacity-50">Real-time screen capture detection active.</p>
//                      </div>
//                   </div>
//                </div>
//              )}
//            </div>
//         </main>
//       </div>
//     </SecurityWrapper>
//   );
// };

// export default App;


import React, { useState, useEffect, useMemo } from 'react';
import type { User, Module, InstituteCode, Lecture } from './components/Types';
import { SecurityWrapper } from './components/SecurityWrapper';
import { VideoPlayerDRM } from './components/VideoPlayerDRM';
import { QuizSystem } from './components/QuizSystem';
import { AuthSystem } from './components/AuthSystem';

const getModulesForInstitute = (code: InstituteCode): Module[] => {
  const common = [
    {
      id: 'm-laser',
      name: 'Laser Precision Module',
      lectures: Array(10).fill(0).map((_, i) => ({
        id: `l-laser-${i}`,
        title: `Industrial High-Energy Part ${i + 1}`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 300,
        quiz: Array(10).fill(0).map((_, j) => ({
          question: `Safe Operation Check ${j + 1}: What is the primary safety protocol?`,
          options: ['Standard Glasses', 'Certified Safety Goggles', 'None', 'Sunglasses'],
          correctAnswer: 1,
          explanation: 'Only certified goggles block high-frequency radiation.',
        })),
      })),
    },
  ];

  if (code === 'MUM01') return [...common, { id: 'm-3dp', name: '3D Additive Lab', lectures: [] }, { id: 'm-cnc', name: 'CNC Precision', lectures: [] }];
  if (code === 'DEL02') return [...common, { id: 'm-milling', name: 'Mechanical Milling', lectures: [] }];
  return common;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<{ user: User | null; token: string | null }>({ user: null, token: null });
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progress, setProgress] = useState<{ completed: string[]; unlocked: string[] }>({ completed: [], unlocked: [] });

  const instituteModules = useMemo(
    () => (auth.user ? getModulesForInstitute(auth.user.instituteCode) : []),
    [auth.user]
  );

  useEffect(() => {
    if (auth.user && instituteModules.length > 0) {
      const firstId = instituteModules[0].lectures[0]?.id;
      if (firstId) setProgress(p => ({ ...p, unlocked: [firstId] }));
    }
  }, [auth.user]);

  if (!auth.user) return <AuthSystem onLogin={(user, token) => setAuth({ user, token })} />;

  return (
    <SecurityWrapper user={auth.user}>
      <div className="flex h-screen bg-black text-zinc-100">

        {/* SIDEBAR */}
        <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-zinc-950 border-r border-zinc-800 transition-all duration-300 overflow-hidden flex flex-col`}>
          <div className="p-8 border-b border-zinc-800 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-lg">
              <i className="fas fa-shield-halved text-lg"></i>
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-lg">CORE VAULT</h1>
              <span className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase">Secure LMS</span>
            </div>
          </div>

          <div className="flex-1 px-6 py-8 overflow-y-auto space-y-4">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.25em]">Authorized Modules</p>

            {instituteModules.map(mod => (
              <div key={mod.id}>
                <button
                  onClick={() => setActiveModule(activeModule?.id === mod.id ? null : mod)}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition 
                  ${activeModule?.id === mod.id
                      ? 'bg-zinc-900 text-white shadow'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                    }`}
                >
                  <span className="text-sm font-semibold">{mod.name}</span>
                  <i className={`fas fa-chevron-${activeModule?.id === mod.id ? 'down' : 'right'} text-xs`} />
                </button>

                {activeModule?.id === mod.id && (
                  <div className="mt-2 pl-4 space-y-1">
                    {mod.lectures.map((lec, idx) => {
                      const unlocked = progress.unlocked.includes(lec.id) || idx === 0;
                      const completed = progress.completed.includes(lec.id);

                      return (
                        <button
                          key={lec.id}
                          disabled={!unlocked}
                          onClick={() => { setActiveLecture(lec); setShowQuiz(false); }}
                          className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-xs transition
                          ${activeLecture?.id === lec.id
                              ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                              : unlocked
                                ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                                : 'text-zinc-700 cursor-not-allowed'
                            }`}
                        >
                          <span className="truncate">{idx + 1}. {lec.title}</span>
                          {completed && <i className="fas fa-check-circle text-emerald-400" />}
                          {!unlocked && <i className="fas fa-lock text-[10px]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* USER / LOGOUT */}
          <div className="p-6 border-t border-zinc-800">
            <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-xl mb-4">
              <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center font-bold">
                {auth.user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{auth.user.name}</p>
                <p className="text-[10px] text-zinc-400 uppercase">{auth.user.instituteCode}</p>
              </div>
            </div>

            <button
              onClick={() => setAuth({ user: null, token: null })}
              className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition font-semibold text-xs uppercase tracking-wider"
            >
              Terminate Session
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
          <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 bg-black/40 backdrop-blur">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-zinc-400 hover:text-white">
              <i className={`fas fa-${isSidebarOpen ? 'outdent' : 'indent'}`} />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Secure Monitoring Active
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-16 py-12">
            {!activeLecture ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto gap-6">
                <div className="w-40 h-40 bg-zinc-900 border border-zinc-800 rounded-[3rem] flex items-center justify-center">
                  <i className="fas fa-shield-virus text-5xl text-emerald-400" />
                </div>
                <h2 className="text-4xl font-extrabold text-white">Authorized Gateway</h2>
                <p className="text-zinc-400 text-sm">
                  Select a module to begin your secure learning session. All activity is protected and monitored.
                </p>
              </div>
            ) : showQuiz ? (
              <QuizSystem
                questions={activeLecture.quiz}
                onPass={() => {
                  const idx = activeModule?.lectures.findIndex(l => l.id === activeLecture.id) ?? -1;
                  const next = activeModule?.lectures[idx + 1];
                  setProgress(p => ({
                    completed: [...p.completed, activeLecture.id],
                    unlocked: next ? [...p.unlocked, next.id] : p.unlocked,
                  }));
                  setShowQuiz(false);
                  if (next) setActiveLecture(next);
                }}
                onFail={() => setShowQuiz(false)}
              />
            ) : (
              <div className="max-w-6xl mx-auto space-y-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">Current Lecture</span>
                  <h1 className="text-5xl font-extrabold text-white mt-2">{activeLecture.title}</h1>
                </div>

                <VideoPlayerDRM
                  url={activeLecture.videoUrl}
                  title={activeLecture.title}
                  onComplete={() => setShowQuiz(true)}
                />

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
                    <i className="fas fa-fingerprint text-emerald-400 text-2xl mb-4" />
                    <h4 className="font-semibold text-lg">Biometric Lock</h4>
                    <p className="text-xs text-zinc-400 mt-2">{auth.user.email}</p>
                  </div>

                  <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
                    <i className="fas fa-radar text-blue-400 text-2xl mb-4" />
                    <h4 className="font-semibold text-lg">Capture Guard</h4>
                    <p className="text-xs text-zinc-400 mt-2">Real-time screen protection enabled</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SecurityWrapper>
  );
};

export default App;
