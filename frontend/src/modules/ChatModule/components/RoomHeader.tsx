"use client"
import { ArrowLeft, EllipsisVertical, Phone, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  name: string;
  profilePicture: string;
};

export default function RoomHeader({ name, profilePicture }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
  
      handleResize();
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  
  return (
    <div className="flex justify-between p-3">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button
            onClick={() => router.push("/chats")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft />
          </button>
        )}
        <img
          src={
            profilePicture?.trim()
              ? profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s"
          }
          alt="icon"
          className="w-14 h-14 rounded-full"
        />
        <h1 className="font-bebas-neue text-2xl text-stone-900">
          {name ?? ""}
        </h1>
      </div>
      <div className="flex gap-3 items-center">
        <Phone />
        <Video size={28} />
        <EllipsisVertical />
      </div>
    </div>
  );
}
