
// import React, { useState } from 'react';
// import type { User, InstituteCode } from './Types';

// interface AuthSystemProps {
//   onLogin: (user: User, token: string) => void;
// }

// export const AuthSystem: React.FC<AuthSystemProps> = ({ onLogin }) => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [form, setForm] = useState({ name: '', email: '', password: '', code: '' });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     const validCodes = ['MUM01', 'DEL02', 'MAD03'];
//     if (!validCodes.includes(form.code.toUpperCase())) {
//       setError("Unauthorized access code. Protocol rejected.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       const mockUser: User = {
//         id: Math.random().toString(36).substr(2, 9),
//         name: form.name || 'Authorized Member',
//         email: form.email,
//         instituteCode: form.code.toUpperCase(),
//         ipAddress: '192.168.1.1'
//       };
//       onLogin(mockUser, "TOKEN_7788");
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
//       <div className="w-full max-w-md space-y-12 animate-in fade-in zoom-in duration-1000">
//         <div className="text-center space-y-8">
//            <div className="w-24 h-24 bg-white rounded-[2.5rem] mx-auto flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.1)] transition-transform hover:rotate-12">
//              <i className="fas fa-lock-hashtag text-black text-4xl"></i>
//            </div>
//            <div>
//              <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Secure Login</h1>
//              <p className="text-zinc-600 text-[10px] font-black tracking-[0.4em] uppercase mt-2">Multi-Factor Academic Hub</p>
//            </div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-zinc-950 p-12 rounded-[4rem] border border-zinc-900 space-y-6 shadow-2xl">
//           {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase rounded-2xl flex items-center gap-3"><i className="fas fa-triangle-exclamation"></i>{error}</div>}
          
//           {isRegister && (
//             <input required placeholder="Identity Name" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-5 text-white text-sm font-bold focus:border-emerald-500 outline-none transition-all" onChange={e => setForm({...form, name: e.target.value})} />
//           )}
//           <input required type="email" placeholder="Institutional Email" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-5 text-white text-sm font-bold focus:border-emerald-500 outline-none transition-all" onChange={e => setForm({...form, email: e.target.value})} />
//           <div className="grid grid-cols-2 gap-4">
//             <input required placeholder="Access Code" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-5 text-white text-sm font-bold focus:border-emerald-500 outline-none transition-all uppercase" onChange={e => setForm({...form, code: e.target.value})} />
//             <input required type="password" placeholder="Passkey" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-5 text-white text-sm font-bold focus:border-emerald-500 outline-none transition-all" onChange={e => setForm({...form, password: e.target.value})} />
//           </div>
//           <button disabled={loading} className="w-full py-6 bg-white text-black font-black rounded-3xl hover:bg-zinc-200 transition-all uppercase tracking-widest text-xs active:scale-95 disabled:opacity-30">{loading ? <i className="fas fa-spinner animate-spin"></i> : isRegister ? 'Initialize Account' : 'Authenticate'}</button>
          
//           <div className="text-center pt-4">
//             <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
//               {isRegister ? 'Returning user? Terminal login' : 'New Member? Request Access'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import type { User } from './Types';

interface AuthSystemProps {
  onLogin: (user: User, token: string) => void;
}

export const AuthSystem: React.FC<AuthSystemProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', code: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validCodes = ['MUM01', 'DEL02', 'MAD03'];
    if (!validCodes.includes(form.code.toUpperCase())) {
      setError('Unauthorized access code. Protocol rejected.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: form.name || 'Authorized Member',
        email: form.email,
        instituteCode: form.code.toUpperCase(),
        ipAddress: '192.168.1.1',
      };

      onLogin(mockUser, 'TOKEN_7788');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black px-6">
      <div className="w-full max-w-md space-y-10 animate-in fade-in zoom-in duration-700">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-red-500 flex items-center justify-center shadow-[0_0_60px_rgba(255,0,0,0.25)] transition-transform hover:rotate-6">
            <i className="fas fa-lock text-black text-3xl"></i>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Secure Login
            </h1>
            <p className="mt-2 text-xs font-semibold tracking-[0.35em] text-zinc-400 uppercase">
              Multi-Factor Academic Hub
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-[2.75rem] p-10 space-y-6 shadow-2xl"
        >
          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-xs font-semibold">
              <i className="fas fa-triangle-exclamation mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Name (Register only) */}
          {isRegister && (
            <input
              required
              placeholder="Full Name"
              className="w-full rounded-2xl bg-black border border-zinc-800 px-5 py-4 text-sm text-white placeholder-zinc-500 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          {/* Email */}
          <input
            required
            type="email"
            placeholder="Institutional Email"
            className="w-full rounded-2xl bg-black border border-zinc-800 px-5 py-4 text-sm text-white placeholder-zinc-500 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Code + Password */}
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="Access Code"
              className="w-full rounded-2xl bg-black border border-zinc-800 px-5 py-4 text-sm text-white placeholder-zinc-500 font-medium uppercase focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />

            <input
              required
              type="password"
              placeholder="Passkey"
              className="w-full rounded-2xl bg-black border border-zinc-800 px-5 py-4 text-sm text-white placeholder-zinc-500 font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full rounded-3xl bg-white py-5 text-xs font-extrabold tracking-widest uppercase text-black transition hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : isRegister ? (
              'Initialize Account'
            ) : (
              'Authenticate'
            )}
          </button>

          {/* Toggle */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition"
            >
              {isRegister
                ? 'Returning user? Terminal login'
                : 'New member? Request access'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
