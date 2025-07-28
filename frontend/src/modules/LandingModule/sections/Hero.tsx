import Section from "@/components/ui/section";

export default function Hero() {
  return (
    <Section>
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="font-bebas-neue text-6xl max-md:text-4xl text-center text-stone-900">
          SKIP NGODING, <br /> YUK CHATTING!
        </h1>
        <p className="font-roboto-flex text-center max-w-96 max-lg:max-w-84 text-stone-500">
          Bem Chatting adalah tempat ngobrol khusus buat anak-anak BEM — biar
          koordinasi kegiatan, rapat divisi, atau sekadar diskusi jadi makin
          lancar dan seru.
        </p>
      </div>
      <img src="/panda-sleep.png" alt="panda" className="w-80 h-auto mt-8" />
      <img
        src="/panda-sit.png"
        alt="panda"
        className="absolute w-62 h-auto translate-x-108 translate-y-20 rotate-y-180 max-lg:hidden"
      />
      <img
        src="/panda-happy.png"
        alt="panda"
        className="absolute w-78 h-auto -translate-x-108 translate-y-20 max-lg:hidden"
      />
    </Section>
  );
}
