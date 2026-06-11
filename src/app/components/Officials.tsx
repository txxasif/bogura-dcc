import tariqueRahmanImage from "../../imports/tarique_rahman.png";
import mrIslamSwadhinImage from "../../imports/mr_islam_swadhin.jpeg";
import muhammadSaidAliImage from "../../imports/muhammad_said_ali.jpg";
import popiKhatunImage from "../../imports/popi_khatun.jpg";
import mdRezaulKarimImage from "../../imports/md_rezaul_karim.jpg";

type Official = { name: string; role: string; sub: string; img: string };

const officials: Official[] = [
  {
    name: "জনাব তারেক রহমান",
    role: "মাননীয় প্রধানমন্ত্রী",
    sub: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
    img: tariqueRahmanImage,
  },
  {
    name: "জনাব এম আর ইসলাম স্বাধীন",
    role: "প্রশাসক",
    sub: "বগুড়া সিটি কর্পোরেশন",
    img: mrIslamSwadhinImage,
  },
  {
    name: "মুহাম্মদ সাইদ আলী",
    role: "প্রধান নির্বাহী কর্মকর্তা",
    sub: "বগুড়া সিটি কর্পোরেশন",
    img: muhammadSaidAliImage,
  },
  {
    name: "পপি খাতুন",
    role: "সচিব",
    sub: "বগুড়া সিটি কর্পোরেশন",
    img: popiKhatunImage,
  },
  {
    name: "মোঃ রেজাউল করিম",
    role: "নির্বাহী কর্মকর্তা",
    sub: "বগুড়া সিটি কর্পোরেশন",
    img: mdRezaulKarimImage,
  },
];

export function Officials() {
  return (
    <div className="flex flex-col gap-4">
      {officials.map((o) => (
        <div
          key={o.name}
          className="bg-white rounded-xl overflow-hidden relative"
          style={{
            border: "1px solid rgba(11,107,58,0.18)",
            boxShadow:
              "0 6px 18px -8px rgba(11,107,58,0.18), 0 2px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Role ribbon */}
          <div
            className="text-white text-center py-2 px-2 relative"
            style={{
              background: "linear-gradient(180deg, #0B6B3A 0%, #095830 100%)",
              fontSize: "12.5px",
              fontWeight: 700,
              letterSpacing: "0.2px",
              boxShadow: "inset 0 -2px 0 0 #C8A34D",
            }}
          >
            {o.role}
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col items-center">
            {/* Portrait frame */}
            <div className="relative w-full">
              {/* gold outer frame */}
              <div
                className="rounded-[10px] p-[3px]"
                style={{
                  background:
                    "linear-gradient(145deg, #C8A34D 0%, #e7cf90 50%, #C8A34D 100%)",
                  boxShadow: "0 6px 14px -6px rgba(11,107,58,0.35)",
                }}
              >
                <div
                  className="rounded-[8px] overflow-hidden bg-white w-full"
                  style={{
                    aspectRatio: "4 / 5",
                    border: "2px solid #ffffff",
                  }}
                >
                  <img
                    src={o.img}
                    alt={o.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* corner accents */}
              {[
                { top: -4, left: -4 },
                { top: -4, right: -4 },
                { bottom: -4, left: -4 },
                { bottom: -4, right: -4 },
              ].map((pos, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    ...pos,
                    width: 10,
                    height: 10,
                    background: "#0B6B3A",
                    borderRadius: 2,
                    border: "1.5px solid #C8A34D",
                  }}
                />
              ))}
            </div>

            {/* Name plaque */}
            <div
              className="mt-4 w-full rounded-md text-center px-3 py-2"
              style={{
                background: "#f4f8f5",
                border: "1px solid rgba(11,107,58,0.15)",
              }}
            >
              <p
                className="text-[#0B6B3A]"
                style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.35 }}
              >
                {o.name}
              </p>
              <p
                className="text-[#555] mt-0.5"
                style={{ fontSize: "11px", lineHeight: 1.4 }}
              >
                {o.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
