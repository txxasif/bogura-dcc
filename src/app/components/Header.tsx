import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import cityLogo from "@/imports/logo.png";
import bg1 from "@/imports/imgi_2_boguracc.jpg";
import bg2 from "@/imports/eca97cc12762a04a7aca11b51b49c584-680e6059f13dc-20250428131717_12.19.34_AM.png";
import bg3 from "@/imports/ITS-Nota-Image-1000x600-1.png";
import bg4 from "@/imports/national_emergency_service_centre_nesc_covers_emergency_services_24_7._photo_nesc_edited.png";
import bg5 from "@/imports/imgi_6_image-267418-1745769012.jpg";

const slides = [bg1, bg2, bg3, bg4, bg5];

export function Header() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="relative overflow-hidden border-b-2 border-[#0a6b3c]">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <ImageWithFallback
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/55" />
      <div className="absolute right-3 top-3 z-10">
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 h-8 w-56 shadow-sm">
          <input placeholder="অনুসন্ধান করুন..." className="bg-transparent outline-none px-1 text-[12px] flex-1" />
          <Search size={14} className="text-[#0a6b3c]" />
        </div>
        <button className="mt-2 ml-auto block bg-[#0a6b3c] text-white px-3 py-1 rounded text-[11px] hover:bg-[#085530]">English</button>
      </div>
      <div className="relative max-w-[1180px] mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[250px]">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-[#0a6b3c] flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
            <ImageWithFallback src={cityLogo} alt="বগুড়া সিটি কর্পোরেশন লোগো" className="w-full h-full object-contain" />
          </div>
          <div className="text-center">
            <h1 className="text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontSize: '38px', fontWeight: 700 }}>
              বগুড়া সিটি কর্পোরেশন
            </h1>
            <p className="text-white/90 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" style={{ fontSize: '17px' }}>
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
