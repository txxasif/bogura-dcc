import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DengueFlyer() {
  return (
    <div className="bg-white border-4 border-[#0a6b3c] rounded-md shadow-sm mt-3 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#0a6b3c] flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2L2 9v13h6v-7h8v7h6V9z"/></svg>
          </div>
          <div>
            <p className="text-center text-[#0a6b3c]" style={{ fontSize: '18px', fontWeight: 700 }}>বগুড়া সিটি কর্পোরেশন</p>
          </div>
        </div>
        <div className="bg-[#dc2626] text-white text-center py-1.5 rounded mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>
          ডেঙ্গু ও চিকুনগুনিয়া প্রতিরোধে চাই জনসচেতনতা
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px] text-gray-800">
          <div>
            <p className="text-[#0a6b3c] mb-1" style={{ fontWeight: 600 }}>ডেঙ্গু ও চিকুনগুনিয়া কী?</p>
            <p className="leading-relaxed">
              ডেঙ্গু ও চিকুনগুনিয়া এডিস মশাবাহিত একটি ভাইরাসজনিত রোগ। এডিস মশা সাধারণত জমে থাকা পরিষ্কার পানিতে ডিম পাড়ে।
            </p>
            <p className="text-[#0a6b3c] mt-2 mb-1" style={{ fontWeight: 600 }}>ডেঙ্গু ও চিকুনগুনিয়া প্রতিরোধে করণীয়:</p>
            <ul className="space-y-1 list-decimal pl-4">
              <li>বাড়ির আশেপাশে পরিষ্কার রাখুন</li>
              <li>ফুলের টব, পানির ট্যাংক, ফ্রিজের ট্রে নিয়মিত পরিষ্কার করুন</li>
              <li>জমে থাকা পানি ফেলে দিন</li>
              <li>সম্ভব হলে মশারি ব্যবহার করুন</li>
              <li>প্রয়োজনীয় কীটনাশক স্প্রে ব্যবহার করুন</li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#dc2626] text-center" style={{ fontSize: '22px', fontWeight: 700 }}>নিয়মিত প্রতিদিন<br/>জমা পানি ফেলে দিন</p>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <ImageWithFallback src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=120&h=120&fit=crop" alt="" className="w-full h-16 object-cover rounded" />
              <ImageWithFallback src="https://images.unsplash.com/photo-1583912267550-d44c9bd6cba2?w=120&h=120&fit=crop" alt="" className="w-full h-16 object-cover rounded" />
              <ImageWithFallback src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=120&h=120&fit=crop" alt="" className="w-full h-16 object-cover rounded" />
            </div>
          </div>
        </div>
        <div className="mt-3 bg-[#fbbf24]/30 border border-[#fbbf24] text-center py-2 rounded text-[13px] text-[#0a3d22]" style={{ fontWeight: 600 }}>
          নিজ আঙিনা পরিষ্কার রাখি, সবাই মিলে সুস্থ থাকি
        </div>
      </div>
    </div>
  );
}
