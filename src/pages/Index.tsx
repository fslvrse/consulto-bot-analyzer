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
        // Enhanced medical responses based on keywords
        if (lowerMessage.includes("headache")) {
          response = "Headaches can have various causes including stress, dehydration, or tension. Some common remedies include: \n\n• Staying hydrated\n• Getting adequate rest\n• Over-the-counter pain relievers\n• Reducing screen time\n\nIf headaches are severe or persistent, please consult a healthcare provider.";
        } else if (lowerMessage.includes("cold") || lowerMessage.includes("flu")) {
          response = "Common cold and flu symptoms can be managed by:\n\n• Rest\n• Staying hydrated\n• Over-the-counter medications\n• Warm liquids\n\nIf symptoms are severe or persist, please seek medical attention.";
        } else if (lowerMessage.includes("fever")) {
          response = "A fever might indicate your body is fighting an infection. Tips for managing fever:\n\n• Rest\n• Stay hydrated\n• Monitor temperature\n• Take fever reducers if needed\n\nSeek immediate medical attention if fever is very high (103°F/39.4°C or higher) or persists.";
        } else if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition")) {
          response = "A balanced diet is crucial for good health. Key principles include:\n\n• Variety of fruits and vegetables\n• Whole grains\n• Lean proteins\n• Healthy fats\n• Adequate hydration\n\nFor personalized dietary advice, consult a registered dietitian.";
        } else if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
          response = "Stress and anxiety management techniques include:\n\n• Deep breathing exercises\n• Regular physical activity\n• Adequate sleep\n• Mindfulness meditation\n• Professional counseling\n\nIf anxiety significantly impacts your daily life, please consult a mental health professional.";
        } else {
          response = "I understand you're asking about a health topic. To provide accurate information, could you please be more specific about your concern? For example, are you experiencing any particular symptoms or looking for information about a specific condition?";
        }
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