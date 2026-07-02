// src/components/system/GlobalNotificationDock.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/context/NotificationContext";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export const GlobalNotificationDock: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    /* Pinned top-center container */
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 w-full max-w-sm px-4 h-48 pointer-events-none flex justify-center items-start">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif, index) => {
          // Calculate distance from the front of the line
          const positionFromTop = notifications.length - 1 - index;

          // Only stack and display the top 3 notifications
          if (positionFromTop > 2) return null;

          // Compute smooth layout offsets for the stacked cards underneath
          const scale = 1 - positionFromTop * 0.04;      
          const translateY = positionFromTop * 8;       // Drops down 8px per card layer
          const opacity = 1 - positionFromTop * 0.3;     // Fades out cards lower in the deck

          return (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ 
                opacity: opacity,
                y: translateY,
                scale: scale,
                pointerEvents: positionFromTop === 0 ? "auto" : "none"
              }}
              exit={{ opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
              className="absolute w-[calc(100%-32px)] p-3 bg-white text-zinc-950 border border-zinc-300 rounded-none flex items-start gap-3 select-none font-mono"
              style={{ 
                zIndex: index 
              }}
            >
              {/* CLEAN CONTRAST STATUS INDICATORS */}
              {notif.type === "success" && (
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5 stroke-2" />
              )}
              {notif.type === "error" && (
                <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5 stroke-2" />
              )}
              {notif.type === "info" && (
                <Info size={15} className="text-blue-600 shrink-0 mt-0.5 stroke-2" />
              )}

              {/* CORE METADATA FIELD */}
              <div className="flex-1 flex flex-col text-left min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 leading-none">
                  {notif.title || "SYSTEM BROADCAST"}
                </div>
                <p className="text-xs text-zinc-800 font-semibold leading-snug mt-1 uppercase text-[11px] truncate">
                  {notif.message}
                </p>
              </div>

              {/* DISMISS CROSS ON FRONT CARD */}
              {positionFromTop === 0 && (
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer outline-none border-none bg-transparent shrink-0"
                >
                  <X size={14} className="stroke-2" />
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};