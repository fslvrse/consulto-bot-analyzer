import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    const newMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Simulate API call with more natural responses
      let response = "";
      const lowerMessage = message.toLowerCase();

      // Handle greetings and casual conversation
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        response = "Hi! I'm GoConsultant. How can I help you today?";
      } else if (lowerMessage.includes("how are you")) {
        response = "I'm functioning well and ready to assist you. How are you doing?";
      } else if (lowerMessage.includes("weather")) {
        response = "While I can't check the actual weather, I can discuss how weather conditions might affect certain medical conditions. Would you like to know more about any specific weather-related health concerns?";
      } else if (lowerMessage.includes("thank")) {
        response = "You're welcome! Feel free to ask me any other questions you might have.";
      } else if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
        response = "Goodbye! Take care and don't hesitate to return if you have more questions.";
      } else {
        // Default response for medical queries
        response = "I understand you're asking about a medical topic. Let me help you with that. What specific information would you like to know?";
      }
      
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    toast({
      title: "Conversation cleared",
      description: "All messages have been removed.",
    });
  };

  return (
    <>
      <div className="starfield" />
      <div className="flex flex-col h-screen max-w-5xl mx-auto px-4 py-2">
        <header className="flex items-center justify-between p-6 bg-secondary/50 backdrop-blur-lg rounded-2xl mb-4 border border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              GoConsultant
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            disabled={messages.length === 0}
            className="hover:bg-white/10"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto rounded-2xl bg-secondary/30 backdrop-blur-lg border border-white/10 p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center text-muted-foreground">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
              <div className="max-w-md">
                <p className="text-xl font-semibold mb-2">
                  👋 Hi! I'm GoConsultant
                </p>
                <p className="text-sm opacity-70">
                  Feel free to start a conversation or ask any questions.
                </p>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 bg-secondary/50 backdrop-blur-lg rounded-2xl border border-white/10">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Index;