import { useState } from "react";
import {
  LayoutDashboard, FileText, Users, MessageSquare,
  Settings, LogOut, Plus, Pencil, Trash2, Check,
  X, ChevronDown, Bell, Shield, Eye, Save,
  AlertCircle, CheckCircle2, Clock, Search,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Complaint {
  ref: string;
  name: string;
  phone: string;
  type: string;
  category: string;
  title: string;
  description: string;
  date: string;
  status: "pending" | "reviewing" | "resolved";
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  active: boolean;
}

export interface Official {
  id: string;
  name: string;
  role: string;
  sub: string;
  phone: string;
  email: string;
}

interface SiteSettings {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  marqueeText: string;
}

interface Props {
  complaints: Complaint[];
  onUpdateComplaint: (ref: string, status: Complaint["status"]) => void;
  onLogout: () => void;
}

// ── Initial data ───────────────────────────────────────────────────────────

const initNotices: Notice[] = [
  { id: "1", title: "বগুড়া সিটি কর্পোরেশনের ২০২৬-২৭ অর্থবছরের বার্ষিক বাজেট ঘোষণা সংক্রান্ত বিজ্ঞপ্তি।", date: "২৮-০৫-২০২৬", category: "বাজেট", active: true },
  { id: "2", title: "হোল্ডিং ট্যাক্স পুনঃনির্ধারণ ও পরিশোধ সংক্রান্ত গণবিজ্ঞপ্তি।", date: "২২-০৫-২০২৬", category: "কর", active: true },
  { id: "3", title: "বগুড়া পৌরসভার ৩ নং ওয়ার্ডে পানি সরবরাহ বন্ধ থাকবে।", date: "১৮-০৫-২০২৬", category: "পানি", active: true },
  { id: "4", title: "ট্রেড লাইসেন্স নবায়নের শেষ তারিখ ৩০ জুন ২০২৬।", date: "১০-০৫-২০২৬", category: "লাইসেন্স", active: true },
];

const initOfficials: Official[] = [
  { id: "1", name: "এম আর স্বাধীন", role: "প্রথম প্রশাসক", sub: "বগুড়া সিটি কর্পোরেশন", phone: "০৫১-৬২২৮৮", email: "admin@bcc.gov.bd" },
  { id: "2", name: "জনাব মোঃ তাজমিলুর রহমান", role: "মাননীয় মেয়র", sub: "বগুড়া সিটি কর্পোরেশন", phone: "০৫১-৬৬৬৭৭", email: "mayor@bcc.gov.bd" },
  { id: "3", name: "জনাব আমিনুল ইসলাম", role: "প্যানেল মেয়র-১", sub: "বগুড়া সিটি কর্পোরেশন", phone: "০১৭XXXXXXXX", email: "panel1@bcc.gov.bd" },
];

const initSettings: SiteSettings = {
  siteName: "বগুড়া সিটি কর্পোরেশন",
  tagline: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
  phone: "০৫১-৬২২৮৮",
  email: "info@bcc.gov.bd",
  address: "পুরাতন বাসস্ট্যান্ড, বগুড়া-৫৮০০",
  marqueeText: "বগুড়া সিটি কর্পোরেশনে আপনাকে স্বাগতম — যেকোনো নাগরিক সেবার জন্য যোগাযোগ করুন",
};

const NOTICE_CATS = ["বাজেট", "কর", "পানি", "লাইসেন্স", "স্বাস্থ্য", "পরিবেশ", "সাধারণ"];

// ── Helpers ────────────────────────────────────────────────────────────────

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
}

const STATUS_LABEL: Record<Complaint["status"], string> = {
  pending: "অপেক্ষমান",
  reviewing: "পর্যালোচনাধীন",
  resolved: "নিষ্পত্তিকৃত",
};
const STATUS_COLOR: Record<Complaint["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  reviewing: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

// ── Main component ─────────────────────────────────────────────────────────

type Section = "overview" | "notices" | "officials" | "complaints" | "settings";

export function AdminDashboard({ complaints, onUpdateComplaint, onLogout }: Props) {
  const [section, setSection] = useState<Section>("overview");
  const [notices, setNotices] = useState<Notice[]>(initNotices);
  const [officials, setOfficials] = useState<Official[]>(initOfficials);
  const [settings, setSettings] = useState<SiteSettings>(initSettings);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  const navItems: { id: Section; icon: typeof LayoutDashboard; label: string; badge?: number }[] = [
    { id: "overview",   icon: LayoutDashboard, label: "ড্যাশবোর্ড" },
    { id: "notices",    icon: FileText,        label: "নোটিশ",    badge: notices.filter(n => n.active).length },
    { id: "officials",  icon: Users,           label: "কর্মকর্তা", badge: officials.length },
    { id: "complaints", icon: MessageSquare,   label: "অভিযোগ/মতামত", badge: complaints.filter(c => c.status === "pending").length || undefined },
    { id: "settings",   icon: Settings,        label: "সাইট সেটিংস" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f2] flex" style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 bg-[#0B2E1A] flex flex-col flex-shrink-0 min-h-screen">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-[#C8A34D]" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em" }}>
            ADMIN PANEL
          </p>
          <h1 className="text-white mt-0.5" style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}>
            বগুড়া সিটি কর্পোরেশন
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  active
                    ? "bg-[#0B6B3A] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontSize: "13px", fontWeight: active ? 600 : 400 }}
              >
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className="text-white rounded-full px-1.5 py-0.5"
                    style={{ fontSize: "10px", fontWeight: 700, backgroundColor: active ? "rgba(255,255,255,0.25)" : "#C8A34D", minWidth: "18px", textAlign: "center" }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <p className="text-white/90" style={{ fontSize: "12px", fontWeight: 600 }}>অ্যাডমিন</p>
            <p className="text-white/40" style={{ fontSize: "11px" }}>admin@bcc.gov.bd</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
            style={{ fontSize: "13px" }}
          >
            <LogOut size={15} /> লগআউট
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
          <div>
            <h2 className="text-[#0B2E1A]" style={{ fontSize: "15px", fontWeight: 700 }}>
              {navItems.find(n => n.id === section)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-gray-400 hover:text-[#0B6B3A]">
              <Bell size={18} />
              {complaints.filter(c => c.status === "pending").length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center" style={{ fontSize: "9px", fontWeight: 700 }}>
                  {complaints.filter(c => c.status === "pending").length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 bg-[#f0f4f2] rounded-full px-3 py-1.5">
              <Shield size={13} className="text-[#0B6B3A]" />
              <span className="text-[#0B6B3A]" style={{ fontSize: "12px", fontWeight: 600 }}>admin</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* ── Overview ── */}
          {section === "overview" && (
            <OverviewSection
              notices={notices} officials={officials} complaints={complaints}
              onNavigate={setSection}
            />
          )}

          {/* ── Notices ── */}
          {section === "notices" && (
            <NoticesSection notices={notices} setNotices={setNotices} showToast={showToast} />
          )}

          {/* ── Officials ── */}
          {section === "officials" && (
            <OfficialsSection officials={officials} setOfficials={setOfficials} showToast={showToast} />
          )}

          {/* ── Complaints ── */}
          {section === "complaints" && (
            <ComplaintsSection complaints={complaints} onUpdate={onUpdateComplaint} showToast={showToast} />
          )}

          {/* ── Settings ── */}
          {section === "settings" && (
            <SettingsSection settings={settings} setSettings={setSettings} showToast={showToast} />
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B6B3A] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2" style={{ fontSize: "13px" }}>
          <CheckCircle2 size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

// ── Overview Section ────────────────────────────────────────────────────────

function OverviewSection({ notices, officials, complaints, onNavigate }: {
  notices: Notice[]; officials: Official[]; complaints: Complaint[];
  onNavigate: (s: Section) => void;
}) {
  const stats = [
    { label: "মোট নোটিশ", value: notices.length, icon: FileText, color: "#0B6B3A", bg: "#edf8f2", action: () => onNavigate("notices") },
    { label: "কর্মকর্তা", value: officials.length, icon: Users, color: "#1e40af", bg: "#eff6ff", action: () => onNavigate("officials") },
    { label: "মোট অভিযোগ", value: complaints.length, icon: MessageSquare, color: "#b45309", bg: "#fffbeb", action: () => onNavigate("complaints") },
    { label: "অপেক্ষমান", value: complaints.filter(c => c.status === "pending").length, icon: Clock, color: "#dc2626", bg: "#fef2f2", action: () => onNavigate("complaints") },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <button key={s.label} onClick={s.action} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.bg }}>
                <Icon size={20} style={{ color: s.color }} />
              </div>
              <p className="text-3xl text-[#0B2E1A]" style={{ fontWeight: 800 }}>{s.value}</p>
              <p className="text-gray-500 mt-1" style={{ fontSize: "12px" }}>{s.label}</p>
            </button>
          );
        })}
      </div>

      {/* Recent complaints */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-[#0B2E1A]" style={{ fontSize: "14px", fontWeight: 700 }}>সাম্প্রতিক অভিযোগ / মতামত</h3>
          <button onClick={() => onNavigate("complaints")} className="text-[#0B6B3A] hover:underline" style={{ fontSize: "12px" }}>সব দেখুন →</button>
        </div>
        {complaints.length === 0 ? (
          <div className="px-5 py-10 text-center text-gray-400" style={{ fontSize: "13px" }}>
            এখনো কোনো অভিযোগ দাখিল হয়নি।
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {complaints.slice(0, 5).map((c) => (
              <div key={c.ref} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[#222] truncate" style={{ fontSize: "13px", fontWeight: 500 }}>{c.title}</p>
                  <p className="text-gray-400" style={{ fontSize: "11px" }}>{c.name} • {c.ref}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full ${STATUS_COLOR[c.status]}`} style={{ fontSize: "11px", fontWeight: 600 }}>
                  {STATUS_LABEL[c.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active notices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-[#0B2E1A]" style={{ fontSize: "14px", fontWeight: 700 }}>সক্রিয় নোটিশ</h3>
          <button onClick={() => onNavigate("notices")} className="text-[#0B6B3A] hover:underline" style={{ fontSize: "12px" }}>ব্যবস্থাপনা →</button>
        </div>
        <div className="divide-y divide-gray-50">
          {notices.filter(n => n.active).slice(0, 4).map((n) => (
            <div key={n.id} className="px-5 py-3 flex items-center gap-3">
              <span className="bg-[#edf8f2] text-[#0B6B3A] px-2 py-0.5 rounded-full shrink-0" style={{ fontSize: "10px", fontWeight: 600 }}>{n.category}</span>
              <p className="text-[#333] truncate flex-1" style={{ fontSize: "12px" }}>{n.title}</p>
              <span className="text-gray-400 shrink-0" style={{ fontSize: "11px" }}>{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Notices Section ─────────────────────────────────────────────────────────

function NoticesSection({ notices, setNotices, showToast }: {
  notices: Notice[]; setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  showToast: (m: string) => void;
}) {
  const [editId, setEditId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ title: "", date: today(), category: "সাধারণ" });

  function save() {
    if (!draft.title.trim()) return;
    if (editId) {
      setNotices(ns => ns.map(n => n.id === editId ? { ...n, ...draft } : n));
      showToast("নোটিশ আপডেট হয়েছে।");
    } else {
      setNotices(ns => [{ id: uid(), ...draft, active: true }, ...ns]);
      showToast("নতুন নোটিশ যোগ হয়েছে।");
    }
    setEditId(null); setShowAdd(false); setDraft({ title: "", date: today(), category: "সাধারণ" });
  }

  function startEdit(n: Notice) {
    setEditId(n.id); setDraft({ title: n.title, date: n.date, category: n.category }); setShowAdd(true);
  }

  function del(id: string) {
    setNotices(ns => ns.filter(n => n.id !== id));
    showToast("নোটিশ মুছে ফেলা হয়েছে।");
  }

  function toggle(id: string) {
    setNotices(ns => ns.map(n => n.id === id ? { ...n, active: !n.active } : n));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-500" style={{ fontSize: "13px" }}>মোট {notices.length}টি নোটিশ</p>
        <button
          onClick={() => { setEditId(null); setDraft({ title: "", date: today(), category: "সাধারণ" }); setShowAdd(true); }}
          className="flex items-center gap-2 bg-[#0B6B3A] text-white px-4 py-2 rounded-xl hover:bg-[#085530] transition-colors"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          <Plus size={15} /> নতুন নোটিশ
        </button>
      </div>

      {/* Add/Edit form */}
      {showAdd && (
        <div className="bg-white border-2 border-[#0B6B3A]/20 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-[#0B6B3A]" style={{ fontSize: "14px", fontWeight: 700 }}>
            {editId ? "নোটিশ সম্পাদনা" : "নতুন নোটিশ যোগ করুন"}
          </h3>
          <div>
            <label className="block text-[#444] mb-1" style={{ fontSize: "12px", fontWeight: 600 }}>শিরোনাম *</label>
            <textarea
              value={draft.title} rows={2}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 resize-none bg-[#f8faf9]"
              style={{ fontSize: "13px" }}
              placeholder="নোটিশের শিরোনাম লিখুন…"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#444] mb-1" style={{ fontSize: "12px", fontWeight: 600 }}>তারিখ</label>
              <input
                type="text" value={draft.date}
                onChange={e => setDraft(d => ({ ...d, date: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 bg-[#f8faf9]"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-[#444] mb-1" style={{ fontSize: "12px", fontWeight: 600 }}>শ্রেণি</label>
              <select
                value={draft.category}
                onChange={e => setDraft(d => ({ ...d, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 bg-[#f8faf9]"
                style={{ fontSize: "13px" }}
              >
                {NOTICE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowAdd(false); setEditId(null); }} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors" style={{ fontSize: "13px" }}>
              বাতিল
            </button>
            <button onClick={save} className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white hover:bg-[#085530] transition-colors flex items-center gap-2" style={{ fontSize: "13px", fontWeight: 600 }}>
              <Save size={14} /> সংরক্ষণ করুন
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {notices.map((n) => (
            <div key={n.id} className={`px-5 py-4 flex items-start gap-4 transition-colors ${!n.active ? "opacity-50" : ""}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#edf8f2] text-[#0B6B3A] px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 600 }}>{n.category}</span>
                  {!n.active && <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full" style={{ fontSize: "10px" }}>নিষ্ক্রিয়</span>}
                </div>
                <p className="text-[#222]" style={{ fontSize: "13px" }}>{n.title}</p>
                <p className="text-gray-400 mt-1" style={{ fontSize: "11px" }}>{n.date}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggle(n.id)}
                  title={n.active ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${n.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`}
                >
                  {n.active ? <Eye size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => startEdit(n)} className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => del(n.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Officials Section ───────────────────────────────────────────────────────

function OfficialsSection({ officials, setOfficials, showToast }: {
  officials: Official[]; setOfficials: React.Dispatch<React.SetStateAction<Official[]>>;
  showToast: (m: string) => void;
}) {
  const blank: Official = { id: "", name: "", role: "", sub: "বগুড়া সিটি কর্পোরেশন", phone: "", email: "" };
  const [editing, setEditing] = useState<Official | null>(null);

  function save() {
    if (!editing || !editing.name.trim() || !editing.role.trim()) return;
    if (editing.id) {
      setOfficials(os => os.map(o => o.id === editing.id ? editing : o));
      showToast("কর্মকর্তার তথ্য আপডেট হয়েছে।");
    } else {
      setOfficials(os => [...os, { ...editing, id: uid() }]);
      showToast("নতুন কর্মকর্তা যোগ হয়েছে।");
    }
    setEditing(null);
  }

  function del(id: string) {
    setOfficials(os => os.filter(o => o.id !== id));
    showToast("কর্মকর্তার তথ্য মুছে ফেলা হয়েছে।");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-500" style={{ fontSize: "13px" }}>মোট {officials.length} জন কর্মকর্তা</p>
        <button
          onClick={() => setEditing({ ...blank })}
          className="flex items-center gap-2 bg-[#0B6B3A] text-white px-4 py-2 rounded-xl hover:bg-[#085530] transition-colors"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          <Plus size={15} /> নতুন কর্মকর্তা
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="bg-white border-2 border-[#0B6B3A]/20 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-[#0B6B3A]" style={{ fontSize: "14px", fontWeight: 700 }}>
            {editing.id ? "কর্মকর্তার তথ্য সম্পাদনা" : "নতুন কর্মকর্তা যোগ"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "name", label: "পূর্ণ নাম *", ph: "কর্মকর্তার নাম" },
              { key: "role", label: "পদবী *", ph: "যেমন: মাননীয় মেয়র" },
              { key: "sub",  label: "বিভাগ", ph: "বগুড়া সিটি কর্পোরেশন" },
              { key: "phone",label: "ফোন", ph: "০১XXXXXXXXX" },
              { key: "email",label: "ইমেইল", ph: "name@bcc.gov.bd" },
            ].map(({ key, label, ph }) => (
              <div key={key}>
                <label className="block text-[#444] mb-1" style={{ fontSize: "12px", fontWeight: 600 }}>{label}</label>
                <input
                  value={(editing as Record<string, string>)[key]}
                  onChange={e => setEditing(prev => prev ? { ...prev, [key]: e.target.value } : prev)}
                  placeholder={ph}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 bg-[#f8faf9]"
                  style={{ fontSize: "13px" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors" style={{ fontSize: "13px" }}>বাতিল</button>
            <button onClick={save} className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white hover:bg-[#085530] transition-colors flex items-center gap-2" style={{ fontSize: "13px", fontWeight: 600 }}>
              <Save size={14} /> সংরক্ষণ করুন
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {officials.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="w-12 h-12 rounded-full bg-[#edf8f2] flex items-center justify-center mb-3">
              <Users size={22} className="text-[#0B6B3A]" />
            </div>
            <p className="text-[#0B2E1A]" style={{ fontSize: "14px", fontWeight: 700 }}>{o.name}</p>
            <p className="text-[#0B6B3A]" style={{ fontSize: "12px", fontWeight: 500 }}>{o.role}</p>
            <p className="text-gray-400" style={{ fontSize: "11px" }}>{o.sub}</p>
            {o.phone && <p className="text-gray-500 mt-2" style={{ fontSize: "11px" }}>📞 {o.phone}</p>}
            {o.email && <p className="text-gray-500" style={{ fontSize: "11px" }}>✉️ {o.email}</p>}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
              <button onClick={() => setEditing({ ...o })} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-blue-500 hover:bg-blue-50 transition-colors" style={{ fontSize: "12px" }}>
                <Pencil size={12} /> সম্পাদনা
              </button>
              <button onClick={() => del(o.id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-red-400 hover:bg-red-50 transition-colors" style={{ fontSize: "12px" }}>
                <Trash2 size={12} /> মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Complaints Section ──────────────────────────────────────────────────────

function ComplaintsSection({ complaints, onUpdate, showToast }: {
  complaints: Complaint[]; onUpdate: (ref: string, s: Complaint["status"]) => void;
  showToast: (m: string) => void;
}) {
  const [filter, setFilter] = useState<Complaint["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = complaints.filter(c => {
    const matchStatus = filter === "all" || c.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  function changeStatus(ref: string, status: Complaint["status"]) {
    onUpdate(ref, status);
    showToast(`অভিযোগ ${STATUS_LABEL[status]} হিসেবে চিহ্নিত হয়েছে।`);
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {(["all", "pending", "reviewing", "resolved"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${filter === f ? "bg-[#0B6B3A] text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              style={{ fontSize: "12px", fontWeight: filter === f ? 600 : 400 }}
            >
              {f === "all" ? "সব" : STATUS_LABEL[f]}
              {f !== "all" && (
                <span className="ml-1.5 opacity-70">({complaints.filter(c => c.status === f).length})</span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="অনুসন্ধান করুন…"
            className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/20"
            style={{ fontSize: "12px", width: "200px" }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-16 text-center">
          <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400" style={{ fontSize: "13px" }}>কোনো অভিযোগ পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.ref} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === c.ref ? null : c.ref)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full ${STATUS_COLOR[c.status]}`} style={{ fontSize: "10px", fontWeight: 600 }}>
                      {STATUS_LABEL[c.status]}
                    </span>
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" style={{ fontSize: "10px" }}>{c.type}</span>
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" style={{ fontSize: "10px" }}>{c.category}</span>
                  </div>
                  <p className="text-[#222]" style={{ fontSize: "13px", fontWeight: 600 }}>{c.title}</p>
                  <p className="text-gray-400 mt-0.5" style={{ fontSize: "11px" }}>
                    {c.name} • {c.phone} • রেফ: {c.ref} • {c.date}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 shrink-0 transition-transform ${expanded === c.ref ? "rotate-180" : ""}`}
                />
              </div>

              {expanded === c.ref && (
                <div className="px-5 pb-4 border-t border-gray-50 pt-3 space-y-3">
                  <p className="text-[#444]" style={{ fontSize: "13px", lineHeight: 1.7 }}>{c.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(["pending", "reviewing", "resolved"] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => changeStatus(c.ref, s)}
                        disabled={c.status === s}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                          c.status === s
                            ? "bg-[#0B6B3A] text-white border-[#0B6B3A] cursor-default"
                            : "border-gray-200 text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]"
                        }`}
                        style={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        {c.status === s && <Check size={12} />}
                        {STATUS_LABEL[s]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Settings Section ────────────────────────────────────────────────────────

function SettingsSection({ settings, setSettings, showToast }: {
  settings: SiteSettings; setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  showToast: (m: string) => void;
}) {
  const [draft, setDraft] = useState({ ...settings });

  function save() {
    setSettings(draft);
    showToast("সেটিংস সংরক্ষিত হয়েছে।");
  }

  const fields: { key: keyof SiteSettings; label: string; ph: string; area?: boolean }[] = [
    { key: "siteName",    label: "সাইটের নাম",        ph: "বগুড়া সিটি কর্পোরেশন" },
    { key: "tagline",     label: "ট্যাগলাইন",          ph: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" },
    { key: "phone",       label: "যোগাযোগ নম্বর",      ph: "০৫১-XXXXX" },
    { key: "email",       label: "ইমেইল ঠিকানা",       ph: "info@bcc.gov.bd" },
    { key: "address",     label: "অফিসের ঠিকানা",      ph: "পুরাতন বাসস্ট্যান্ড, বগুড়া", area: true },
    { key: "marqueeText", label: "স্ক্রলিং বার্তা",    ph: "মার্কি টেক্সট লিখুন…", area: true },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="text-[#0B2E1A]" style={{ fontSize: "15px", fontWeight: 700 }}>ওয়েবসাইট সাধারণ তথ্য</h3>
        {fields.map(({ key, label, ph, area }) => (
          <div key={key}>
            <label className="block text-[#444] mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{label}</label>
            {area ? (
              <textarea
                value={draft[key]} rows={2}
                onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                placeholder={ph}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 resize-none bg-[#f8faf9]"
                style={{ fontSize: "13px" }}
              />
            ) : (
              <input
                value={draft[key]}
                onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                placeholder={ph}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 bg-[#f8faf9]"
                style={{ fontSize: "13px" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Password change */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="text-[#0B2E1A]" style={{ fontSize: "15px", fontWeight: 700 }}>পাসওয়ার্ড পরিবর্তন</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["নতুন পাসওয়ার্ড", "পুনরায় পাসওয়ার্ড"].map(label => (
            <div key={label}>
              <label className="block text-[#444] mb-1.5" style={{ fontSize: "13px", fontWeight: 600 }}>{label}</label>
              <input
                type="password" placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B6B3A]/30 bg-[#f8faf9]"
                style={{ fontSize: "13px" }}
              />
            </div>
          ))}
        </div>
        <p className="text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2" style={{ fontSize: "11px" }}>
          ⚠️ এই ডেমোতে পাসওয়ার্ড পরিবর্তন সংরক্ষিত হবে না।
        </p>
      </div>

      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#0B6B3A] text-white px-6 py-3 rounded-xl hover:bg-[#085530] transition-colors"
        style={{ fontSize: "14px", fontWeight: 700 }}
      >
        <Save size={16} /> সকল পরিবর্তন সংরক্ষণ করুন
      </button>
    </div>
  );
}
