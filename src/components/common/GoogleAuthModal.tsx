import React, { useState } from 'react';
import { X, ShieldCheck, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    signInWithGoogle,
    isGoogleAuthLoading,
    googleUser,
    signOutGoogle,
  } = useApp();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    const res = await signInWithGoogle();
    if (!res.success) {
      setErrorMessage(res.error || 'Unable to start Google sign-in.');
    }
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    await signOutGoogle();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Secure Google Sign-In</h2>
            <p className="text-xs text-slate-300 mt-1">
              Identity is verified by Google through Supabase Auth.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close sign-in"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <div className="font-bold">Role security</div>
              <p className="mt-1 leading-relaxed">
                Student, teacher, and administrator access is determined by the authenticated
                account's Supabase profile. Client-side access codes cannot elevate a user's role.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {googleUser ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{googleUser.name}</div>
                  <div className="text-xs text-slate-500 truncate">{googleUser.email}</div>
                  <div className="text-[11px] text-slate-500 mt-1 capitalize">
                    Authorized role: {googleUser.role || 'student'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleAuthLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              {isGoogleAuthLoading ? 'Opening Google…' : 'Continue with Google'}
            </button>
          )}

          <p className="text-[11px] leading-relaxed text-slate-500 text-center">
            New authenticated users are created as students. Teacher and administrator roles must
            be provisioned in Supabase by an authorized administrator.
          </p>
        </div>
      </div>
    </div>
  );
};
