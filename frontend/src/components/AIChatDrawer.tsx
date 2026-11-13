import React, { useState } from "react";
import { X, Send, Bot, Sparkles, MessageSquare } from "lucide-react";
import { CareerAssessmentRecord } from "../types";
import { sendChatMessage } from "../utils/api";

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  assessment?: CareerAssessmentRecord;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  assessment
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: assessment
        ? `Hello! I'm your AI Career Coach for **${assessment.targetCareerTitle}**. How can I help you with your roadmap, missing skills, or interview preparation today?`
        : "Hello! I am your AI Career Navigator Coach. Select a target career or ask me how to identify your tech skill gaps!"
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(assessment?.id, text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I had trouble processing that. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#0c101d] border-l border-indigo-950/80 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-indigo-950/80 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Career Assistant</h3>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online & Context-Aware
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"} max-w-[85%]`}
            >
              <div className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center text-[10px] ${
                m.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-800 text-indigo-400"
              }`}>
                {m.role === "user" ? "You" : <Sparkles className="w-3 h-3" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse p-2">
              <Bot className="w-3.5 h-3.5" />
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2 border-t border-slate-800 bg-slate-900/40 flex gap-1.5 overflow-x-auto">
          {[
            "Why learn Python?",
            "What after SQL?",
            "Is ML required?",
            "Interview tips"
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-2 py-1 text-[10px] bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-white rounded-md whitespace-nowrap border border-slate-700/60"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-indigo-950/80 bg-slate-900/80 flex gap-2">
          <input
            type="text"
            placeholder="Ask AI Career Coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
