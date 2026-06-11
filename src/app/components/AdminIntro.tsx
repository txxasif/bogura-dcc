import { useEffect, useState } from "react";
import { MessageSquare, Users, Building2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import adminPortrait from "../../imports/mr_islam_swadhin.jpeg";
import pmPortrait from "../../imports/tarique_rahman.png";

type Slide = {
  badge: string;
  name: string;
  designation: string;
  title: string;
  quote: string;
  portrait: string;
  primaryBtn: string;
  secondaryBtn: string;
  prestigious: boolean;
  plaqueSub: string;
};

const slides: Slide[] = [
  {
    badge: "মাননীয় প্রধানমন্ত্রীর বার্তা",
    name: "জনাব তারেক রহমান",
    designation: "মাননীয় প্রধানমন্ত্রী",
    title: "স্মার্ট ও নাগরিকবান্ধব বগুড়ার অঙ্গীকার",
    quote:
      "প্রিয় নগরবাসী, আমরা ডিজিটাল বাংলাদেশ থেকে স্মার্ট বাংলাদেশে উত্তরণের পথে এগিয়ে যাচ্ছি। বগুড়া সিটি কর্পোরেশন হবে এই রূপান্তরের একটি উজ্জ্বল দৃষ্টান্ত — যেখানে প্রযুক্তি ও মানবিক সেবার সমন্বয়ে নাগরিক জীবন সহজ, স্বচ্ছ ও সমৃদ্ধ হবে। একসাথে গড়ে তুলব আগামীর বগুড়া।",
    portrait: pmPortrait,
    primaryBtn: "প্রধানমন্ত্রীর বার্তা",
    secondaryBtn: "ভিশন ২০৪১",
    prestigious: true,
    plaqueSub: "মাননীয় প্রধানমন্ত্রী, গণপ্রজাতন্ত্রী বাংলাদেশ",
  },
  {
    badge: "প্রশাসকের বার্তা",
    name: "জনাব এম আর ইসলাম স্বাধীন",
    designation: "বগুড়া সিটি কর্পোরেশনের প্রধান প্রশাসক",
    title: "নাগরিক সেবায় আমাদের অঙ্গীকার",
    quote:
      "প্রিয় নগরবাসী, বগুড়া সিটি কর্পোরেশনের প্রথম প্রশাসক হিসেবে দায়িত্ব গ্রহণ করতে পেরে আমি নিজেকে আপনাদের অংশীদার মনে করি — স্বচ্ছ ও জবাবদিহিমূলক প্রশাসন, নাগরিকবান্ধব পরিষেবা এবং একটি আধুনিক, পরিচ্ছন্ন ও পরিকল্পিত নগর গড়ে তোলা আমাদের লক্ষ্য। ডিজিটাল কর্মপদ্ধতি, অবকাঠামোগত উন্নয়ন এবং নাগরিক অংশগ্রহণের ভিত্তিতে আমরা একসাথে এগিয়ে যাব।",
    portrait: adminPortrait,
    primaryBtn: "প্রশাসকের বার্তা",
    secondaryBtn: "নাগরিক সেবা",
    prestigious: false,
    plaqueSub: "বগুড়া সিটি কর্পোরেশনের প্রথম প্রশাসক",
  },
];

function PortraitFrame({ slide }: { slide: Slide }) {
  const prestigious = slide.prestigious;
  return (
    <div className="relative">
      {/* Outer glow */}
      {prestigious && (
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[28px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(200,163,77,0.18) 0%, rgba(11,107,58,0.10) 45%, transparent 75%)",
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Outer frame */}
      <div
        className="relative rounded-[20px] p-2"
        style={{
          background: prestigious
            ? "linear-gradient(145deg, #ffffff 0%, #faf6ec 50%, #ffffff 100%)"
            : "#ffffff",
          boxShadow: prestigious
            ? "0 20px 50px -20px rgba(11,107,58,0.35), 0 4px 14px rgba(0,0,0,0.08)"
            : "0 12px 30px -12px rgba(11,107,58,0.25), 0 2px 8px rgba(0,0,0,0.06)",
          border: prestigious ? "1px solid rgba(200,163,77,0.5)" : "1px solid rgba(11,107,58,0.15)",
        }}
      >
        {/* Inner frame (double-layer for PM) */}
        <div
          className="rounded-[14px] p-3 relative overflow-hidden"
          style={{
            border: prestigious
              ? "1px solid rgba(200,163,77,0.7)"
              : "1px solid rgba(11,107,58,0.18)",
            background: prestigious
              ? "linear-gradient(180deg, #ffffff 0%, #f6faf6 100%)"
              : "#ffffff",
          }}
        >
          {/* Geometric pattern background (PM only) */}
          {prestigious && (
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="bdpat" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path
                    d="M14 2 L26 14 L14 26 L2 14 Z M14 8 L20 14 L14 20 L8 14 Z"
                    fill="none"
                    stroke="#0B6B3A"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bdpat)" />
            </svg>
          )}

          {/* Corner accents */}
          {[
            { top: 6, left: 6, rot: 0 },
            { top: 6, right: 6, rot: 90 },
            { bottom: 6, right: 6, rot: 180 },
            { bottom: 6, left: 6, rot: 270 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                ...pos,
                transform: `rotate(${pos.rot}deg)`,
                width: 22,
                height: 22,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 22,
                  height: 2,
                  background: prestigious ? "#C8A34D" : "#0B6B3A",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 2,
                  height: 22,
                  background: prestigious ? "#C8A34D" : "#0B6B3A",
                }}
              />
              {prestigious && (
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    width: 6,
                    height: 6,
                    background: "#0B6B3A",
                    transform: "rotate(45deg)",
                  }}
                />
              )}
            </div>
          ))}

          {/* Portrait image */}
          <div
            className="relative rounded-[10px] overflow-hidden"
            style={{
              aspectRatio: prestigious ? "4 / 5.2" : "4 / 5",
              border: prestigious ? "1px solid rgba(200,163,77,0.4)" : "1px solid rgba(11,107,58,0.12)",
            }}
          >
            <ImageWithFallback
              src={slide.portrait}
              alt={slide.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Plaque under photo */}
          <div
            className="mt-3 rounded-[8px] text-center px-3 py-3 relative"
            style={{
              background: prestigious
                ? "linear-gradient(180deg, #0B6B3A 0%, #094f2b 100%)"
                : "linear-gradient(180deg, #0B6B3A 0%, #095830 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.12)",
              border: prestigious ? "1px solid rgba(200,163,77,0.55)" : "1px solid rgba(11,107,58,0.3)",
            }}
          >
            {prestigious && (
              <>
                <div
                  className="absolute left-3 right-3"
                  style={{ top: 4, height: 1, background: "rgba(200,163,77,0.7)" }}
                />
                <div
                  className="absolute left-3 right-3"
                  style={{ bottom: 4, height: 1, background: "rgba(200,163,77,0.5)" }}
                />
              </>
            )}
            <div className="text-white" style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "0.2px" }}>
              {slide.name}
            </div>
            <div
              style={{
                color: prestigious ? "#E8D9A8" : "#cfe6d8",
                fontSize: "11px",
                lineHeight: 1.5,
                marginTop: 3,
              }}
            >
              {slide.plaqueSub}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminIntro() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  }

  function goTo(i: number) {
    setIndex(i);
    setAnimKey((k) => k + 1);
  }

  const slide = slides[index];

  return (
    <section className="bg-[#f4f6f2] border-b border-[#0B6B3A]/15 relative overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #0B6B3A 0%, transparent 40%), radial-gradient(circle at 80% 70%, #C8A34D 0%, transparent 40%)",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-4 py-10 lg:py-14 relative">
        {/* Carousel container */}
        <div className="relative">
          {/* Slide */}
          <div
            key={animKey}
            className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 lg:gap-4 items-center px-2 lg:px-10"
            style={{ animation: "ai-fade 0.6s ease-out" }}
          >
            {/* LEFT: Portrait */}
            <div className="max-w-[320px] w-full mx-auto lg:mx-0">
              <PortraitFrame slide={slide} />
            </div>

            {/* RIGHT: Content */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "#e8f1ea",
                  border: "1px solid rgba(11,107,58,0.25)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#0B6B3A",
                    display: "inline-block",
                  }}
                />
                <span className="text-[#0B6B3A]" style={{ fontSize: "12.5px", fontWeight: 600 }}>
                  {slide.badge}
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-[#0B6B3A] mt-4"
                style={{ fontSize: "30px", fontWeight: 800, lineHeight: 1.25 }}
              >
                {slide.title}
              </h2>

              {/* Designation line */}
              <div
                className="mt-2 text-[#666]"
                style={{ fontSize: "13.5px", fontWeight: 500 }}
              >
                <span style={{ color: "#0B6B3A", fontWeight: 700 }}>{slide.name}</span>
                <span className="mx-2 text-[#C8A34D]">|</span>
                {slide.designation}
              </div>

              {/* Quote with gold accent */}
              <div className="mt-5 pl-5 border-l-[3px] border-[#C8A34D]">
                <p className="text-[#444]" style={{ fontSize: "14px", lineHeight: 1.85 }}>
                  {slide.quote}
                </p>
              </div>

              {/* Action buttons */}
              

              {/* Info cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: MessageSquare, label: "স্বচ্ছ প্রশাসন" },
                  { icon: Users, label: "নাগরিক সেবা" },
                  { icon: Building2, label: "উন্নয়ন কার্যক্রম" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 border border-[#0B6B3A]/12 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#eef5f0", color: "#0B6B3A" }}
                    >
                      <Icon size={14} />
                    </span>
                    <span className="text-[#333]" style={{ fontSize: "12.5px", fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`স্লাইড ${i + 1}`}
                className="transition-all"
                style={{
                  width: i === index ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === index ? "#0B6B3A" : "rgba(11,107,58,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ai-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
