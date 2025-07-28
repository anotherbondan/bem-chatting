"use client";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";

type InputChatProps = {
  senderId: string;
  receiverId: string;
  onMessageSent?: () => void;
};

export default function InputChat({
  senderId,
  receiverId,
  onMessageSent,
}: InputChatProps) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          text,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan");

      setText(""); // kosongkan input setelah kirim
      onMessageSent?.(); // refresh pesan di parent
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-3 w-full px-3 items-center">
      <div className="w-full p-[1px] rounded-2xl bg-gradient shadow-lg">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-2xl p-3 max-md:py-1 max-md:px-3 focus:outline-none bg-white"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
      </div>
      <button
        className="flex items-center justify-center bg-gradient w-12 h-12 max-md:w-10 max-md:h-10 rounded-full"
        onClick={handleSend}
      >
        <SendHorizonal color="white" />
      </button>
    </div>
  );
}
