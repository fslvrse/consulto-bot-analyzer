import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
}

export const ChatMessage = ({ content, role }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 rounded-2xl max-w-[80%] message-fade-in chat-message",
        role === "assistant"
          ? "bg-primary/20 text-foreground ml-2 border-l-4 border-l-primary"
          : "bg-secondary/50 text-foreground ml-auto border-r-4 border-r-primary"
      )}
    >
      {content}
    </div>
  );
};