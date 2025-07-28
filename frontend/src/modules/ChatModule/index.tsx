"use client";

import ChatList from "./components/ChatList";
import StartChatting from "./components/StartChatting";
import RoomChat from "./components/RoomChat";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs } from "@radix-ui/react-tabs";

export default function ChatModule() {
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const chatId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!userId) return null;

  return (
    <main className="flex flex-col gap-10 max-h-[calc(100vh-4rem)] pt-16">
      <div className="flex w-full h-full">
        {/* Sidebar Recent Chat */}
        {(!chatId || !isMobile) && (
          <div className="w-full sm:w-1/3">
            <Tabs>
              <ChatList userId={userId} />
            </Tabs>
          </div>
        )}

        {/* Right Content */}
        {chatId ? (
          <div className="w-full sm:w-2/3">
            <RoomChat userId={userId} contactId={chatId} />
          </div>
        ) : (
          !isMobile && (
            <div className="hidden sm:block w-2/3">
              <StartChatting />
            </div>
          )
        )}
      </div>
    </main>
  );
}
