import { Building, Users, FileWarning, Scroll, Handshake, MessageSquareWarning, BookOpen, Shield } from "lucide-react";

const cards = [
  {
    icon: Building, title: "সিটি কর্পোরেশন পরিচিতি",
    items: ["ইতিহাস ও ঐতিহ্য", "এক নজরে বগুড়া সিটি কর্পোরেশন", "সিটিজেন চার্টার", "অর্গানোগ্রাম"],
  },
  {
    icon: Users, title: "জনপ্রতিনিধি ও কর্মকর্তাবৃন্দ",
    items: ["মেয়র", "প্যানেল মেয়র", "কাউন্সিলরবৃন্দ", "নির্বাহী কর্মকর্তাবৃন্দ"],
  },
  {
    icon: FileWarning, title: "অফিস আদেশ/বিজ্ঞপ্তি/পরিপত্র",
    items: ["অফিস আদেশ", "বিজ্ঞপ্তি ও পরিপত্র", "নোটিফিকেশন", "নিয়োগ বিজ্ঞপ্তি"],
  },
  {
    icon: Scroll, title: "সিটি কর্পোরেশন আদেশ",
    items: ["অনাপত্তি সনদ (NOC)", "বদলি/পদায়ন আদেশ", "ছাড়পত্র", "যোগদান পত্র"],
  },
  {
    icon: Handshake, title: "বার্ষিক কর্মসম্পাদন চুক্তি (APA)",
    items: ["এপিএ দলিল", "ত্রৈমাসিক প্রতিবেদন", "মূল্যায়ন প্রতিবেদন", "এপিএএমএস সফটওয়্যার লিংক"],
  },
  {
    icon: MessageSquareWarning, title: "অভিযোগ প্রতিকার ব্যবস্থাপনা (GRS)",
    items: ["আইনি কাঠামো", "নির্দেশিকা ও পরিপত্র", "অভিযোগ নিষ্পত্তি কর্মকর্তা", "অনলাইনে অভিযোগ দাখিল"],
  },
  {
    icon: BookOpen, title: "আইন, বিধি, নীতিমালা",
    items: ["সিটি কর্পোরেশন আইন ২০০৯", "সিটি কর্পোরেশন (ট্যাক্স) বিধি", "নীতিমালা", "বাংলাদেশ গেজেট"],
  },
  {
    icon: Shield, title: "জাতীয় শুদ্ধাচার কৌশল (NIS)",
    items: ["শুদ্ধাচার কর্মপরিকল্পনা", "নৈতিকতা কমিটি", "সভার কার্যবিবরণী", "ত্রৈমাসিক অগ্রগতি প্রতিবেদন"],
  },
];

export function InfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      {cards.map(({ icon: Icon, title, items }) => (
        <div key={title} className="bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <div className="w-8 h-8 rounded bg-[#f4faf6] flex items-center justify-center">
              <Icon size={16} className="text-[#0a6b3c]" />
            </div>
            <h4 className="text-[#0a6b3c]" style={{ fontSize: '13px', fontWeight: 600 }}>{title}</h4>
          </div>
          <ul className="px-4 py-2 space-y-1">
            {items.map((it) => (
              <li key={it} className="text-[12px] text-gray-700 flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#0a6b3c] mt-1.5 shrink-0" />
                <a href="#" className="hover:text-[#0a6b3c]">{it}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
