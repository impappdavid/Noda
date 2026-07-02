import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useState } from "react";

// Updated categories tailored specifically for post content moderation
const POST_VIOLATION_CATEGORIES = [
  { id: "harassment", label: "Harassment or Hate Speech" },
  { id: "spam", label: "Spam, Scams or Misleading" },
  { id: "sensitive_media", label: "Graphic or Sensitive Content" },
  { id: "misinformation", label: "Harmful Misinformation" },
  { id: "copyright", label: "Intellectual Property / Plagiarism" },
];

const ReportModal = ({
  isOpen,
  onClose,
  nodeTitle, // Maps to post.id
  authorName = "user", // Passed down from post context
}: {
  isOpen: boolean;
  onClose: () => void;
  nodeTitle: string;
  authorName?: string;
}) => {
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCategory("");
      setDescription("");
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5 p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
        <DialogHeader className="bg-red-500 p-1 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
          <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
            <AlertTriangle size={16} className="text-white shrink-0" />
            Report Post
          </DialogTitle>
          <DialogClose asChild>
            <button className="hover:bg-black/40 cursor-pointer p-1 mt-0.5 transition-colors outline-none border-none">
              <X className="w-4 h-4 text-white" />
            </button>
          </DialogClose>
        </DialogHeader>

        {!submitted ? (
          <div className="flex flex-col">
            <div>
              {/* Preserved the exact two-column matrix layout */}
              <div className="border-b border-zinc-300 grid grid-cols-2 divide-x divide-zinc-300">
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Post ID</div>
                  {nodeTitle}
                </span>
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Author</div>
                  @{authorName}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 border-b border-zinc-300 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Category</div>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className="w-full h-9 rounded-none outline-none border-zinc-300 bg-zinc-50 font-mono text-[10px] cursor-pointer font-bold uppercase">
                      <SelectValue placeholder="INITIALIZE_SELECTION..." />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="rounded-none border-zinc-300 font-mono text-[10px] bg-white shadow-none"
                    >
                      {POST_VIOLATION_CATEGORIES.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.label}
                          className="cursor-pointer rounded-none focus:bg-blue-500 text-xs focus:text-white"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold p-2 flex flex-col gap-1 border-b border-zinc-300 uppercase tracking-tighter text-zinc-900 leading-none">
              <div className="font-normal text-zinc-500">About</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="PROMPT: Describe the nature of this violation..."
                className="w-full h-28 p-2 bg-zinc-50 border border-zinc-300 text-[11px] font-mono outline-none resize-none placeholder:text-zinc-500 focus:border-zinc-900 transition-colors"
              />
            </span>

            <div className="grid grid-cols-2">
              <button
                onClick={onClose}
                className="h-10 bg-white hover:bg-zinc-100 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2 border-r border-zinc-300 border-none outline-none"
              >
                Abort
              </button>
              <button
                onClick={handleSubmit}
                disabled={!category || description.length < 5}
                className="h-10 bg-red-600 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-100 disabled:text-zinc-300 border-none outline-none"
              >
                Send Report
              </button>
            </div>
          </div>
        ) : (
          <div className="h-75 flex flex-col items-center justify-center text-center p-6 bg-white">
            <div className="w-16 h-16 border-2 border-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2
                size={32}
                className="text-emerald-500 animate-in zoom-in duration-300"
              />
            </div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.2em] mb-2 text-zinc-900">
              Signal_Processed
            </h3>
            <div className="py-1 px-3 bg-zinc-100 border border-zinc-300 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Review_In_Progress
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;