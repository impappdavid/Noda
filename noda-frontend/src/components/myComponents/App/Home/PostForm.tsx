import { useState } from 'react';
import {
    EyeOff,
    Image as ImageIcon,
    Link2,
    Plus
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PostForm = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <div className="p-4 border-b border-zinc-300 bg-white">
            <Dialog>
                {/* The Trigger: A clean input-like button to open the modal */}
                <DialogTrigger asChild>
                    <button className="w-full flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-100 transition-all text-left">
                        <span>Deploy professional insight...</span>
                        <Plus className="w-4 h-4 text-zinc-300" />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-xl rounded-[2rem] border-zinc-300 p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-[0.2em]">
                            New Deployment
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        {/* Context Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center ${isAnonymous ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                                {isAnonymous ? <EyeOff className="w-4 h-4 text-orange-500" /> : <div className="w-full h-full bg-zinc-300 rounded-full" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-zinc-900">
                                    {isAnonymous ? 'Anonymous Node' : 'Alex Rivers'}
                                </span>
                                <span className="text-xs text-zinc-500 font-mono uppercase tracking-tighter">
                                    {isAnonymous ? 'Encrypted Signal' : 'Vector Engineer'}
                                </span>
                            </div>
                        </div>

                        {/* Post Input */}
                        <textarea
                            placeholder="What professional signal are you sending?"
                            className="w-full min-h-[160px] bg-transparent border-none focus:ring-0 outline-none text-base resize-none placeholder:text-zinc-400 leading-relaxed"
                            autoFocus
                        />

                        {/* Utility Bar */}
                        <div className="flex items-center gap-2 pb-4">
                            <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors">
                                <ImageIcon className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors">
                                <Link2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-400">
                            <div className="flex items-center gap-3">
                                <Switch
                                    id="anonymous-mode"
                                    checked={isAnonymous}
                                    onCheckedChange={setIsAnonymous}
                                    className="data-[state=checked]:bg-orange-500"
                                />
                                <label
                                    htmlFor="anonymous-mode"
                                    className={`text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${isAnonymous ? 'text-orange-600' : 'text-zinc-500'}`}
                                >
                                    {isAnonymous ? 'Anonymous Active' : 'Public Signal'}
                                </label>
                            </div>

                            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 h-9 text-xs font-bold group">
                                Deploy Node
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PostForm;