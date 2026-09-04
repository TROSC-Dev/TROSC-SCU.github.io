import { Wrench } from "lucide-react";

interface ComingSoonNoticeProps {
  message?: string;
  className?: string;
}

const ComingSoonNotice = ({
  message = "This feature is coming soon. We're working on it!",
  className = "",
}: ComingSoonNoticeProps) => {
  return (
    <div
      role="status"
      className={`flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4 ${className}`}
    >
      <Wrench size={20} className="shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ComingSoonNotice;
