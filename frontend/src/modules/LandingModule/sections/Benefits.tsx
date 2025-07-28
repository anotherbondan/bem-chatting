import Section from "@/components/ui/section";
import { LucideHandshake, LucideHeart, LucideZap } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Instan & Cepat",
      caption: "Pesan dikirim secara real-time. Tidak perlu menunggu lama.",
      icon: <LucideZap color="white" size="32"/>,
    },
    {
      title: "Relasi Kuat",
      caption:
        "Bangun komunikasi yang kuat dan jalin relasi dengan banyak orang.",
      icon: <LucideHandshake color="white" size="32"/>,
    },
    {
      title: "Jatuh Cinta",
      caption: "Dicoba dulu aja atuh... Siapa tau kamu dapet jodoh kan? hehe",
      icon: <LucideHeart color="white" size="32"/>,
    },
  ];
  return (
    <Section>
      <div className="flex flex-col gap-12 justify-center items-center">
        <h1 className="font-bebas-neue text-6xl max-md:text-4xl text-center text-stone-900">WHY US?</h1>
        <div className="flex gap-10 justify-center items-center max-md:flex-col">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 justify-center items-center min-w-1/3"
            >
              <div className="flex w-16 h-16 bg-gradient rounded-full justify-center items-center">
                {benefit.icon}
              </div>
              <h2 className="text-3xl font-semibold text-stone-900">{benefit.title}</h2>
              <p className="text-center text-stone-500">{benefit.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
