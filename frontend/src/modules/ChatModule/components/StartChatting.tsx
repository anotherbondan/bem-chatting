export default function StartChatting() {
  return (
    <div className="w-full min-w-2/3 pb-5 flex flex-col max-sm:hidden max-h-[calc(100vh-4rem)]">
      <div className="grid place-content-center h-[calc(100vh-4rem)]">
        <img src="/panda-phone.png" alt="icon" className="w-68 max-lg:w-46" />
        <h1 className="text-6xl max-lg:text-4xl font-bold font-bebas-neue text-center">
          Start Chatting!
        </h1>
      </div>
    </div>
  );
}
