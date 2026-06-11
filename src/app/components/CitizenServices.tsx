import image_e1424d29_8307_452e_8fd6_a7e3c26309a1 from '@/imports/e1424d29-8307-452e-8fd6-a7e3c26309a1.jpg'
import image_WhatsApp_Image_2026_06_04_at_12_55_56_AM_1 from '@/imports/WhatsApp_Image_2026-06-04_at_12.55.56_AM-1.jpeg'
import { useState, useMemo } from "react";
import {
  Search,
  Building2,
  Receipt,
  HardHat,
  HeartPulse,
  FileText,
  Clock,
  FileCheck2,
  Wallet,
  UserCog,
  Phone,
  ZoomIn,
  X,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import charterImage from "../../imports/screencapture-dscc-gov-bd-2026-06-02-13_10_25.png";

type Service = {
  id: string;
  name: string;
  time: string;
  documents: string[];
  fee: string;
  officer: string;
  contact: string;
};

type Category = {
  id: string;
  label: string;
  icon: typeof Building2;
  services: Service[];
};

const CATEGORIES: Category[] = [
  {
    id: "admin",
    label: "প্রশাসনিক সেবা",
    icon: Building2,
    services: [
      {
        id: "a3",
        name: "নাগরিকত্ব সনদপত্র",
        time: "৩ কার্যদিবস",
        documents: ["এনআইডি কপি", "হোল্ডিং ট্যাক্স পরিশোধের প্রমাণ", "ছবি ২ কপি"],
        fee: "১০০ টাকা",
        officer: "সচিব / সংশ্লিষ্ট কাউন্সিলর",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "a4",
        name: "ওয়ারিশান সনদ",
        time: "৭ কার্যদিবস",
        documents: ["মৃত্যু সনদ", "এনআইডি কপি", "পারিবারিক তথ্য", "স্থানীয় তদন্ত প্রতিবেদন"],
        fee: "২০০ টাকা",
        officer: "সচিব",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "a5",
        name: "চারিত্রিক সনদপত্র",
        time: "৩ কার্যদিবস",
        documents: ["এনআইডি কপি", "ছবি ১ কপি"],
        fee: "১০০ টাকা",
        officer: "সংশ্লিষ্ট কাউন্সিলর",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
    ],
  },
  {
    id: "revenue",
    label: "রাজস্ব ও লাইসেন্স সেবা",
    icon: Receipt,
    services: [
      {
        id: "r1",
        name: "হোল্ডিং ট্যাক্স পরিশোধ",
        time: "তাৎক্ষণিক",
        documents: ["হোল্ডিং নম্বর", "পূর্ববর্তী রসিদ"],
        fee: "এসেসমেন্ট অনুযায়ী",
        officer: "কর নির্ধারণ কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "r2",
        name: "ট্রেড লাইসেন্স (নতুন)",
        time: "৭ কার্যদিবস",
        documents: ["এনআইডি", "ভাড়ার চুক্তিপত্র / মালিকানা দলিল", "ছবি ২ কপি", "টিআইএন (প্রযোজ্য ক্ষেত্রে)"],
        fee: "ব্যবসার ধরন অনুযায়ী ৫০০–১০,০০০ টাকা",
        officer: "লাইসেন্স পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "r3",
        name: "ট্রেড লাইসেন্স নবায়ন",
        time: "৩ কার্যদিবস",
        documents: ["পূর্ববর্তী লাইসেন্সের মূল কপি"],
        fee: "ব্যবসার ধরন অনুযায়ী",
        officer: "লাইসেন্স পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "r4",
        name: "রিকশা / ভ্যান লাইসেন্স",
        time: "৫ কার্যদিবস",
        documents: ["এনআইডি", "ছবি ২ কপি", "ঠিকানার প্রমাণ"],
        fee: "৩০০ টাকা (বার্ষিক)",
        officer: "লাইসেন্স পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "r5",
        name: "বিজ্ঞাপন / সাইনবোর্ড অনুমতি",
        time: "৭ কার্যদিবস",
        documents: ["আবেদনপত্র", "ডিজাইন কপি", "অবস্থানের ছবি"],
        fee: "বর্গফুট অনুযায়ী নির্ধারিত",
        officer: "রাজস্ব কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
    ],
  },
  {
    id: "engineering",
    label: "প্রকৌশল সেবা",
    icon: HardHat,
    services: [
      {
        id: "e1",
        name: "ভবন নির্মাণের অনুমোদন",
        time: "৪৫ কার্যদিবস",
        documents: ["জমির দলিল", "নকশা (৪ সেট)", "মৃত্তিকা পরীক্ষা প্রতিবেদন", "এনআইডি"],
        fee: "বর্গফুট অনুযায়ী নির্ধারিত",
        officer: "নির্বাহী প্রকৌশলী",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "e2",
        name: "রাস্তা কাটার অনুমতি",
        time: "৭ কার্যদিবস",
        documents: ["আবেদনপত্র", "নকশা", "জামানত প্রদানের রসিদ"],
        fee: "প্রতি বর্গমিটার নির্ধারিত হার",
        officer: "উপ-সহকারী প্রকৌশলী",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "e3",
        name: "পানির সংযোগ",
        time: "১৫ কার্যদিবস",
        documents: ["হোল্ডিং নম্বর", "এনআইডি", "মালিকানা প্রমাণ"],
        fee: "সংযোগ ফি + মাসিক বিল",
        officer: "পানি সরবরাহ শাখা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "e4",
        name: "ড্রেন / স্যানিটেশন মেরামত",
        time: "৭ কার্যদিবস",
        documents: ["আবেদনপত্র", "অবস্থানের তথ্য"],
        fee: "বিনামূল্যে",
        officer: "পরিচ্ছন্নতা পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "e5",
        name: "সড়ক বাতি স্থাপন / মেরামত",
        time: "১০ কার্যদিবস",
        documents: ["আবেদনপত্র"],
        fee: "বিনামূল্যে",
        officer: "বৈদ্যুতিক শাখা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
    ],
  },
  {
    id: "health",
    label: "স্বাস্থ্য সেবা",
    icon: HeartPulse,
    services: [
      {
        id: "h_birth",
        name: "জন্ম নিবন্ধন সনদ",
        time: "৭ কার্যদিবস",
        documents: ["পিতা-মাতার এনআইডি", "টিকা কার্ড", "হাসপাতাল ছাড়পত্র", "নাগরিকত্ব সনদ"],
        fee: "৫০ টাকা (০-৪৫ দিন: বিনামূল্যে)",
        officer: "নিবন্ধক কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "h_death",
        name: "মৃত্যু নিবন্ধন সনদ",
        time: "৫ কার্যদিবস",
        documents: ["মৃত ব্যক্তির এনআইডি", "চিকিৎসকের সনদ", "আবেদনকারীর এনআইডি"],
        fee: "৫০ টাকা",
        officer: "নিবন্ধক কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "h1",
        name: "টিকাদান কর্মসূচি (EPI)",
        time: "নির্ধারিত দিনে",
        documents: ["শিশুর টিকা কার্ড"],
        fee: "বিনামূল্যে",
        officer: "স্বাস্থ্য পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "h2",
        name: "মশক নিধন কার্যক্রম",
        time: "নির্ধারিত সূচি",
        documents: ["প্রযোজ্য নয়"],
        fee: "বিনামূল্যে",
        officer: "মশক নিয়ন্ত্রণ পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "h3",
        name: "খাদ্যদ্রব্যের মান পরীক্ষা",
        time: "অভিযোগের ৩ দিনের মধ্যে",
        documents: ["লিখিত অভিযোগ"],
        fee: "বিনামূল্যে",
        officer: "স্বাস্থ্য কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "h4",
        name: "জন্মনিয়ন্ত্রণ ও মাতৃসেবা",
        time: "তাৎক্ষণিক",
        documents: ["এনআইডি"],
        fee: "বিনামূল্যে",
        officer: "পরিবার কল্যাণ পরিদর্শিকা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
    ],
  },
  {
    id: "other",
    label: "অন্যান্য নাগরিক সেবা",
    icon: FileText,
    services: [
      {
        id: "o1",
        name: "বর্জ্য সংগ্রহ / পরিচ্ছন্নতা",
        time: "প্রতিদিন",
        documents: ["প্রযোজ্য নয়"],
        fee: "মাসিক ফি অন্তর্ভুক্ত",
        officer: "পরিচ্ছন্নতা পরিদর্শক",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "o2",
        name: "কবরস্থান / শ্মশান ব্যবস্থাপনা",
        time: "তাৎক্ষণিক",
        documents: ["মৃত্যু সনদ", "এনআইডি"],
        fee: "নির্ধারিত হার",
        officer: "সংশ্লিষ্ট কাউন্সিলর",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "o3",
        name: "অভিযোগ ও পরামর্শ গ্রহণ",
        time: "৭ কার্যদিবসের মধ্যে নিষ্পত্তি",
        documents: ["লিখিত অভিযোগ / অনলাইন ফর্ম"],
        fee: "বিনামূল্যে",
        officer: "অভিযোগ নিষ্পত্তি কর্মকর্তা",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
      {
        id: "o4",
        name: "জরুরি দুর্যোগ সহায়তা",
        time: "তাৎক্ষণিক",
        documents: ["এনআইডি"],
        fee: "বিনামূল্যে",
        officer: "দুর্যোগ ব্যবস্থাপনা সেল",
        contact: "+৮৮০ ১৭xx-xxxxxx",
      },
    ],
  },
];

export function CitizenServices() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((c) => ({
      ...c,
      services: c.services.filter((s) => {
        if (activeCat !== "all" && c.id !== activeCat) return false;
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) ||
          s.officer.toLowerCase().includes(q) ||
          s.documents.join(" ").toLowerCase().includes(q)
        );
      }),
    })).filter((c) => c.services.length > 0);
  }, [query, activeCat]);

  const totalServices = CATEGORIES.reduce((n, c) => n + c.services.length, 0);

  return (
    <section className="bg-white border border-[#0a6b3c]/15 rounded-lg overflow-hidden mb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a6b3c] to-[#085530] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <FileCheck2 size={18} />
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>নাগরিক সেবা</h2>
        </div>
        <span className="text-white/90 px-2 py-0.5 rounded-full bg-white/15" style={{ fontSize: "12px" }}>
          মোট {totalServices.toLocaleString("bn-BD")} টি সেবা
        </span>
      </div>

      {/* Search + Filters */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a6b3c]/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সেবা, কর্মকর্তা বা ডকুমেন্ট অনুসন্ধান করুন…"
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-[#0a6b3c]/20 bg-[#f8f8f3] focus:outline-none focus:border-[#0a6b3c] focus:bg-white"
            style={{ fontSize: "14px" }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[{ id: "all", label: "সব সেবা", icon: FileText }, ...CATEGORIES].map(({ id, label, icon: Icon }) => {
            const active = activeCat === id;
            return (
              <button
                key={id}
                onClick={() => setActiveCat(id)}
                className={
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors " +
                  (active
                    ? "bg-[#0a6b3c] text-white border-[#0a6b3c]"
                    : "bg-white text-[#0a3a20] border-[#0a6b3c]/25 hover:bg-[#0a6b3c]/5")
                }
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services */}
      <div className="px-4 py-4 space-y-5">
        {visible.length === 0 && (
          <div className="text-center py-8 text-[#666]" style={{ fontSize: "14px" }}>
            কোনো সেবা পাওয়া যায়নি।
          </div>
        )}

        {visible.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#0a6b3c]/15">
                <div className="w-7 h-7 rounded-full bg-[#0a6b3c]/10 flex items-center justify-center text-[#0a6b3c]">
                  <Icon size={15} />
                </div>
                <h3 className="text-[#0a3a20]" style={{ fontSize: "15px", fontWeight: 700 }}>
                  {cat.label}
                </h3>
                <span className="ml-auto text-[#666]" style={{ fontSize: "12px" }}>
                  {cat.services.length.toLocaleString("bn-BD")} টি
                </span>
              </div>

              <div className="space-y-2">
                {cat.services.map((s) => {
                  const open = openId === s.id;
                  return (
                    <div
                      key={s.id}
                      className="border border-[#0a6b3c]/15 rounded-md overflow-hidden bg-[#fafaf5]"
                    >
                      <button
                        onClick={() => setOpenId(open ? null : s.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#0a6b3c]/5"
                      >
                        <span className="text-[#0a3a20] flex-1" style={{ fontSize: "14px", fontWeight: 600 }}>
                          {s.name}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[#0a6b3c]" style={{ fontSize: "12px" }}>
                          <Clock size={12} /> {s.time}
                        </span>
                        <ChevronDown
                          size={16}
                          className={"text-[#0a6b3c] transition-transform " + (open ? "rotate-180" : "")}
                        />
                      </button>

                      {open && (
                        <div className="px-3 pb-3 pt-2 border-t border-[#0a6b3c]/10 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Field icon={Clock} label="সেবা প্রদানের সময়">{s.time}</Field>
                          <Field icon={Wallet} label="সেবা ফি">{s.fee}</Field>
                          <Field icon={UserCog} label="দায়িত্বপ্রাপ্ত কর্মকর্তা">{s.officer}</Field>
                          <Field icon={Phone} label="যোগাযোগ">{s.contact}</Field>
                          <div className="sm:col-span-2">
                            <div className="flex items-center gap-1.5 text-[#0a6b3c] mb-1" style={{ fontSize: "12px", fontWeight: 600 }}>
                              <FileText size={12} /> প্রয়োজনীয় কাগজপত্র
                            </div>
                            <ul className="list-disc list-inside text-[#333] space-y-0.5" style={{ fontSize: "13px" }}>
                              {s.documents.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Charter image */}
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-r from-[#0a6b3c]/5 to-[#c8a951]/5 border border-[#0a6b3c]/15 rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0a3a20]" style={{ fontSize: "15px", fontWeight: 700 }}>
              সম্পূর্ণ সিটিজেন চার্টার
            </h3>
            <button
              onClick={() => setZoomOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0a6b3c] text-white hover:bg-[#085530]"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              <ZoomIn size={14} /> বড় করে দেখুন
            </button>
          </div>
          <div
            className="bg-white rounded-md border border-[#0a6b3c]/15 overflow-hidden cursor-zoom-in"
            onClick={() => setZoomOpen(true)}
          >
            <ImageWithFallback
              src={image_e1424d29_8307_452e_8fd6_a7e3c26309a1}
              alt="বগুড়া সিটি কর্পোরেশন - সিটিজেন চার্টার (মূল দলিল)"
              className="w-full max-h-[480px] object-contain bg-white"
            />
          </div>
          <p className="mt-2 text-[#555] text-center" style={{ fontSize: "12px" }}>
            উপরোক্ত সকল তথ্য সিটিজেন চার্টারের আনুষ্ঠানিক দলিল থেকে গৃহীত।
          </p>
        </div>
      </div>

      {/* Zoom modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#0a6b3c] flex items-center justify-center shadow-lg"
            onClick={() => setZoomOpen(false)}
            aria-label="বন্ধ করুন"
          >
            <X size={20} />
          </button>
          <div
            className="max-w-[95vw] max-h-[90vh] overflow-auto bg-white rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={charterImage}
              alt="সিটিজেন চার্টার (পূর্ণ আকার)"
              className="w-auto h-auto max-w-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[#0a6b3c] mb-0.5" style={{ fontSize: "12px", fontWeight: 600 }}>
        <Icon size={12} /> {label}
      </div>
      <div className="text-[#333]" style={{ fontSize: "13px" }}>
        {children}
      </div>
    </div>
  );
}
