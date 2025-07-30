"use client";

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Contact = {
  id: string;
  contactId: string;
  name: string;
  profilePicture: string;
  lastChatMessage: string;
  lastChatTime: string;
};

export default function ChatList({ userId }: { userId: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/users/${userId}/contacts`
        );
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }
        const data = await res.json();
        setContacts(data.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchContacts();
  }, [userId]);

  return (
    <>
      <TabsList className="flex flex-col w-full">
        {contacts.map((contact) => (
          <TabsTrigger
            value={contact.id}
            key={contact.id}
            className="data-[state=active]:bg-gray-100"
            onClick={() => {
              router.push(`/chats/${contact.contactId}`);
            }}
          >
            <div className="flex justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={contact?.profilePicture}
                  alt="icon"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col justify-between">
                  <h1 className="font-bebas-neue text-2xl text-stone-900 text-left">
                    {contact?.name}
                  </h1>
                  <p className="font-roboto-flex text-md text-stone-500 text-left">
                    {contact?.lastChatMessage}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <p className="font-roboto-flex text-sm text-stone-500">
                  {contact?.lastChatTime}
                </p>
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  );
}
