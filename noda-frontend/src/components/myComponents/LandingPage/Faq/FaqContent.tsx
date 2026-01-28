import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const FAQContent = () => {
  const faqs = [
    {
      value: "item-1",
      question: "How does the 14-day anti-ghosting protocol work?",
      answer: "Noda monitors recruiter engagement in real-time. If an application receives no status update within 14 days, the listing is purged to maintain network integrity."
    },
    {
      value: "item-2",
      question: "Is my 'Node' (profile) private?",
      answer: "Yes. Your data is encrypted and only shared with recruiters when a high-probability vector match is identified and you authorize the connection."
    },
    {
      value: "item-3",
      question: "What exactly is a 'Match Score'?",
      answer: "It is a mathematical calculation of the proximity between your skills and a role's requirements using vector embeddings."
    },
    {
      value: "item-4",
      question: "How do anonymous reviews stay verified?",
      answer: "Reviews can only be submitted by 'Verified Nodes' who have completed an interview cycle, ensuring total data integrity."
    }
  ];

  return (
    <main className="flex-1 max-w-xl pb-20">
      <header className="mb-12">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 mb-2">Help & Intelligence</h1>
        <p className="text-sm text-zinc-500">Frequently asked questions about the Noda protocols.</p>
      </header>

      {/* Styled shadcn Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq) => (
          <AccordionItem 
            key={faq.value} 
            value={faq.value}
            className="border border-zinc-100 rounded-2xl bg-white px-2 hover:border-zinc-200 transition-all px-4"
          >
            <AccordionTrigger className="text-sm font-semibold text-zinc-900 hover:no-underline py-5 text-left leading-snug [&[data-state=open]>svg]:text-orange-500">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-zinc-500 leading-relaxed pb-5 border-t border-zinc-50 pt-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Support Tunnel CTA */}
      <div className="mt-16 p-6 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-zinc-200">
            <HelpCircle className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">Still have questions?</h4>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter mt-0.5">Support Tunnel: Active</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-bold hover:bg-zinc-800 transition-colors">
          Open Ticket
        </button>
      </div>
    </main>
  );
};

export default FAQContent;