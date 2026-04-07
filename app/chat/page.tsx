"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MessageList from "./components/MessageList";
import InputBar from "./components/InputBar";

import type { Message, Chat } from "./types";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}
function getTitle(messages: Message[]) {
  const first = messages.find((m) => m.sender === "user");
  if (!first) return "Nuevo chat";
  return first.text.slice(0, 36) + (first.text.length > 36 ? "…" : "");
}

const STORAGE_KEY = "chat_history";
function loadChats(): Chat[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveChats(chats: Chat[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );

  useEffect(() => {
    const saved = loadChats();
    setChats(saved);
    if (saved.length > 0) setActiveChatId(saved[0].id);
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;
  const messages = activeChat?.messages ?? [];

  const createNewChat = () => {
    const newChat: Chat = {
      id: generateId(),
      title: "Nuevo chat",
      messages: [],
      createdAt: Date.now(),
    };
    const updated = [newChat, ...chats];
    setChats(updated);
    saveChats(updated);
    setActiveChatId(newChat.id);
    setInput("");
  };

  const deleteChat = (id: string) => {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    saveChats(updated);
    if (activeChatId === id) setActiveChatId(updated[0]?.id ?? null);
  };

  const updateChat = (id: string, newMessages: Message[]) => {
    setChats((prev) => {
      const updated = prev.map((c) =>
        c.id === id
          ? { ...c, messages: newMessages, title: getTitle(newMessages) }
          : c,
      );
      saveChats(updated);
      return updated;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    let chatId = activeChatId;
    if (!chatId) {
      const newChat: Chat = {
        id: generateId(),
        title: "Nuevo chat",
        messages: [],
        createdAt: Date.now(),
      };
      chatId = newChat.id;
      const updated = [newChat, ...chats];
      setChats(updated);
      saveChats(updated);
      setActiveChatId(chatId);
    }
    const userText = input;
    setInput("");
    const currentMessages = chats.find((c) => c.id === chatId)?.messages ?? [];
    const withUser: Message[] = [
      ...currentMessages,
      { text: userText, sender: "user" },
    ];
    updateChat(chatId, withUser);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: currentMessages }),
      });
      const data = await res.json();
      updateChat(chatId, [
        ...withUser,
        { text: data.reply || "Sin respuesta", sender: "ai" },
      ]);
    } catch {
      updateChat(chatId, [
        ...withUser,
        { text: "Error al conectar con el servidor.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="h-dvh overflow-hidden bg-[#0f0f10] text-[#e8e6e1] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        sidebarOpen={sidebarOpen}
        onSelectChat={setActiveChatId}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <div className="shrink-0 w-full px-4 py-3.5 flex items-center gap-3 border-b border-white/[0.07]">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-[#e8e6e1]/40 hover:text-[#e8e6e1]/80 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" width={16} height={16}>
              <path d="M1 3.75A.75.75 0 0 1 1.75 3h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 3.75ZM1 8a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 8Zm.75 3.5a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75Z" />
            </svg>
          </button>
          <div className="w-7 h-7 rounded-full bg-[#d4a574] flex items-center justify-center text-[11px] font-medium text-[#1a0e00]">
            IA
          </div>
          <div>
            <p className="text-sm font-medium leading-none text-[#e8e6e1]">
              Asistente IA
            </p>
            <p className="text-[11px] text-[#e8e6e1]/40 mt-0.5">Llama 3 · 8B</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5fa87b]" />
        </div>
        <MessageList messages={messages} loading={loading} />
        <InputBar
          input={input}
          loading={loading}
          onChange={setInput}
          onSend={handleSend}
        />
      </div>
    </main>
  );
}
