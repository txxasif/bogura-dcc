import { useState } from "react";
import { Search } from "lucide-react";

const tabs = [
  "জন্ম নিবন্ধন",
  "মৃত্যু নিবন্ধন",
  "হোল্ডিং ট্যাক্স",
  "ট্রেড লাইসেন্স",
  "নাগরিক সনদ",
];

export function HeroSearch() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-gradient-to-b from-[#f4faf6] to-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <h2 className="text-center mb-4 text-[#0a6b3c]" style={{ fontSize: '18px', fontWeight: 600 }}>
          আপনি কোন সেবা খুঁজছেন?
        </h2>
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`px-4 h-9 text-[13px] rounded-t-md border-b-2 transition ${
                active === i
                  ? "bg-white border-[#0a6b3c] text-[#0a6b3c]"
                  : "bg-gray-50 border-transparent text-gray-600 hover:text-[#0a6b3c]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            placeholder="হোল্ডিং নম্বর"
            className="h-10 px-3 border border-gray-300 rounded text-[13px] outline-none focus:border-[#0a6b3c]"
          />
          <select className="h-10 px-3 border border-gray-300 rounded text-[13px] outline-none bg-white">
            <option>ওয়ার্ড নির্বাচন করুন</option>
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i}>ওয়ার্ড নং {i + 1}</option>
            ))}
          </select>
          <button className="h-10 bg-[#0a6b3c] text-white rounded text-[13px] flex items-center justify-center gap-2 hover:bg-[#085530]">
            <Search size={14} /> অনুসন্ধান করুন
          </button>
        </div>
      </div>
    </section>
  );
}
