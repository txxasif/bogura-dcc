import { ChevronDown } from "lucide-react";

interface Props {
  onComplaintOpen: () => void;
  onLoginOpen: () => void;
}

export function TopBar({ onComplaintOpen, onLoginOpen }: Props) {
  return (
    <div className="bg-[#0a6b3c] text-white" style={{ fontSize: '11.5px' }}>
      <div className="max-w-[1180px] mx-auto px-3 h-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" className="hover:underline">বাংলাদেশ জাতীয় তথ্য বাতায়ন</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onComplaintOpen}
            className="hover:underline flex items-center gap-1 text-white"
            style={{ fontSize: '11.5px' }}
          >
            অভিযোগ / মতামত জানিয়ে চিঠি লিখুন <ChevronDown size={10} />
          </button>
          <button onClick={onLoginOpen} className="bg-[#fbbf24] text-[#0a3d22] px-2 py-0.5 rounded-sm hover:bg-[#f59e0b] transition-colors" style={{ fontWeight: 600, fontSize: '11.5px' }}>লগইন</button>
        </div>
      </div>
    </div>
  );
}
