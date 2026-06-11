import { ClipboardList, FileText, ChevronRight } from "lucide-react";

const notices = [
  { title: "বগুড়া সিটি কর্পোরেশনের ২০২৬-২৭ অর্থবছরের বার্ষিক বাজেট ঘোষণা সংক্রান্ত বিজ্ঞপ্তি।", date: "২৮-০৫-২০২৬" },
  { title: "হোল্ডিং ট্যাক্স পুনঃনির্ধারণ ও পরিশোধ সংক্রান্ত গণবিজ্ঞপ্তি।", date: "২২-০৫-২০২৬" },
  { title: "ট্রেড লাইসেন্স নবায়নের সময়সীমা বৃদ্ধি প্রসঙ্গে নোটিশ।", date: "১৫-০৫-২০২৬" },
  { title: "পৌর এলাকায় বর্জ্য ব্যবস্থাপনা ও পরিচ্ছন্নতা সংক্রান্ত নির্দেশনা।", date: "১০-০৫-২০২৬" },
];

export function NoticeBoard() {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="px-3 py-2 border-b border-gray-200 flex items-center gap-2">
        <ClipboardList size={16} className="text-[#0a6b3c]" />
        <h3 className="text-[#0a6b3c]" style={{ fontSize: '14px', fontWeight: 600 }}>নোটিশ বোর্ড</h3>
      </div>
      <ul>
        {notices.map((n, i) => (
          <li key={i} className="px-3 py-2.5 border-b border-gray-100 last:border-b-0 flex items-start gap-2 hover:bg-gray-50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a6b3c] mt-2 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] text-gray-800 leading-snug">{n.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10.5px] text-gray-500">{n.date}</span>
                <button className="bg-[#fbbf24] text-[#0a3d22] text-[10px] px-1.5 py-0.5 rounded">ডাউনলোড</button>
              </div>
            </div>
            <ChevronRight size={14} className="text-gray-400 mt-1" />
          </li>
        ))}
      </ul>
      <div className="p-2 text-center">
        <button className="bg-[#0a6b3c] text-white text-[12px] px-4 py-1.5 rounded hover:bg-[#085530]">সকল নোটিশ দেখুন →</button>
      </div>
    </div>
  );
}
