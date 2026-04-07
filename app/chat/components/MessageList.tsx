import { useEffect, useRef } from "react";
import type { Message } from "../types";

type MessageListProps = {
  messages: Message[];
  loading: boolean;
};

export default function MessageList({ messages, loading }: MessageListProps) {
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="max-w-2xl mx-auto px-5 py-6 flex flex-col gap-5 min-h-full">
        {messages.length === 0 && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-[#e8e6e1]/20 text-sm">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg">
              ✦
            </div>
            <span>¿En qué puedo ayudarte hoy?</span>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <span className="text-[10px] tracking-widest uppercase text-[#e8e6e1]/25 mb-1">
              {msg.sender === "user" ? "Tú" : "IA"}
            </span>
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[72%] ${
                msg.sender === "user"
                  ? "bg-[#d4a574] text-[#1a0e00] rounded-br-sm"
                  : "bg-white/[0.05] border border-white/[0.06] text-[#e8e6e1] rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start">
            <span className="text-[10px] tracking-widest uppercase text-[#e8e6e1]/25 mb-1">
              IA
            </span>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/[0.06] flex gap-1.5 items-center">
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="w-1.5 h-1.5 rounded-full bg-[#e8e6e1]/30 animate-bounce"
                  style={{ animationDelay: `${n * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
