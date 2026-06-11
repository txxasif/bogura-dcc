import {
  Home, Lightbulb, Building2, Hospital, Signpost, Store, Sprout,
  HeartHandshake, Bus, Bath, Users, HandHeart, Car, TreePine,
  Trash2, ShieldAlert, HeartPulse,
} from "lucide-react";

const services = [
  { icon: Home, label: "হোল্ডিং ট্যাক্স" },
  { icon: Store, label: "ট্রেড লাইসেন্স" },
  { icon: HandHeart, label: "জন্ম নিবন্ধন" },
  { icon: ShieldAlert, label: "মৃত্যু নিবন্ধন" },
  { icon: Building2, label: "নাগরিক সনদ" },
  { icon: Users, label: "ওয়ারিশ সনদ" },
  { icon: Lightbulb, label: "সড়ক বাতি" },
  { icon: Trash2, label: "বর্জ্য ব্যবস্থাপনা" },
  { icon: Bath, label: "পয়ঃনিষ্কাশন" },
  { icon: Sprout, label: "পানি সরবরাহ" },
  { icon: Signpost, label: "রাস্তাঘাট সংস্কার" },
  { icon: HeartPulse, label: "স্বাস্থ্য সেবা" },
  { icon: Hospital, label: "মাতৃত্ব সেবা" },
  { icon: TreePine, label: "পার্ক ও নার্সারি" },
  { icon: Bus, label: "বাস টার্মিনাল" },
  { icon: Car, label: "যানবাহন রেজিস্ট্রেশন" },
  { icon: HeartHandshake, label: "অভিযোগ কর্নার" },
];

export function ServicesGrid() {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm mt-3">
      <div className="px-3 py-2 border-b border-gray-200">
        <h3 className="text-[#0a6b3c]" style={{ fontSize: '14px', fontWeight: 600 }}>পরিসেবা</h3>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-3">
        {services.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-[#f4faf6] group">
            <div className="w-12 h-12 rounded border-2 border-[#0a6b3c]/30 flex items-center justify-center group-hover:border-[#0a6b3c] group-hover:bg-[#0a6b3c]/10">
              <Icon size={22} className="text-[#0a6b3c]" />
            </div>
            <span className="text-[10px] text-gray-700 text-center leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
