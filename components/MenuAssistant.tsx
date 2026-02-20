import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ChefHat, Bot } from 'lucide-react';
import { getMenuRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

interface MenuAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuAssistant: React.FC<MenuAssistantProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your digital server today. Craving something spicy? Sweet? Or maybe something healthy? Tell me what you're in the mood for!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getMenuRecommendation(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting to the kitchen right now. Please check the menu section!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-sage-green p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-lg">Menu Assistant</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-terracotta text-white rounded-tr-none' 
                    : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-none'
                }`}
              >
                {msg.role === 'model' && (
                   <div className="flex items-center gap-1 mb-1 opacity-70 border-b border-stone-200 pb-1">
                     <ChefHat className="w-3 h-3" />
                     <span className="text-xs font-bold uppercase">Press Bot</span>
                   </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 flex gap-1">
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-stone-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I want something with avocado..."
              className="flex-grow px-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sage-green/50 text-stone-700 text-sm"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-terracotta text-white p-2.5 rounded-full hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-stone-400 mt-2">
            Powered by Gemini AI • Ask about ingredients or flavors!
          </p>
        </form>
      </div>
    </div>
  );
};