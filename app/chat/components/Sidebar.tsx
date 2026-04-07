import type { Chat } from "../types";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  sidebarOpen: boolean;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onClose: () => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  sidebarOpen,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay oscuro en móvil cuando sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative z-20 top-0 left-0 h-full
          flex-shrink-0 flex flex-col
          border-r border-white/[0.07] bg-[#0a0a0b]
          transition-all duration-300
          ${sidebarOpen ? "w-60" : "w-0 overflow-hidden"}
        `}
      >
        <div className="p-3 border-b border-white/[0.07]">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#e8e6e1]/70 hover:bg-white/[0.06] hover:text-[#e8e6e1] transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
              <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
            </svg>
            Nuevo chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5">
          {chats.length === 0 && (
            <p className="text-xs text-[#e8e6e1]/20 text-center mt-6">
              Sin historial aún
            </p>
          )}
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                onSelectChat(chat.id);
                onClose();
              }}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors text-sm ${
                chat.id === activeChatId
                  ? "bg-white/[0.08] text-[#e8e6e1]"
                  : "text-[#e8e6e1]/50 hover:bg-white/[0.04] hover:text-[#e8e6e1]/80"
              }`}
            >
              <span className="truncate flex-1">{chat.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 ml-1 text-[#e8e6e1]/30 hover:text-red-400 transition-all flex-shrink-0"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  width={12}
                  height={12}
                >
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
