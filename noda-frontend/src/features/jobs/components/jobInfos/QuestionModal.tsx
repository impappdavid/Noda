import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ClipboardList, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  role: string;
}

export const QuestionnaireModal = ({
  isOpen,
  onClose,
  onComplete,
  role,
}: QuestionnaireModalProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const [answers, setAnswers] = useState({ years: "", reason: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
        <DialogHeader className="bg-blue-500 p-1.5 flex justify-between w-full items-center space-y-0">
          <DialogTitle className="text-[10px] font-bold uppercase text-white flex gap-2 items-center">
            <ClipboardList size={14} className="text-white" />
            Application Questions
          </DialogTitle>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center bg-white/30 px-2 py-0.5 ">
              <span className="text-[9px] font-mono font-bold text-white">STEP</span>
              <span className="text-[10px] font-black text-black font-mono">
                0{step}/0{totalSteps}
              </span>
            </div>
            <DialogClose asChild>
              <button className="hover:bg-zinc-800/20 cursor-pointer p-1 transition-colors outline-none border-none bg-transparent">
                <X className="w-4 h-4 text-zinc-200" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="border-b border-zinc-300 flex divide-x divide-zinc-300">
            <div className="p-2 flex-1">
              <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Role</div>
              <div className="text-[10px] font-bold uppercase truncate">{role}</div>
            </div>
            <div className="p-2 w-24">
              <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Company</div>
              <div className="text-[10px] font-bold uppercase text-blue-600 hover:underline cursor-pointer">
                Noda
              </div>
            </div>
          </div>

          <div className="min-h-[140px]">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="p-2 flex flex-col gap-2"
              >
                <label className="text-[10px] font-bold uppercase tracking-tight flex justify-between">
                  01. Years of relevant experience?
                  <span className="text-zinc-500 font-mono">[INT]</span>
                </label>
                <input 
                  type="number"
                  autoFocus
                  value={answers.years}
                  onChange={(e) => setAnswers({...answers, years: e.target.value})}
                  placeholder="0"
                  className="w-full bg-zinc-50 border border-zinc-300 p-2 text-[11px] font-mono outline-none focus:bg-white transition-colors rounded-none"
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="p-2 flex flex-col gap-2"
              >
                <label className="text-[10px] font-bold uppercase tracking-tight flex justify-between">
                  02. Write a Cover Letter that contains why do you want to work at this company
                  <span className="text-zinc-500 font-mono">[STR]</span>
                </label>
                <textarea 
                  autoFocus
                  value={answers.reason}
                  onChange={(e) => setAnswers({...answers, reason: e.target.value})}
                  placeholder="MOTIVATION Letter..."
                  className="w-full h-24 bg-zinc-50 border border-zinc-300 p-2 text-[11px] font-mono outline-none resize-none focus:bg-white transition-colors rounded-none"
                />
              </motion.div>
            )}
          </div>

          <div className="flex border-t border-zinc-300">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 h-10 bg-white text-zinc-500 font-bold text-[10px] uppercase tracking-wider hover:bg-zinc-100 cursor-pointer transition-all border-none border-r border-zinc-300 rounded-none"
              >
                Previous
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!answers.years}
                className="flex-[2] h-10 bg-zinc-800 text-white cursor-pointer font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-blue-500 disabled:bg-zinc-300 disabled:text-zinc-500 transition-all flex items-center justify-center gap-2 border-none rounded-none"
              >
                Next Question 
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={answers.reason.length < 10 || isSubmitting}
                className="flex-[2] h-10 bg-blue-500 cursor-pointer text-white font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-blue-600 disabled:bg-zinc-200 disabled:text-zinc-400 transition-all flex items-center justify-center gap-2 border-none rounded-none"
              >
                {isSubmitting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>Send Application</>
                )}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};