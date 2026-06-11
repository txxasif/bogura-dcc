import { Home, Info, Users, Wrench, BookOpen, FileText, Image, MoreHorizontal, ChevronDown } from "lucide-react";

const items = [
  { icon: Info, label: "সিটি কর্পোরেশন পরিচিতি" },
  { icon: Users, label: "জনপ্রতিনিধি ও কর্মকর্তাবৃন্দ" },
  { icon: Wrench, label: "নাগরিক সেবা" },
  { icon: BookOpen, label: "আইন ও বিধিমালা" },
  { icon: FileText, label: "ফরম ও ডাউনলোড" },
  { icon: Image, label: "গ্যালারী" },
];

export function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1180px] mx-auto px-3 py-2 flex items-center gap-1 flex-wrap">
        <button className="w-9 h-9 rounded bg-[#0a6b3c] text-white flex items-center justify-center hover:bg-[#085530]">
          <Home size={16} />
        </button>
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="h-9 px-3 rounded bg-[#0a6b3c] text-white flex items-center gap-1.5 hover:bg-[#085530] text-[12.5px]"
          >
            <Icon size={13} /> {label} <ChevronDown size={11} className="opacity-80" />
          </button>
        ))}
        <button className="ml-auto h-9 px-3 rounded bg-[#0a6b3c] text-white flex items-center gap-1.5 hover:bg-[#085530] text-[12.5px]">
          <MoreHorizontal size={14} /> আরও
        </button>
      </div>
    </nav>
  );
}
