import { Users, Building2, MapPinned, Trees } from "lucide-react";

const stats = [
  { icon: Users, value: "৭০ লক্ষ+", label: "জনসংখ্যা" },
  { icon: MapPinned, value: "১০৯.১৬", label: "বর্গ কিলোমিটার" },
  { icon: Building2, value: "৭৫", label: "ওয়ার্ড" },
  { icon: Trees, value: "১০", label: "অঞ্চল" },
];

export function MapSection() {
  return (
    <section className="bg-[#f4faf6] border-y border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-[#0a6b3c]" style={{ fontSize: '20px', fontWeight: 700 }}>এক নজরে ঢাকা দক্ষিণ সিটি কর্পোরেশন</h2>
          <div className="w-12 h-0.5 bg-[#fbbf24] mt-2 mb-3" />
          <p className="text-gray-700 text-[13px] leading-relaxed">
            ঢাকা দক্ষিণ সিটি কর্পোরেশন বাংলাদেশের রাজধানী ঢাকা মহানগরীর দক্ষিণাঞ্চলের নাগরিক
            সেবা প্রদানকারী একটি স্থানীয় সরকার প্রতিষ্ঠান। এটি ২০১১ সালে গঠিত হয় এবং ৭৫টি
            ওয়ার্ড নিয়ে গঠিত।
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white rounded-md p-3 border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0a6b3c] flex items-center justify-center text-white">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[#0a6b3c]" style={{ fontSize: '16px', fontWeight: 700 }}>{value}</p>
                  <p className="text-gray-600 text-[11px]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#0a6b3c]">
            <path
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M50,30 L90,20 L130,35 L160,55 L170,90 L165,130 L140,160 L100,175 L60,165 L35,135 L25,95 L30,60 Z"
            />
            {[
              [70, 60], [100, 70], [120, 55], [85, 90], [110, 100],
              [135, 90], [95, 120], [120, 130], [80, 140], [110, 150],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#fbbf24" stroke="#0a6b3c" strokeWidth="1" />
            ))}
          </svg>
          <span className="absolute bottom-2 right-3 text-[11px] text-gray-500">ডিএসসিসি এলাকা মানচিত্র</span>
        </div>
      </div>
    </section>
  );
}
