export function Marquee() {
  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-3 py-2">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-[#dc2626] text-[13.5px]" style={{ fontWeight: 500 }}>
            বগুড়া সিটি কর্পোরেশনে অনলাইনে হোল্ডিং ট্যাক্স পরিশোধের সুবিধা চালু হয়েছে। &nbsp;&nbsp;•&nbsp;&nbsp;
            জন্ম ও মৃত্যু নিবন্ধনের জন্য সিটি কর্পোরেশন কার্যালয়ে যোগাযোগ করুন। &nbsp;&nbsp;•&nbsp;&nbsp;
            যেকোনো নাগরিক অভিযোগের জন্য কন্ট্রোল রুম: ০৫১-৬২২৮৮ এ যোগাযোগ করুন।
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%);} 100% { transform: translateX(-100%);} }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  );
}
