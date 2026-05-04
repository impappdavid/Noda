import { useState, useRef, useEffect, type ChangeEvent } from "react";
import {
  EyeOff,
  Image as ImageIcon,
  Plus,
  X,
  Lightbulb,
  Cpu,
  Layout,
  Bug,
  Activity,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Define our specific Idea Categories
type IdeaCategory = "CONCEPT" | "UI" | "BUG" | "FUNCTION";

export default function IdeaForm() {
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<IdeaCategory>("CONCEPT");

  // Anonymity is now fixed/read-only per your request
  const isAnonymous = false;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 4));
  };

  const categories: { id: IdeaCategory; icon: any; color: string }[] = [
    { id: "CONCEPT", icon: Lightbulb, color: "text-blue-600 border-blue-600" },
    { id: "UI", icon: Layout, color: "text-purple-600 border-purple-600" },
    { id: "BUG", icon: Bug, color: "text-red-600 border-red-600" },
    {
      id: "FUNCTION",
      icon: Activity,
      color: "text-green-600 border-green-600",
    },
  ];

  return (
    <div className="bg-white">
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex items-center justify-between bg-blue-500 px-3 py-3 text-sm text-white hover:bg-blue-600 transition-all text-left group cursor-pointer border border-zinc-800">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest">
              Submit New Proposal
            </span>
            <Plus size={16} />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-xl rounded-none p-0 overflow-hidden bg-white border-none max-h-[90vh] flex flex-col shadow-2xl">
          <DialogHeader className="bg-zinc-300 p-2 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-[10px] font-mono font-black text-black uppercase tracking-wider">
                Create a new idea
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <button className="bg-transparent p-1 hover:bg-zinc-400/60 cursor-pointer text-zinc-600 hover:text-zinc-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="px-2 mt-2 overflow-y-auto scrollbar-hide flex-1">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              {/* Profile Info - Fixed Anonymity */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center border border-zinc-300">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 leading-none">
                    <span className="text-xs font-black tracking-tight uppercase font-mono text-zinc-900">
                      Alex Rivers
                    </span>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-mono uppercase font-bold mt-1">
                    Materials Lead // @arivers
                  </span>
                </div>
              </div>

              {/* CATEGORY SELECTOR */}
              <div className="flex bg-zinc-100 p-1 border border-zinc-300 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 transition-all text-[9px] font-mono font-bold uppercase cursor-pointer",
                      category === cat.id
                        ? "bg-white shadow-sm text-zinc-900 border border-zinc-200"
                        : "text-zinc-400 hover:text-zinc-600",
                    )}
                  >
                    <cat.icon
                      size={12}
                      className={
                        category === cat.id ? cat.color.split(" ")[0] : ""
                      }
                    />
                    <span className="hidden sm:block">{cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className=" flex items-center gap-2">
              <span
                className={cn(
                  "text-[10px] font-mono font-black uppercase border px-1.5 py-0.5",
                  categories.find((c) => c.id === category)?.color,
                )}
              >
                Type: {category}
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Submit technical notes for this ${category.toLowerCase()}...`}
              className="w-full min-h-[140px] mt-2 bg-transparent border-none focus:ring-0 outline-none text-xs font-medium placeholder:text-zinc-500 resize-none overflow-hidden"
              rows={4}
            />

            {images.length > 0 && (
              <div
                className={cn(
                  "grid gap-1 border border-zinc-200 overflow-hidden mb-4",
                  images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                )}
              >
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video bg-zinc-100 border border-zinc-200"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute top-1 right-1 p-1 bg-zinc-900 text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-2">
              <input
                type="file"
                hidden
                ref={fileInputRef}
                multiple
                onChange={handleImageUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 border border-zinc-300 text-[10px] font-mono font-bold uppercase transition-all",
                  images.length >= 4
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-zinc-200 hover:text-black cursor-pointer",
                )}
                disabled={images.length >= 4}
              >
                <ImageIcon size={14} />
                Image
              </button>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] rounded-none h-9 px-6 font-mono font-black uppercase tracking-widest shadow-none">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
