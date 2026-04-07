import { useRef } from "react";

type InputBarProps = {
  input: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function InputBar({
  input,
  loading,
  onChange,
  onSend,
}: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="shrink-0 w-full border-t border-white/[0.05]">
      <div className="max-w-2xl mx-auto px-4 pb-5 pt-3">
        <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-3.5 py-2.5 focus-within:border-[#d4a574]/40 transition-colors">
          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent outline-none text-[#e8e6e1] text-sm resize-none min-h-[22px] max-h-40 leading-relaxed placeholder:text-[#e8e6e1]/25"
            placeholder="Escribe un mensaje…"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            onClick={onSend}
            disabled={loading || !input.trim()}
            className="w-7 h-7 rounded-full bg-[#d4a574] flex items-center justify-center flex-shrink-0 hover:opacity-80 disabled:opacity-30 transition-opacity"
          >
            <svg viewBox="0 0 16 16" fill="#1a0e00" width={13} height={13}>
              <path d="M2 8L14 2L10 8L14 14L2 8Z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-[#e8e6e1]/20 mt-2 tracking-wide">
          Enter para enviar
        </p>
      </div>
    </div>
  );
}
