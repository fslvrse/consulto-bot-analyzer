import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">GoConsultant</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleClear}
          disabled={messages.length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            👋 Hi! I'm GoConsultant. Feel free to start a conversation or ask any questions.
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

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};

export default Index;