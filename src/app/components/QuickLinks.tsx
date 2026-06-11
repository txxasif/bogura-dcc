const links = [
  "প্রধানমন্ত্রীর কার্যালয়",
  "জাতীয় তথ্য বাতায়ন",
  "নির্বাচন কমিশন",
  "ঢাকা উত্তর সিটি কর্পোরেশন",
  "স্থানীয় সরকার বিভাগ",
  "বাংলাদেশ ব্যাংক",
];

export function QuickLinks() {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="bg-[#0a6b3c] text-white px-3 py-2 rounded-t-md">
        <h3 className="text-[13px]" style={{ fontWeight: 600 }}>গুরুত্বপূর্ণ লিংক</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="block px-3 py-2 text-[12.5px] text-gray-700 hover:bg-[#f4faf6] hover:text-[#0a6b3c]">
              › {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
