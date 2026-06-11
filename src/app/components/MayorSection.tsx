type Person = { name: string; role: string; img: string };

const people: Person[] = [
  {
    name: "শেখ ফজলে নূর তাপস",
    role: "মাননীয় মেয়র",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=500&fit=crop",
  },
  {
    name: "মোঃ মোস্তাফিজুর রহমান",
    role: "প্রধান নির্বাহী কর্মকর্তা",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
  },
  {
    name: "প্রকৌঃ আব্দুর রউফ",
    role: "প্রধান প্রকৌশলী",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
];

export function MayorSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {people.map((p) => (
        <div key={p.name} className="bg-white border border-gray-200 rounded-md overflow-hidden flex shadow-sm">
          <img src={p.img} alt={p.name} className="w-28 h-32 object-cover" />
          <div className="p-3 flex flex-col justify-center">
            <p className="text-[#0a6b3c]" style={{ fontSize: '14px', fontWeight: 600 }}>{p.name}</p>
            <p className="text-gray-600" style={{ fontSize: '12px' }}>{p.role}</p>
            <button className="mt-2 text-[12px] text-[#0a6b3c] underline self-start">বিস্তারিত →</button>
          </div>
        </div>
      ))}
    </section>
  );
}
