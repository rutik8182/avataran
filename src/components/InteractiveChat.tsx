import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export default function InteractiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! I'm Kiara, your Avtaran Digital Advisor. Are you looking to launch a state-of-the-art Web App, restructure your visual branding, or drive exponential growth via automations and organic SEO? Ask me anything!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested dialogue hooks
  const suggestedHooks = [
    "What services does Avtaran offer?",
    "Rough budget map for e-commerce?",
    "Tell me about the Growth Plan!",
  ];

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg = textToSend.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // API request to Express server-side route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-6) // Send recent message history for context
        })
      });

      if (!response.ok) {
        throw new Error("Server response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
    } catch (err) {
      console.error("Chat proxy error, initiating local backup reply generator:", err);
      // Clean fallback generator offline simulated
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "I am currently adjusting my connection parameters with the Avtaran mother engine, but I can definitely answer: Our team designs and deploys next-generation platforms starting near $1,200/mo. Would you like to schedule a rapid strategy review call via our contact area, or map your specifications using the AI Scope Scraper?"
          }
        ]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 pointer-events-auto backdrop-blur-xl animate-scaleIn">
          {/* Header */}
          <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-slate-900 dark:to-indigo-950/60 p-4 border-b border-slate-205 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-950" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold font-sans text-slate-800 dark:text-slate-100 flex items-center gap-1">
                  Kiara
                  <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">Avtaran Digital Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors pointer-events-auto cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Box */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white dark:bg-slate-950/40 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                }`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed text-left ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-slate-950 rounded-tr-none font-medium"
                    : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-305 rounded-tl-none font-sans shadow-sm dark:shadow-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin" />
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-1 shadow-sm dark:shadow-none">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-slate-55 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 flex flex-wrap gap-1.5">
              {suggestedHooks.map((phrase, id) => (
                <button
                  key={id}
                  onClick={() => handleSend(phrase)}
                  className="text-[10px] bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-650 dark:text-slate-300 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800/80 transition-colors flex items-center gap-0.5 pointer-events-auto cursor-pointer"
                >
                  {phrase}
                  <ArrowUpRight className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-500" />
                </button>
              ))}
            </div>
          )}

          {/* Input control */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(inputValue);
              }}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-xl px-3.5 py-2 text-xs text-slate-801 dark:text-slate-200 placeholder-slate-405 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-sm dark:shadow-none"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 p-2.5 rounded-xl transition-all pointer-events-auto shadow-[0_2px_10px_rgba(6,182,212,0.15)] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all outline-none border border-cyan-400 dark:border-cyan-500 pointer-events-auto relative cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white dark:border-slate-950 text-[8px] text-slate-950 font-bold items-center justify-center">1</span>
          </span>
        )}
      </button>
    </div>
  );
}
