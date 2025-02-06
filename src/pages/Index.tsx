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
      // Here we'll integrate with the API
      // For now, we'll simulate a response
      const response = "Thank you for your query. I'm analyzing the medical information...";
      
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