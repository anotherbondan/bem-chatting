type BubbleChatProps = {
  variant?: "sent" | "received";
  text: string;
  timestamp: string;
};

export default function BubbleChat({
  variant,
  text,
  timestamp,
}: BubbleChatProps) {
  const isSent = variant === "sent";

  return (
    <div className={`w-full flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-full flex gap-1 ${isSent ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`
            max-w-[75%] 
            py-1 px-2 
            rounded-lg bg-gray-200
            ${isSent ? "rounded-tr-none" : "rounded-tl-none"}
            `}
        >
          <p className="text-md text-stone-900 font-roboto-flex">{text}</p>
        </div>
        <div className="flex items-end">
          <p className="text-xs font-roboto-flex text-stone-500">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
