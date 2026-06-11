import { ChevronDown, User, UserCircle, CalendarDays, BarChart3, BarChart4 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const eservices = [
  { label: "e-Trade License", color: "#1e40af" },
  { label: "E-Revenue", color: "#16a34a" },
  { label: "BanglaBiz", color: "#0a6b3c" },
  { label: "অভিযোগ কর্নার", color: "#fbbf24" },
  { label: "webmail", color: "#374151" },
  { label: "Project Monitoring & Evaluation System (PMES)", color: "#dc2626" },
  { label: "ফটোগ্যালারি", color: "#0a6b3c" },
  { label: "দর্শনীয় স্থান", color: "#fbbf24" },
];

const govLinks = ["রাষ্ট্রপতির কার্যালয়", "মাননীয় প্রধানমন্ত্রীর কার্যালয়", "বাংলাদেশ জাতীয় সংসদ", "বাংলাদেশ পুলিশের ওয়েবসাইট"];

const hotlines = [
  { number: "৩৩৩", label: "সরকারি তথ্য ও সেবা", color: "#0a6b3c", tagBg: "#e8f4ec" },
  { number: "৯৯৯", label: "জরুরি সেবা (National Help Desk)", color: "#dc2626", tagBg: "#fde8e8" },
  { number: "১০৯", label: "নারী ও শিশু নির্যাতন প্রতিরোধ", color: "#db2777", tagBg: "#fce7f3" },
  { number: "১০৬", label: "দুদক (দুর্নীতি দমন কমিশন)", color: "#0284c7", tagBg: "#e0f2fe" },
  { number: "১৬১৭১", label: "বাংলাদেশ মুক্তিযোদ্ধা কল্যাণ ট্রাস্ট", color: "#0a6b3c", tagBg: "#e8f4ec" },
  { number: "১০৯০", label: "দুর্যোগের আগাম বার্তা", color: "#7c3aed", tagBg: "#ede9fe" },
  { number: "১০৯৮", label: "শিশুর সহায়তায় ফোন", color: "#0891b2", tagBg: "#cffafe" },
];

export function RightRail() {
  return (
    <aside className="flex flex-col gap-3">
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 space-y-2">
        <button className="w-full h-9 bg-white border border-gray-300 rounded flex items-center justify-between px-3 text-[12px] text-gray-700 hover:border-[#0a6b3c]">
          ই-ডিরেক্টরি <ChevronDown size={14} />
        </button>
        <button className="w-full h-9 bg-white border border-gray-300 rounded flex items-center justify-between px-3 text-[12px] text-gray-700 hover:border-[#0a6b3c]">
          জন্ম ও মৃত্যু নিবন্ধন <ChevronDown size={14} />
        </button>
        <button className="w-full h-9 bg-[#0a6b3c] text-white rounded text-[12px]">অনুসন্ধান</button>
        <div className="bg-[#fbbf24]/20 border border-[#fbbf24] rounded p-2 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#fbbf24] flex items-center justify-center text-white" style={{ fontWeight: 700 }}>my</div>
          <div>
            <p className="text-[12px]" style={{ fontWeight: 700 }}>Gov</p>
            <p className="text-[10px] text-gray-700">এক ঠিকানায় সরকারি সেবা</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="bg-[#0a6b3c] text-white px-3 py-2 text-[13px]" style={{ fontWeight: 600 }}>গুরুত্বপূর্ণ লিংক</div>
        <ul className="p-2 space-y-1">
          {govLinks.map((l) => (
            <li key={l} className="flex items-center gap-2 px-2 py-1 text-[12px] text-gray-700 hover:text-[#0a6b3c] hover:bg-[#f4faf6] rounded">
              <span className="w-2 h-2 rounded-full bg-[#0a6b3c]" /> {l}
            </li>
          ))}
        </ul>
        <div className="px-3 pb-3"><button className="w-full bg-[#0a6b3c] text-white text-[11px] py-1.5 rounded">সকল</button></div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="bg-[#0a6b3c] text-white px-3 py-2 text-[13px]" style={{ fontWeight: 600 }}>আমাদের সেবা</div>
        <div className="p-2 space-y-1.5">
          {eservices.map((s) => (
            <a key={s.label} href="#" className="flex items-center gap-2 px-2 py-2 rounded border border-gray-200 hover:border-[#0a6b3c] text-[12px]">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="bg-[#0a6b3c] text-white px-3 py-2 text-[13px]" style={{ fontWeight: 600 }}>সাম্প্রতিক ভিডিও</div>
        <div className="relative">
          <ImageWithFallback src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=240&fit=crop" alt="video" className="w-full h-44 object-cover" />
          <div className="absolute top-2 left-2 bg-[#dc2626] text-white text-[10px] px-1.5 py-0.5 rounded">● LIVE</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">▶</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#0a6b3c] text-white px-3 py-2 text-[13px]" style={{ fontWeight: 600 }}>জরুরি হটলাইন</div>
        <ul className="p-2 space-y-1.5">
          {hotlines.map((h) => (
            <li
              key={h.number}
              className="flex items-center gap-2.5 rounded-md px-2 py-2 border border-gray-200 hover:border-[#0a6b3c] hover:bg-[#f4faf6] transition-colors"
            >
              <div
                className="shrink-0 rounded-md text-center px-2 py-1.5"
                style={{
                  background: h.tagBg,
                  minWidth: 54,
                }}
              >
                <div
                  style={{
                    color: h.color,
                    fontWeight: 800,
                    fontSize: "16px",
                    lineHeight: 1,
                    letterSpacing: "0.5px",
                  }}
                >
                  {h.number}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] text-gray-800 leading-tight" style={{ fontWeight: 600 }}>
                  {h.label}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">টোল ফ্রি · ২৪/৭</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#0a6b3c] text-white px-3 py-2 text-[13px]" style={{ fontWeight: 600 }}>মোট পরিদর্শক</div>
        <ul className="divide-y divide-gray-200">
          {[
            { Icon: User, label: "Visit Today", value: "22", color: "#2563eb" },
            { Icon: UserCircle, label: "Visit Yesterday", value: "556", color: "#0891b2" },
            { Icon: CalendarDays, label: "This Month", value: "3811", color: "#d97706" },
            { Icon: BarChart3, label: "Total Visit", value: "112198", color: "#16a34a" },
            { Icon: BarChart4, label: "Total Hits", value: "446330", color: "#dc2626" },
          ].map(({ Icon, label, value, color }, i) => (
            <li
              key={label}
              className="flex items-center gap-2 px-3 py-2 text-[12px] text-gray-800"
              style={{ background: i % 2 === 1 ? "#f7f7f5" : "#ffffff" }}
            >
              <Icon size={16} style={{ color }} />
              <span className="flex-1">{label}</span>
              <span style={{ fontWeight: 700 }}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
