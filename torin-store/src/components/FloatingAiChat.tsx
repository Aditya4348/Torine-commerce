import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import type { Product, ChatMessage } from "../types";
import { formatRupiah } from "../utils/formatters";
import { storeApi, type ChatRequestMessage } from "../services/storeApi";
import ReactMarkdown from "react-markdown";

interface FloatingAiChatProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FloatingAiChat: React.FC<FloatingAiChatProps> = ({
  products,
  onSelectProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Halo. Saya asisten katalog Torin. Ada yang bisa saya bantu terkait spesifikasi produk, rekomendasi budget, atau pengiriman?",
      timestamp: "Baru saja",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const askAssistantMutation = useMutation({
    mutationFn: (chatMessages: ChatRequestMessage[]) =>
      storeApi.askAssistant(chatMessages),
  });
  const isTyping = askAssistantMutation.isPending;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Rekomendasi budget di bawah 500rb",
    "Headphone yang bagus untuk kerja",
    "Sepatu santai harian",
    "Berapa lama estimasi pengiriman?",
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || askAssistantMutation.isPending) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: query,
      timestamp: "Sekarang",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const conversation: ChatRequestMessage[] = [
      ...messages.map((message) => ({
        role: message.sender,
        content: message.text,
      })),
      { role: "user", content: query },
    ];

    try {
      const response = await askAssistantMutation.mutateAsync(conversation);
      const botMsg: ChatMessage = {
        id: String(Date.now()),
        sender: "assistant",
        text: response.text,
        timestamp: "Sekarang",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak diketahui.";
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          sender: "assistant",
          text: `Maaf, pesan gagal dikirim. ${errorMessage}`,
          timestamp: "Sekarang",
        },
      ]);
    }
  };

  return (
    <aside
      aria-label="AI Chat Assistant"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-90 sm:w-96 bg-white rounded-3xl border border-neutral-200/90 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10">
                <Bot className="w-4 h-4 text-neutral-200" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold tracking-tight">
                  Torin AI Concierge
                </h3>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Siap Membantu
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-left bg-neutral-50/50">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      isUser
                        ? "bg-neutral-900 text-white rounded-br-xs"
                        : "bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    {/* Ganti bagian <p>{m.text}</p> dengan blok kondisi di bawah ini */}
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-0.5">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-neutral-950">
                              {children}
                            </strong>
                          ),
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    )}

                    {/* Render suggested products inline if returned */}
                    {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-100 space-y-2">
                        {m.suggestedProducts.slice(0, 2).map((pid) => {
                          const item = products.find((p) => p.id === pid);
                          if (!item) return null;
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                onSelectProduct(item);
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-2 p-1.5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200/60"
                            >
                              <img
                                src={item.images[0]?.image_url ?? ""}
                                alt={item.name}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <div className="flex-1 truncate">
                                <p className="text-[11px] font-semibold text-neutral-900 truncate">
                                  {item.name}
                                </p>
                                <p className="text-[10px] font-mono text-neutral-500">
                                  {formatRupiah(
                                    item.sale_price ?? item.base_price,
                                  )}
                                </p>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-neutral-400 px-1 pt-1 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-neutral-400 bg-white border border-neutral-200 px-3 py-2 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt suggestions */}
          <div className="px-3 py-2 bg-white border-t border-neutral-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                disabled={isTyping}
                className="whitespace-nowrap text-[10px] font-medium px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0 cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder="Tanyakan produk atau rekomendasi..."
              className="flex-1 text-xs px-3 py-2 bg-neutral-100 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-900 border border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-neutral-950 text-white shadow-xl hover:bg-neutral-800 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
        title="Buka AI Chat Torin"
        aria-label="AI Chat Assistant"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-neutral-200" />
        ) : (
          <>
            <MessageSquare className="w-5 h-5 text-neutral-100 group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </>
        )}
      </button>
    </aside>
  );
};
