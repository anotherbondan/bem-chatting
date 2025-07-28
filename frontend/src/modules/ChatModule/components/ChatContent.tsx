"use client";

import BubbleChat from "@/components/ui/bubblechat";
import { useEffect, useState } from "react";

type ChatContentProps = {
  userId: string;
  contactId: string;
};

type Message = {
  formattedTime: string;
  text: string;
  senderId: string;
  receiverId: string;
};

export default function ChatContent({ userId, contactId }: ChatContentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3001/messages?senderId=${userId}&receiverId=${contactId}`
        );

        if (!res.ok) {
          throw new Error("Gagal memuat pesan");
        }

        const data = await res.json();
        setMessages(data);
        setError("");
      } catch (err: any) {
        setError(err.message ?? "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    if (userId && contactId) {
      fetchMessages();
    }
  }, [userId, contactId]);

  if (loading) return <p className="text-center">Memuat pesan...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-2 py-2">
      {messages.map((message, index) => (
        <BubbleChat
          key={index}
          variant={message.senderId === userId ? "sent" : "received"}
          text={message.text}
          timestamp={message.formattedTime}
        />
      ))}
    </div>
  );
}
