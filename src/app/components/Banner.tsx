import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Banner() {
  return (
    <section className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
          <p className="opacity-80 text-[12px]">বিশেষ ঘোষণা</p>
          <h3 className="leading-tight" style={{ fontSize: '20px', fontWeight: 700 }}>
            ডেঙ্গু প্রতিরোধে সকলকে সচেতন থাকার আহ্বান
          </h3>
          <p className="opacity-90 mt-1 text-[13px]">
            নিজ ঘর ও আঙিনা পরিষ্কার রাখুন। জমে থাকা পানি ফেলে দিন। মশার বংশবিস্তার রোধে নগরবাসীর সহযোগিতা কাম্য।
          </p>
          <div className="flex gap-2 mt-3">
            <button className="bg-white text-[#991b1b] px-4 h-9 rounded text-[12px]">বিস্তারিত পড়ুন</button>
            <button className="border border-white/60 px-4 h-9 rounded text-[12px]">হটলাইনে যোগাযোগ</button>
          </div>
        </div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&h=300&fit=crop"
          alt="Awareness"
          className="w-full h-32 object-cover rounded shadow"
        />
      </div>
    </section>
  );
}
