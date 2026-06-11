import { useState } from "react";
import { X, Eye, EyeOff, ShieldCheck, Lock, User } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CREDENTIALS = { username: "admin", password: "Admin@1234" };

export function LoginModal({ open, onClose, onSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function handleClose() {
    setUsername(""); setPassword(""); setError(""); setLoading(false);
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("ব্যবহারকারীর নাম ও পাসওয়ার্ড আবশ্যক।");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (username.trim() === CREDENTIALS.username && password === CREDENTIALS.password) {
        setLoading(false);
        handleClose();
        onSuccess();
      } else {
        setLoading(false);
        setError("ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড। আবার চেষ্টা করুন।");
      }
    }, 900);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full" style={{ maxWidth: "420px" }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B6B3A] to-[#085530] rounded-t-2xl px-6 py-5 text-center relative">
          <button onClick={handleClose} className="absolute right-4 top-4 text-white/70 hover:text-white">
            <X size={18} />
          </button>
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 700 }}>
            অ্যাডমিন লগইন
          </h2>
          <p className="text-white/70 mt-1" style={{ fontSize: "12px" }}>
            বগুড়া সিটি কর্পোরেশন • প্রশাসনিক প্যানেল
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-[#333] mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>
              ব্যবহারকারীর নাম
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="admin"
                autoComplete="username"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 focus:border-[#0B6B3A] transition"
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#333] mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 bg-[#f8faf9] focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 focus:border-[#0B6B3A] transition"
                style={{ fontSize: "14px" }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-600" style={{ fontSize: "12px" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Hint */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-amber-700" style={{ fontSize: "11px" }}>
            <strong>ডেমো:</strong> username: <code>admin</code> &nbsp;|&nbsp; password: <code>Admin@1234</code>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6B3A] text-white rounded-xl py-3 hover:bg-[#085530] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                যাচাই করা হচ্ছে…
              </>
            ) : (
              "লগইন করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
