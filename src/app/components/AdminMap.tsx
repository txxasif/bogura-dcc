import image_Screenshot_2026_06_10_at_5_18_42_PM from '@/imports/Screenshot_2026-06-10_at_5.18.42_PM.png'
import image_Bogura from '@/imports/Bogura.jpg'
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AdminMap() {
  return (
    <section className="max-w-[1180px] mx-auto px-3 py-6">
      <div className="bg-[#0a6b3c] text-white px-3 py-2 rounded-t text-[13px]" style={{ fontWeight: 600 }}>বগুড়া সিটি কর্পোরেশনের মানচিত্র</div>
      <div className="border border-gray-200 rounded-b bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ImageWithFallback
            src={image_Screenshot_2026_06_10_at_5_18_42_PM}
            alt="Bogura Municipality administrative map"
            className="w-full h-[360px] object-cover rounded"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-[#0a6b3c] text-[13px]" style={{ fontWeight: 600 }}>International Co-operation & Networking</h4>
          <div className="grid grid-cols-2 gap-2">
            {["CITYNET", "C40 CITIES", "WeGO", "UNISDR", "ICLEI", "UN-Habitat"].map((b) => (
              <div key={b} className="border border-gray-200 rounded p-3 flex items-center justify-center text-[11px] text-gray-700 bg-white" style={{ fontWeight: 600 }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
