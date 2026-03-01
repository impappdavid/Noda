import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { EyeOff, Image as ImageIcon, Plus, BarChart2, X, Smile, Trash2, AlertTriangle, BadgePlus } from 'lucide-react';
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

    return (
        <div className="bg-white">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="w-full flex items-center justify-between bg-zinc-800 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 transition-all text-left group cursor-pointer">
                        <span className="text-[11px] font-mono font-black uppercase tracking-widest">Deploy professional insight...</span>
                        <Plus size={18} />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-xl rounded-none p-0 overflow-hidden bg-white border-zinc-300 max-h-[90vh] flex flex-col shadow-2xl border-none">
                    {/* SQUARE HEADER (Matching Report Style) */}
                    <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
                        <div className="flex items-center gap-2">
                            <BadgePlus size={16} className="text-emerald-500" />
                            <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-widest">
                                Protocol: New_Deployment
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    {/* Scrollable Content */}
                    <div className="px-3 space-y-4 overflow-y-auto scrollbar-hide flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-12 h-12 flex items-center justify-center transition-colors overflow-hidden",
                                    isAnonymous ? "bg-zinc-800 " : "bg-zinc-100"
                                )}>
                                    {isAnonymous ? (
                                        <EyeOff size={18} className="text-orange-600" />
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
                                        "text-sm font-bold tracking-tight uppercase font-mono",
                                        isAnonymous ? "text-orange-600" : "text-zinc-900"
                                    )}>
                                        {isAnonymous ? 'Anonymous_Node' : 'Alex Rivers'}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-mono uppercase font-black tracking-widest">
                                        {isAnonymous ? 'Encrypted Signal' : 'Vector Engineer'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-zinc-50 p-1.5 border border-zinc-200">
                                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tight">Anon_Protocol</span>
                                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} className='cursor-pointer scale-75'/>
                            </div>
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What professional signal are you sending?"
                            className="w-full min-h-24 bg-transparent border-none focus:ring-0 outline-none text-base placeholder:text-zinc-400 resize-none overflow-hidden"
                            rows={1}
                        />

                        {/* Images & Polls (Remained similar but squared) */}
                        {images.length > 0 && (
                            <div className={cn("grid gap-1 border border-zinc-200 overflow-hidden mb-4", images.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                                {images.map((src, idx) => (
                                    <div key={idx} className="relative aspect-auto bg-zinc-100">
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                            className="absolute top-2 right-2 p-1 bg-zinc-900 text-white hover:bg-black transition-colors cursor-pointer"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showPoll && (
                            <div className="p-4 bg-zinc-50 border border-zinc-200 space-y-4">
                                <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Poll_Parameters</span>
                                    <button type="button" onClick={() => setShowPoll(false)} className="text-zinc-400 hover:text-red-500 cursor-pointer">
                                        <X size={14} />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Poll Question..."
                                    value={pollQuestion}
                                    onChange={(e) => setPollQuestion(e.target.value)}
                                    className="w-full bg-white border border-zinc-200 px-3 py-2 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900"
                                />
                                <div className="space-y-2">
                                    {pollOptions.map((option, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder={`Option ${idx + 1}`}
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...pollOptions];
                                                    newOptions[idx] = e.target.value;
                                                    setPollOptions(newOptions);
                                                }}
                                                className="flex-1 bg-white border border-zinc-200 px-3 py-2 text-xs font-mono outline-none focus:border-zinc-900"
                                            />
                                            {pollOptions.length > 2 && (
                                                <button type="button" onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))} className="text-zinc-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {pollOptions.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={() => setPollOptions([...pollOptions, ''])}
                                        className="text-[11px] font-mono font-black text-orange-500 uppercase cursor-pointer"
                                    >
                                        + Add_Option_Node
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-1 py-3 border-t border-zinc-200">
                            <input type="file" hidden ref={fileInputRef} multiple onChange={handleImageUpload} />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={cn("p-2 transition-colors", images.length >= 4 ? "text-zinc-200" : "text-zinc-500 hover:text-zinc-900")}
                                disabled={images.length >= 4}
                            >
                                <ImageIcon size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPoll(!showPoll)}
                                className={cn("p-2 transition-colors", showPoll ? "text-orange-500" : "text-zinc-500 hover:text-zinc-900")}
                            >
                                <BarChart2 size={18} />
                            </button>
                            <Button className="ml-auto bg-zinc-900 hover:bg-black text-white text-[10px] rounded-none h-10 px-8 font-mono font-black uppercase tracking-widest transition-colors">
                                Transmit_Signal
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}