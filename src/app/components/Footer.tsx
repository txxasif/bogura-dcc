import { Facebook, Youtube, Twitter, MapPin, Mail, Phone } from "lucide-react";
import footerLogo from "../../imports/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#0a3d22] text-gray-200 mt-6">
      <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#fbbf24] overflow-hidden">
              <img src={footerLogo} alt="বগুড়া সিটি কর্পোরেশন লোগো" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white text-[13px]" style={{ fontWeight: 600 }}>বগুড়া সিটি কর্পোরেশন</p>
              <p className="text-[11px] opacity-70">Bogura Municipality</p>
            </div>
          </div>
          <p className="text-[12px] opacity-80 leading-relaxed">
            নাগরিক সেবা প্রদানে অঙ্গীকারবদ্ধ। আমাদের লক্ষ্য একটি পরিচ্ছন্ন, সুন্দর ও আধুনিক বগুড়া গড়ে তোলা।
          </p>
        </div>
        <div>
          <h4 className="text-white mb-3 text-[13px]" style={{ fontWeight: 600 }}>দ্রুত লিংক</h4>
          <ul className="space-y-1.5 text-[12px] opacity-90">
            <li><a href="#" className="hover:text-[#fbbf24]">সিটি কর্পোরেশন পরিচিতি</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">মেয়র ও কাউন্সিলর</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">নাগরিক সেবা</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">নোটিশ ও বিজ্ঞপ্তি</a></li>
            <li><a href="#" className="hover:text-[#fbbf24]">অভিযোগ কর্নার</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-3 text-[13px]" style={{ fontWeight: 600 }}>যোগাযোগ</h4>
          <ul className="space-y-2 text-[12px] opacity-90">
            <li className="flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> পৌর ভবন, জলেশ্বরীতলা, বগুড়া-৫৮০০</li>
            <li className="flex gap-2"><Phone size={14} className="shrink-0" /> ০৫১-৬২২৮৮</li>
            <li className="flex gap-2"><Mail size={14} className="shrink-0" /> info@boguramunicipality.gov.bd</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-3 text-[13px]" style={{ fontWeight: 600 }}>সামাজিক যোগাযোগ</h4>
          <div className="flex gap-2">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#fbbf24] hover:text-[#0a3d22] flex items-center justify-center transition"><Facebook size={16} /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#fbbf24] hover:text-[#0a3d22] flex items-center justify-center transition"><Youtube size={16} /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#fbbf24] hover:text-[#0a3d22] flex items-center justify-center transition"><Twitter size={16} /></a>
          </div>
          <p className="text-[11px] opacity-70 mt-4">হটলাইন: ৩৩৩</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-2 text-[11px] opacity-80">
          <p>© ২০২৬ বগুড়া সিটি কর্পোরেশন। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>সাইটটি শেষ হাল-নাগাদ করা হয়েছে: বুধবার, ১০ জুন, ২০২৬ এ ১৪:৩২:৩০</p>
          <p>উন্নয়নে: তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ</p>
        </div>
      </div>
    </footer>
  );
}
