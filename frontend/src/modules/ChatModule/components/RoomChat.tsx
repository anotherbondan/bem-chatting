import BubbleChat from "@/components/ui/bubblechat";
import InputChat from "./InputChat";
import RoomHeader from "./RoomHeader";
import { useEffect, useState } from "react";
import ChatContent from "./ChatContent";

type RoomChatProps = {
  userId: string;
  contactId: string;
};

type contactData = {
  name: string;
  profilePicture: string;
};

export default function RoomChat({ userId, contactId }: RoomChatProps) {
  const [contactData, setContactData] = useState<contactData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/contacts?contactId=${contactId}`
        );
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }
        const data = await res.json();
        setContactData(data.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchContacts();
  }, [contactId]);

  return (
    <div className="w-full md:min-w-2/3 pb-5 flex flex-col h-[calc(100vh-4rem)]">
      <RoomHeader
        name={contactData?.name ?? ""}
        profilePicture={contactData?.profilePicture ?? ""}
      />
      <div className="flex-grow overflow-y-auto px-4 space-y-2">
        {/* Contoh ChatContent */}
        <ChatContent userId={userId} contactId={contactId} />
      </div>
      <InputChat
        senderId={userId}
        receiverId={contactId}
        onMessageSent={() => window.location.reload()}
      />
    </div>
  );
}
