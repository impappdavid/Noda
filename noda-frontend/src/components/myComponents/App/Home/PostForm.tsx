import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { EyeOff, Image as ImageIcon, Plus, BarChart2, X, Smile, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default function PostForm() {
    const [text, setText] = useState<string>('');
    const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [showPoll, setShowPoll] = useState<boolean>(false);

    const [pollQuestion, setPollQuestion] = useState<string>('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize logic for Textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImages].slice(0, 4));
    };

    const updatePollOption = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => {
        if (pollOptions.length < 4) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const removePollOption = (index: number) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="bg-white">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="w-full flex items-center justify-between bg-zinc-800 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-all text-left group cursor-pointer">
                        <span>Deploy professional insight...</span>
                        <Plus size={18} />
                    </button>
                </DialogTrigger>

                {/* Fixed height constraints with internal scrolling */}
                <DialogContent className="sm:max-w-xl rounded-[1.5rem] p-0 overflow-hidden bg-white border-zinc-200 max-h-[90vh] flex flex-col">
                    <DialogHeader className="p-6 pb-2 shrink-0">
                        <DialogTitle className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">
                            New Deployment
                        </DialogTitle>
                    </DialogHeader>

                    {/* Scrollable container for content */}
                    <div className="px-6 pb-6 space-y-4 overflow-y-auto scrollbar-hide flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors overflow-hidden ",
                                    isAnonymous ? "bg-orange-500 border-orange-600" : "bg-zinc-100 border-zinc-200"
                                )}>
                                    {isAnonymous ? (
                                        <EyeOff size={18} className="text-white" />
                                    ) : (
                                        <img
                                            src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp"
                                            alt="Alex Rivers"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col text-left">
                                    <span className={cn(
                                        "text-sm font-bold tracking-tight",
                                        isAnonymous ? "text-orange-600" : "text-zinc-900"
                                    )}>
                                        {isAnonymous ? 'Anonymous' : 'Alex Rivers'}
                                    </span>
                                    <span className="text-xs text-zinc-500 font-mono uppercase font-bold tracking-tighter">
                                        {isAnonymous ? 'Encrypted Signal' : 'Vector Engineer'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-zinc-50 p-1.5 rounded-full px-3 border border-zinc-100">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">Anonymous</span>
                                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} className='cursor-pointer'/>
                            </div>
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What professional signal are you sending?"
                            className="w-full h-fit bg-transparent border-none focus:ring-0 outline-none text-base placeholder:text-zinc-400 resize-none overflow-hidden"
                            rows={1}
                        />

                        {images.length > 0 && (
                            <div className={cn("grid gap-2 rounded-xl overflow-hidden mb-4", images.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                                {images.map((src, idx) => (
                                    <div key={idx} className="relative aspect-video">
                                        <img src={src} alt="" className="w-full h-full object-cover aspect-square" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                            className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showPoll && (
                            <div className="p-3 rounded-xl bg-zinc-200/80 space-y-3 animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">Poll_Parameters</span>
                                    <button type="button" onClick={() => setShowPoll(false)} className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer">
                                        <X size={14} />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Poll Question..."
                                    value={pollQuestion}
                                    onChange={(e) => setPollQuestion(e.target.value)}
                                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm font-semibold placeholder:text-zinc-500 outline-none "
                                />

                                <div className="space-y-2">
                                    {pollOptions.map((option, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder={`Option ${idx + 1}`}
                                                value={option}
                                                onChange={(e) => updatePollOption(idx, e.target.value)}
                                                className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none "
                                            />
                                            {pollOptions.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePollOption(idx)}
                                                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {pollOptions.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={addPollOption}
                                        className="text-[11px] font-mono font-black text-orange-500 hover:text-orange-600 uppercase transition-colors cursor-pointer"
                                    >
                                        + Add_Option
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-1 py-1 sticky bottom-0 bg-white">
                            <input type="file" hidden ref={fileInputRef} multiple onChange={handleImageUpload} />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={cn("p-2 transition-colors cursor-pointer", images.length >= 4 ? "text-zinc-200 cursor-not-allowed" : "text-zinc-500 hover:text-zinc-900")}
                                disabled={images.length >= 4}
                            >
                                <ImageIcon size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPoll(!showPoll)}
                                className={cn("p-2 transition-colors cursor-pointer", showPoll ? "text-orange-500" : "text-zinc-500 hover:text-zinc-900")}
                            >
                                <BarChart2 size={18} />
                            </button>
                            <button type="button" className="p-2 text-zinc-400 hover:text-zinc-900 ml-auto cursor-pointer"><Smile size={16} /></button>
                        </div>

                        <Button className="w-full bg-zinc-800 hover:bg-zinc-900 text-white text-sm rounded-xl h-10 font-semibold uppercase tracking-widest transition-colors shrink-0">
                            Deploy Post
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}