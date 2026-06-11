import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import fireflyImg from "@/imports/Firefly_make_it_high_res_1.png";

const photos = [
  fireflyImg,
  "https://images.unsplash.com/photo-1545079968-1feb95494244?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop",
];

const videos = [
  { thumb: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop", title: "নগর পরিচ্ছন্নতা অভিযান" },
  { thumb: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop", title: "মেয়রের বার্তা" },
];

export function Gallery() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#0a6b3c]" style={{ fontSize: '16px', fontWeight: 700 }}>ফটো গ্যালারি</h3>
          <a href="#" className="text-[12px] text-[#0a6b3c] hover:underline">সব দেখুন →</a>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {photos.map((src, i) => (
            <ImageWithFallback key={i} src={src} alt={`Photo ${i + 1}`} className="w-full h-32 object-cover rounded" />
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#0a6b3c]" style={{ fontSize: '16px', fontWeight: 700 }}>ভিডিও গ্যালারি</h3>
          <a href="#" className="text-[12px] text-[#0a6b3c] hover:underline">সব দেখুন →</a>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {videos.map((v, i) => (
            <div key={i} className="relative rounded overflow-hidden cursor-pointer group">
              <ImageWithFallback src={v.thumb} alt={v.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition">
                <Play size={32} className="text-white" fill="white" />
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[11px] p-2">
                {v.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
