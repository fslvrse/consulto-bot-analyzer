import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
}

export const ChatMessage = ({ content, role }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-4 py-3 rounded-lg max-w-[80%] message-fade-in",
        role === "assistant"
          ? "bg-primary text-primary-foreground ml-2"
          : "bg-secondary text-secondary-foreground ml-auto"
      )}
    >
      {content}
    </div>
  );
};