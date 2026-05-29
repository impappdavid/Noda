import { useState, useRef, useEffect, type ChangeEvent } from "react";
import {
  EyeOff,
  Image as ImageIcon,
  Plus,
  BarChart2,
  X,
  Trash2,
  Unlock,
  Lock,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DialogClose } from "@radix-ui/react-dialog";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function PostForm() {
  const [text, setText] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [showPoll, setShowPoll] = useState<boolean>(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

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

  // Poll Handlers
  const addOption = () => {
    if (pollOptions.length < 4) setPollOptions([...pollOptions, ""]);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white">
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex items-center justify-between bg-zinc-800 px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-all text-left group cursor-pointer">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest">
              What's happening?
            </span>
            <Plus size={16} />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-xl rounded-none p-0 overflow-hidden bg-white border-zinc-300 max-h-[90vh] flex flex-col border-none shadow-none">
          {/* SQUARE HEADER */}
          <DialogHeader className="bg-zinc-200 p-2 text-black flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-2 ">
              <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-wider">
                What's happening today?
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <button className="bg-transparent p-1 hover:bg-zinc-300 cursor-pointer text-zinc-500 hover:text-black transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </DialogClose>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="px-2 space-y-2 mt-2 overflow-y-auto scrollbar-hide flex-1">
            <div className="flex items-center justify-between">
              {/* Profile Info */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center transition-all duration-200 overflow-hidden border",
                    isAnonymous
                      ? "bg-zinc-300 border-none"
                      : "bg-zinc-100 border-none",
                  )}
                >
                  {isAnonymous ? (
                    <EyeOff size={18} className="text-blue-500" />
                  ) : (
                    <img
                      src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex gap-2 items-end">
                    <span
                      className={cn(
                        "text-xs font-black tracking-tight uppercase font-mono transition-colors",
                        isAnonymous ? "text-blue-500" : "text-zinc-900",
                      )}
                    >
                      {isAnonymous ? "Anonymous" : "Alex Rivers"}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] tracking-tight font-mono transition-colors",
                        isAnonymous ? "text-zinc-500" : "text-zinc-500",
                      )}
                    >
                      {isAnonymous ? "@enrcypted" : "@alexrivers"}
                    </span>
                  </div>

                  <span className="text-[9px] text-zinc-400 font-mono uppercase font-black tracking-widest">
                    {isAnonymous ? "Encrypted" : "Vector Engineer"}
                  </span>
                </div>
              </div>

              {/* ICON ONLY TOGGLE */}
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={cn(
                  "p-2 flex items-center justify-center border transition-all duration-150 active:scale-90 cursor-pointer",
                  isAnonymous
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-500 hover:text-zinc-900",
                )}
                title={
                  isAnonymous
                    ? "Disable Anonymous Mode"
                    : "Enable Anonymous Mode"
                }
              >
                {isAnonymous ? (
                  <div className="relative">
                    <EyeOff size={14} strokeWidth={2.5} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>
                ) : (
                  <Eye size={14} strokeWidth={2.5} />
                )}
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What professional signal are you sending?"
              className="w-full min-h-24 pl-12 bg-transparent border-none focus:ring-0 outline-none text-base placeholder:text-zinc-400 resize-none overflow-hidden"
              rows={1}
            />

            {/* Images Grid */}
            {images.length > 0 && (
              <div
                className={cn(
                  "grid gap-1 border border-zinc-200 overflow-hidden mb-4",
                  images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                )}
              >
                {images.map((src, idx) => (
                  <div key={idx} className="relative aspect-auto bg-zinc-100">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="absolute top-2 right-2 p-1 bg-zinc-900 text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* POLL MODULE IMPLEMENTATION */}
            {showPoll && (
              <div className="mt-2 border border-zinc-300 bg-white animate-in slide-in-from-top-2 mb-4">
                {/* HEADER */}
                <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-300 bg-zinc-50/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-none" />
                    <span className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">
                      Poll Config
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPoll(false)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-all cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* OPTIONS GRID */}
                <div className="divide-y divide-zinc-300">
                  {pollOptions.map((opt: string, i: number) => (
                    <div key={i} className="flex items-stretch group">
                      <div className="w-10 flex items-center justify-center bg-zinc-50 border-r border-zinc-300 text-[9px] font-mono text-zinc-500 group-focus-within:text-zinc-900 group-focus-within:font-bold transition-colors">
                        0{i + 1}
                      </div>
                      <input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        placeholder={`Option_Entry_${i + 1}`}
                        className="flex-1 h-8 px-4 text-[11px] uppercase outline-none bg-white placeholder:text-zinc-400 transition-colors"
                      />
                      {pollOptions.length > 2 && (
                        <button
                          onClick={() => removeOption(i)}
                          className="w-8 flex items-center justify-center border-l border-zinc-300 text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Remove Option"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* ADD OPTION */}
                {pollOptions.length < 4 && (
                  <button
                    onClick={addOption}
                    className="w-full h-8 border-t border-zinc-300 bg-white text-[9px] font-mono font-black text-zinc-500 uppercase flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                  >
                    <span>+</span> Add New Option
                  </button>
                )}

                {/* FOOTER */}
                <div className="px-3 py-1.5 border-t border-zinc-300 bg-zinc-50 flex justify-between">
                  <span className="text-[8px] font-mono font-black text-zinc-500 uppercase">
                    Min: 02 / Max: 04
                  </span>
                  <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest italic">
                    Status: Configuration_Active
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1 py-3 border-t border-zinc-200">
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
                  "p-2 transition-colors flex gap-1 text-sm cursor-pointer hover:bg-zinc-300",
                  images.length >= 4
                    ? "text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-900",
                )}
                disabled={images.length >= 4}
              >
                <ImageIcon size={18} />
                Image
              </button>
              <button
                type="button"
                onClick={() => setShowPoll(!showPoll)}
                className={cn(
                  "p-2 transition-colors flex gap-1 text-sm cursor-pointer hover:bg-zinc-300",
                  showPoll
                    ? "text-blue-500"
                    : "text-zinc-500 hover:text-zinc-900",
                )}
              >
                <BarChart2 size={18} />
                Poll
              </button>
              <Button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-[10px] rounded-none h-10 px-8 font-mono font-black uppercase tracking-widest transition-colors shadow-none">
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
