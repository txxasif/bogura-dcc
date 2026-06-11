import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Megaphone } from "lucide-react";

type Poster = {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  bg: string;
  accent: string;
  icon: string;
  date: string;
};

const POSTERS: Poster[] = [
  {
    id: 1,
    title: "বর্জ্য সঠিকভাবে ফেলুন",
    subtitle: "পরিষ্কার শহর গড়ুন — প্রতিটি বাড়ি, প্রতিটি রাস্তা পরিষ্কার রাখা আমাদের সকলের দায়িত্ব।",
    badge: "বর্জ্য ব্যবস্থাপনা",
    bg: "from-[#064e26] via-[#0a6b3c] to-[#1a8f54]",
    accent: "#C8A34D",
    icon: "🗑️",
    date: "০১ জুন ২০২৬",
  },
  {
    id: 2,
    title: "ডেঙ্গু থেকে বাঁচুন",
    subtitle: "জমা পানি পরিষ্কার রাখুন — এডিস মশার প্রজনন বন্ধ করুন। সচেতন থাকুন, সুস্থ থাকুন।",
    badge: "ডেঙ্গু প্রতিরোধ",
    bg: "from-[#7c1d1d] via-[#b91c1c] to-[#dc2626]",
    accent: "#fbbf24",
    icon: "🦟",
    date: "১৫ মে ২০২৬",
  },
  {
    id: 3,
    title: "হোল্ডিং ট্যাক্স পরিশোধ করুন",
    subtitle: "সময়মতো কর পরিশোধ করুন — আপনার ট্যাক্সই গড়ে তোলে উন্নত নগর পরিকাঠামো।",
    badge: "হোল্ডিং ট্যাক্স",
    bg: "from-[#1e3a5f] via-[#1e40af] to-[#2563eb]",
    accent: "#C8A34D",
    icon: "🏛️",
    date: "১০ মে ২০২৬",
  },
  {
    id: 4,
    title: "ডিজিটাল নাগরিক সেবা",
    subtitle: "এখন ঘরে বসেই পান সিটি কর্পোরেশনের সকল সেবা — অ্যাপ বা ওয়েবসাইটের মাধ্যমে আবেদন করুন।",
    badge: "নাগরিক সেবা",
    bg: "from-[#064e26] via-[#065f46] to-[#047857]",
    accent: "#C8A34D",
    icon: "📱",
    date: "০৫ মে ২০২৬",
  },
  {
    id: 5,
    title: "গাছ লাগান, পরিবেশ বাঁচান",
    subtitle: "সবুজ বগুড়া গড়ার অঙ্গীকার — প্রতি বাড়িতে অন্তত একটি গাছ লাগান এবং ভবিষ্যৎ প্রজন্মের জন্য পরিবেশ রক্ষা করুন।",
    badge: "পরিবেশ সচেতনতা",
    bg: "from-[#1a4731] via-[#15803d] to-[#16a34a]",
    accent: "#fbbf24",
    icon: "🌳",
    date: "২৮ এপ্রিল ২০২৬",
  },
  {
    id: 6,
    title: "জনস্বাস্থ্য সুরক্ষা করুন",
    subtitle: "বিশুদ্ধ পানি পান করুন, হাত ধুয়ে রোগ প্রতিরোধ করুন — সুস্থ নাগরিক, সুস্থ সমাজ।",
    badge: "জনস্বাস্থ্য নির্দেশনা",
    bg: "from-[#4a1d96] via-[#6d28d9] to-[#7c3aed]",
    accent: "#C8A34D",
    icon: "🏥",
    date: "২০ এপ্রিল ২০২৬",
  },
];

export function AwarenessCampaign() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((next + POSTERS.length) % POSTERS.length);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating]
  );

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % POSTERS.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

  const handleNav = (dir: 1 | -1) => {
    go(current + dir);
    startAuto();
  };

  const handleDot = (i: number) => {
    go(i);
    startAuto();
  };

  const openModal = (i: number) => {
    setModalIdx(i);
    setModalOpen(true);
  };

  const poster = POSTERS[current];

  return (
    <>
      <section className="bg-white border border-[#0B6B3A]/15 rounded-lg overflow-hidden mb-4 shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B6B3A] to-[#085530] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Megaphone size={18} />
            <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
              জনসচেতনতামূলক নোটিশ ও প্রচারণা
            </h2>
          </div>
          <span
            className="text-white/80 px-2 py-0.5 rounded-full bg-white/15"
            style={{ fontSize: "12px" }}
          >
            মোট {POSTERS.length}টি প্রচারণা
          </span>
        </div>

        <div className="p-4">
          {/* Main slider */}
          <div className="relative rounded-xl overflow-hidden select-none" style={{ height: "320px" }}>
            {/* Slides */}
            {POSTERS.map((p, i) => (
              <div
                key={p.id}
                className={`absolute inset-0 transition-opacity duration-400 ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{ transitionDuration: "400ms" }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${p.bg} flex flex-col items-center justify-center px-10 py-8 text-center relative`}>
                  {/* Background watermark */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-5 text-white pointer-events-none"
                    style={{ fontSize: "200px" }}
                  >
                    {p.icon}
                  </div>

                  {/* Badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-white mb-4 relative z-10"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: p.accent,
                      color: "#1a1a1a",
                    }}
                  >
                    {p.badge}
                  </span>

                  {/* Icon */}
                  <div className="text-6xl mb-4 relative z-10">{p.icon}</div>

                  {/* Title */}
                  <h3
                    className="text-white relative z-10"
                    style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1.25, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    {p.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-white/85 mt-3 max-w-lg relative z-10"
                    style={{ fontSize: "14px", lineHeight: 1.75 }}
                  >
                    {p.subtitle}
                  </p>

                  {/* Date & zoom */}
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
                    <span className="text-white/60" style={{ fontSize: "11px" }}>
                      {p.date}
                    </span>
                    <button
                      onClick={() => openModal(i)}
                      className="flex items-center gap-1 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 transition-colors"
                      style={{ fontSize: "12px" }}
                    >
                      <ZoomIn size={13} />
                      বড় করে দেখুন
                    </button>
                  </div>

                  {/* Gold bottom border */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: p.accent }}
                  />
                </div>
              </div>
            ))}

            {/* Left arrow */}
            <button
              onClick={() => handleNav(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => handleNav(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {POSTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "8px",
                    height: "8px",
                    backgroundColor: i === current ? "#C8A34D" : "rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-3 grid grid-cols-6 gap-2">
            {POSTERS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => handleDot(i)}
                className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                  i === current
                    ? "ring-2 ring-[#C8A34D] ring-offset-1 scale-105"
                    : "opacity-60 hover:opacity-90"
                }`}
                style={{ height: "56px" }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${p.bg} flex flex-col items-center justify-center`}
                >
                  <span style={{ fontSize: "18px" }}>{p.icon}</span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-1 py-0.5"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
                >
                  <p
                    className="text-white truncate text-center"
                    style={{ fontSize: "9px", lineHeight: 1.2 }}
                  >
                    {p.badge}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full-size modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal slide */}
            <div
              className={`w-full bg-gradient-to-br ${POSTERS[modalIdx].bg} flex flex-col items-center justify-center px-12 py-16 text-center`}
            >
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full mb-5"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  backgroundColor: POSTERS[modalIdx].accent,
                  color: "#1a1a1a",
                }}
              >
                {POSTERS[modalIdx].badge}
              </span>
              <div className="text-7xl mb-5">{POSTERS[modalIdx].icon}</div>
              <h3
                className="text-white"
                style={{ fontSize: "34px", fontWeight: 800, lineHeight: 1.2, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
              >
                {POSTERS[modalIdx].title}
              </h3>
              <p
                className="text-white/85 mt-4 max-w-md"
                style={{ fontSize: "15px", lineHeight: 1.8 }}
              >
                {POSTERS[modalIdx].subtitle}
              </p>
              <p
                className="text-white/50 mt-6"
                style={{ fontSize: "12px" }}
              >
                বগুড়া সিটি কর্পোরেশন • {POSTERS[modalIdx].date}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: POSTERS[modalIdx].accent }}
              />
            </div>

            {/* Modal nav */}
            <button
              onClick={() => setModalIdx((modalIdx - 1 + POSTERS.length) % POSTERS.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => setModalIdx((modalIdx + 1) % POSTERS.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
