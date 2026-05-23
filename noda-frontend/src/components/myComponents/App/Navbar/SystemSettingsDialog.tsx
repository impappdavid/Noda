import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Monitor,
  Smartphone,
  Globe,
  ShieldCheck,
  Mail,
  Bell,
  Lock,
  Sliders,
  Upload,
  Link2,
  Building2,
  EyeOff,
  AlertTriangle,
  AtSign,
  User,
  Settings,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Session from "./SettingsDialog/Sessions";
import Integrations from "./SettingsDialog/Integrations";
import Workspace from "./SettingsDialog/Workspace";
import Privacy from "./SettingsDialog/Privacy";
type SectionId =
  | "profile"
  | "preferences"
  | "security"
  | "sessions"
  | "connections"
  | "workspace"
  | "privacy"
  | "notifications";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormSelectorProps {
  label: string;
  defaultValue: string;
  options: { label: string; value: string }[];
}

export default function FullyLoadedVerticalSettingsDialog({
  open,
  onOpenChange,
}: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  // ==========================================
  // --- STATE MATRIX DIRECT SYSTEM MAPPINGS ---
  // ==========================================

  // 1. Profile (users.*)
  const [displayName, setDisplayName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [bio, setBio] = useState(
    "Staff Systems Architect matching decentralized runtime components.",
  );
  const [githubUrl, setGithubUrl] = useState("https://github.com/johndoe");
  const [figmaUrl, setFigmaUrl] = useState("https://figma.com/@johndoe");
  const [portfolioUrl, setPortfolioUrl] = useState("https://johndoe.dev");

  // 2. Preferences
  const [theme, setTheme] = useState<"LIGHT" | "DARK" | "SYSTEM">("LIGHT");
  const [localeCode, setLocaleCode] = useState("en-US");
  const [timezone, setTimezone] = useState("UTC");

  useEffect(() => {
    if (typeof Intl !== "undefined") {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    }
  }, []);

  // 3. Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);


  // 5. Connections
 

  // 6. Workspace Metrics
  const [minSalary, setMinSalary] = useState(165000);
  const [workModels, setWorkModels] = useState<{ [key: string]: boolean }>({
    REMOTE: true,
    HYBRID: true,
    ON_SITE: false,
  });

  // 7. Stealth & Privacy
  const [stealthModeActive, setStealthModeActive] = useState(true);
  const [hidePollActivity, setHidePollActivity] = useState(false);
  const [hideReviewIdentity, setHideReviewIdentity] = useState(true);

  // 8. Notification Compact Matrix Matrix State
  const [notifyMatrix, setNotifyMatrix] = useState({
    appUpdates: { push: true, email: true, inapp: true },
    directMessages: { push: true, email: false, inapp: true },
    socialEngagement: { push: false, email: false, inapp: true },
    recruiterDeadlines: { push: true, email: true, inapp: true },
  });

  const toggleNotify = (
    row: keyof typeof notifyMatrix,
    type: "push" | "email" | "inapp",
  ) => {
    setNotifyMatrix((prev) => ({
      ...prev,
      [row]: { ...prev[row], [type]: !prev[row][type] },
    }));
  };

  

  const navigationItems = [
    { id: "profile", label: "Public Profile" },
    { id: "preferences", label: "Preferences" },
    { id: "security", label: "Security & Login" },
    { id: "sessions", label: "Active Sessions" },
    { id: "connections", label: "Integrations" },
    { id: "workspace", label: "Workspace Match" },
    { id: "privacy", label: "Stealth Lock" },
    { id: "notifications", label: "Notification Matrix" },
  ] as const;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[150] bg-zinc-800/20 backdrop-blur-xs" />

        {/* Vertical Form Desk Layout Strategy */}
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[680px] p-0 gap-0 z-[200] rounded-none border-none bg-white shadow-2xl overflow-hidden flex flex-col text-zinc-800 focus:outline-none antialiased font-mono text-[11px]">
          {/* HEADER LAYER */}
          <div className="py-1 px-2 flex items-center justify-between bg-blue-500 border-b border-zinc-200 shrink-0 select-none">
            <div className="flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-white" />
              <span className="font-bold tracking-tight text-white uppercase">
                Settings
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1 text-zinc-100 hover:text-white hover:bg-zinc-800/30 border border-transparent transition-all cursor-pointer rounded-none"
            >
              <X size={13} />
            </button>
          </div>

          {/* SPLIT LAYOUT BODY */}
          <div className="flex-1 flex flex-row overflow-hidden">
            {/* SIDEBAR NAVIGATION PANEL */}
            <div className="w-40 bg-zinc-50/60 border-r border-zinc-200 p-2 flex flex-col justify-between shrink-0 select-none">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-zinc-400 tracking-wider block uppercase px-1">
                  Options
                </span>
                <nav className="flex flex-col gap-0.5">
                  {navigationItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          "w-full text-left py-1 px-1 rounded-none transition-all uppercase tracking-tight cursor-pointer font-bold border-r-2",
                          isActive
                            ? "text-zinc-950 bg-zinc-200/80 border-blue-500 font-bold "
                            : "text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-100/30",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* INTERNAL WORKSPACE STAGE */}
            <div className="flex-1 overflow-y-auto bg-white ">
              {/* 1. PUBLIC PROFILE */}
              {activeSection === "profile" && (
                <div className="animate-in fade-in duration-700">
                  <div className="">
                    <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                      User Informations
                    </div>
                    <div className="border-y border-zinc-300 grid grid-cols-2">
                      <div className="bg-white p-1.5 space-y-0.5  border-r border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          Full Name
                        </label>
                        <div className="relative flex items-center h-6">
                          <User className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                          <input
                            type="text"
                            value={"Alex Rivers"}
                            required
                            className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500"
                          />
                        </div>
                      </div>
                      <div className="bg-white p-1.5 space-y-0.5  border-r border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          Username
                        </label>
                        <div className="relative flex items-center h-6">
                          <AtSign className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                          <input
                            type="text"
                            value={"alexrivers"}
                            required
                            className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                      Social Links
                    </div>
                    <div className="border-y border-zinc-300 grid grid-cols-2">
                      <div className="bg-white p-1.5 space-y-0.5 border-r border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          GitHub
                        </label>
                        <div className="relative flex items-center h-6">
                          {/* Fixed UI Prefix */}
                          <span className="text-[11px] text-zinc-400 font-mono select-none shrink-0 pr-0.5">
                            github.com/
                          </span>

                          <input
                            type="text"
                            placeholder="username"
                            defaultValue="alex-rivers"
                            required
                            className="w-full text-[11px] font-mono outline-none bg-transparent placeholder:text-zinc-400 text-zinc-800"
                          />
                        </div>
                      </div>
                      <div className="bg-white p-1.5 space-y-0.5 border-r border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          X
                        </label>
                        <div className="relative flex items-center h-6">
                          {/* Fixed UI Prefix */}
                          <span className="text-[11px] text-zinc-400 font-mono select-none shrink-0 pr-0.5">
                            x.com/
                          </span>

                          <input
                            type="text"
                            placeholder="username"
                            defaultValue="alex-rivers"
                            required
                            className="w-full text-[11px] font-mono outline-none bg-transparent placeholder:text-zinc-400 text-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-1.5 space-y-0.5 border-r border-t border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          Website
                        </label>
                        <div className="relative flex items-center h-6">
                          <input
                            type="text"
                            placeholder="www.yoursite.com"
                            defaultValue="www.yoursite.com"
                            required
                            className="w-full text-[11px] font-mono outline-none bg-transparent placeholder:text-zinc-400 text-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-1.5 space-y-0.5 border-r border-t border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          LinkedIn
                        </label>
                        <div className="relative flex items-center h-6">
                          {/* Fixed UI Prefix */}
                          <span className="text-[11px] text-zinc-400 font-mono select-none shrink-0 pr-0.5">
                            linkedin.com/
                          </span>

                          <input
                            type="text"
                            placeholder="yourid"
                            defaultValue="alex-rivers"
                            required
                            className="w-full text-[11px] font-mono outline-none bg-transparent placeholder:text-zinc-400 text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ACCOUNT PREFERENCES */}
              {activeSection === "preferences" && (
                <div className=" animate-in fade-in duration-100">
                  <div className="">
                    <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                      Themes
                    </div>
                    <div className="grid grid-cols-3">
                      {(["LIGHT", "DARK", "SYSTEM"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={cn(
                            "text-left p-1.5 border transition-all flex flex-col bg-zinc-50 cursor-pointer rounded-none",
                            theme === t
                              ? " bg-zinc-300 text-white"
                              : "border-zinc-200 hover:border-zinc-300",
                          )}
                        >
                          <div
                            className={cn(
                              "w-full h-20 border relative p-1 flex flex-col justify-between",
                              t === "DARK"
                                ? "bg-zinc-800 border-zinc-800"
                                : "bg-white border-zinc-200",
                            )}
                          >
                            <div className="w-4 h-0.5 bg-zinc-400" />
                          </div>
                          <span className="text-[9px] font-bold text-zinc-900 mt-1 block px-0.5">
                            {t}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                    Language And Timezone
                  </div>
                  <div className=" bg-white grid grid-cols-2 divide-x divide-zinc-200">
                    <FormSelector
                      label="Language / Region"
                      defaultValue="us"
                      options={[
                        { label: "English (US)", value: "us" },
                        { label: "Hybrid_System", value: "hybrid" },
                        { label: "Onsite_Physical", value: "onsite" },
                      ]}
                    />
                    <FormSelector
                      label="Timezone (Auto-Detect)"
                      defaultValue="remote"
                      options={[
                        { label: "Europe/Budapest ", value: "remote" },
                        { label: "Hybrid_System", value: "hybrid" },
                        { label: "Onsite_Physical", value: "onsite" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* 3. SECURITY & LOGIN */}
              {activeSection === "security" && (
                <div className=" animate-in fade-in duration-100">
                  <div className="">
                    <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                      Change Password
                    </div>
                    <div className="bg-white p-2 space-y-1 border-b border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                          Current Password
                        </label>
                        {/* FIX: Added tabIndex={-1} to skip this during tabbing */}
                        <button
                          type="button"
                          tabIndex={-1}
                          className="text-[9px] font-mono font-bold text-zinc-500 hover:text-blue-500 hover:underline cursor-pointer uppercase outline-none transition-colors leading-none"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative flex items-center h-6">
                        <Lock className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500 "
                        />
                        {/* FIX: Added tabIndex={-1} to skip this during tabbing */}
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={togglePasswordVisibility}
                          className="text-zinc-400 hover:text-zinc-900 outline-none cursor-pointer shrink-0 ml-2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="bg-white p-2 space-y-1 border-r border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                            New Password
                          </label>
                        </div>
                        <div className="relative flex items-center h-6">
                          <Lock className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                            className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500 "
                          />
                          {/* FIX: Added tabIndex={-1} to skip this during tabbing */}
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={togglePasswordVisibility}
                            className="text-zinc-400 hover:text-zinc-900 outline-none cursor-pointer shrink-0 ml-2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-2 space-y-1  focus-within:bg-zinc-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                            Re New Password
                          </label>
                        </div>
                        <div className="relative flex items-center h-6">
                          <Lock className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                            className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500 "
                          />
                          {/* FIX: Added tabIndex={-1} to skip this during tabbing */}
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={togglePasswordVisibility}
                            className="text-zinc-400 hover:text-zinc-900 outline-none cursor-pointer shrink-0 ml-2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer py-1.5 flex justify-center text-center text-white transition-colors">
                      Update Password
                    </button>
                  </div>

                  <div className="">
                    <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
                      2Factor
                    </div>
                    <div className="border-b border-zinc-200 p-2.5 flex items-center justify-between bg-white">
                      <div className="space-y-0.5 max-w-[80%]">
                        <span className="font-bold text-zinc-900 uppercase text-[10px] block">
                          Two-Factor Authentication (2FA)
                        </span>
                        <p className="text-[9.5px] text-zinc-400 font-sans leading-tight">
                          Intercept raw malicious queries by wrapping logins
                          with a dynamic seed key validation protocol.
                        </p>
                      </div>
                      <label className="relative inline-block h-5 w-[30px] cursor-pointer rounded-full bg-zinc-200 transition duration-400 [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500">
                        <input
                          type="checkbox"
                          id="AcceptConditions"
                          className="peer sr-only"
                        />
                        <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full  ring-inset ring-white transition-all duration-300 peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
                      </label>
                    </div>
                  </div>

                  {/* Inline 2FA Debug Simulator */}
                  {show2FAModal && twoFactorEnabled && (
                    <div className="border border-zinc-300 bg-zinc-50 p-2 animate-in slide-in-from-top-2 duration-100 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold text-zinc-900 uppercase tracking-tight block">
                          // AUTH_SEED_GENERATED
                        </span>
                        <button
                          type="button"
                          onClick={() => setShow2FAModal(false)}
                          className="text-zinc-400 hover:text-zinc-900"
                        >
                          <X size={11} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-zinc-900 flex items-center justify-center p-1 shrink-0">
                          {/* QR Mock */}
                          <div className="grid grid-cols-4 gap-0.5 w-full h-full bg-white p-0.5">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-full h-full",
                                  (i * 7 + 3) % 2 === 0
                                    ? "bg-zinc-900"
                                    : "bg-white",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8.5px] font-mono text-zinc-500 uppercase block">
                            Backup Registry Key:
                          </span>
                          <span className="bg-white border border-zinc-200 px-1.5 py-0.5 text-[9.5px] font-bold text-zinc-800 tracking-wider select-all block">
                            F3K9-W2XA-09L1-MZ7P
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. ACTIVE SESSIONS */}
              {activeSection === "sessions" && (
                <Session />
              )}

              {/* 5. THIRD-PARTY CONNECTIONS */}
              {activeSection === "connections" && (
                <Integrations />
              )}

              {/* 6. WORKSPACE & JOB SEARCH */}
              {activeSection === "workspace" && (
                <Workspace />
              )}

              {/* 7. STEALTH & PRIVACY */}
              {activeSection === "privacy" && (
                <Privacy />
              )}

              {/* 8. NOTIFICATION MATRICES */}
              {activeSection === "notifications" && (
                <div className="space-y-3.5 animate-in fade-in duration-100">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                      // Compact Signal Routing Channels
                    </span>

                    {/* Dense Grid Table */}
                    <div className="border border-zinc-200 overflow-hidden bg-white">
                      <table className="w-full border-collapse text-left font-mono text-[9px]">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-200 select-none text-zinc-400 font-bold">
                            <th className="p-2 uppercase font-bold tracking-tight">
                              Trigger Event Context
                            </th>
                            <th className="p-2 text-center uppercase font-bold tracking-tight w-12">
                              Push
                            </th>
                            <th className="p-2 text-center uppercase font-bold tracking-tight w-12">
                              Mail
                            </th>
                            <th className="p-2 text-center uppercase font-bold tracking-tight w-12">
                              App
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 font-bold text-zinc-800 text-[10px]">
                          {/* Row 1 */}
                          <tr>
                            <td className="p-2 font-mono font-bold leading-tight uppercase">
                              Pipeline Progression Updates
                              <span className="block text-[8px] text-zinc-400 font-sans font-normal leading-none pt-0.5">
                                Application shifts to reviewed/interview state
                                bounds.
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.appUpdates.push}
                                onChange={() =>
                                  toggleNotify("appUpdates", "push")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.appUpdates.email}
                                onChange={() =>
                                  toggleNotify("appUpdates", "email")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.appUpdates.inapp}
                                onChange={() =>
                                  toggleNotify("appUpdates", "inapp")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                          </tr>

                          {/* Row 2 */}
                          <tr>
                            <td className="p-2 font-mono font-bold leading-tight uppercase">
                              Direct Stream Messaging
                              <span className="block text-[8px] text-zinc-400 font-sans font-normal leading-none pt-0.5">
                                Inbound message queries initialized by platform
                                connections.
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.directMessages.push}
                                onChange={() =>
                                  toggleNotify("directMessages", "push")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.directMessages.email}
                                onChange={() =>
                                  toggleNotify("directMessages", "email")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.directMessages.inapp}
                                onChange={() =>
                                  toggleNotify("directMessages", "inapp")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                          </tr>

                          {/* Row 3 */}
                          <tr>
                            <td className="p-2 font-mono font-bold leading-tight uppercase">
                              Feed Engagement Actions
                              <span className="block text-[8px] text-zinc-400 font-sans font-normal leading-none pt-0.5">
                                Mentions, likes, or conclusion updates on public
                                poll indexes.
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.socialEngagement.push}
                                onChange={() =>
                                  toggleNotify("socialEngagement", "push")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.socialEngagement.email}
                                onChange={() =>
                                  toggleNotify("socialEngagement", "email")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.socialEngagement.inapp}
                                onChange={() =>
                                  toggleNotify("socialEngagement", "inapp")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                          </tr>

                          {/* Row 4 */}
                          <tr>
                            <td className="p-2 font-mono font-bold leading-tight uppercase text-amber-800 flex items-center gap-1">
                              <AlertTriangle
                                size={11}
                                className="text-amber-600 shrink-0"
                              />
                              <div className="leading-tight">
                                Recruiter Service Deadlines
                                <span className="block text-[8px] text-zinc-400 font-sans font-normal leading-none pt-0.5">
                                  Active warnings for response rates & strike
                                  boundaries.
                                </span>
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.recruiterDeadlines.push}
                                onChange={() =>
                                  toggleNotify("recruiterDeadlines", "push")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.recruiterDeadlines.email}
                                onChange={() =>
                                  toggleNotify("recruiterDeadlines", "email")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <input
                                type="checkbox"
                                checked={notifyMatrix.recruiterDeadlines.inapp}
                                onChange={() =>
                                  toggleNotify("recruiterDeadlines", "inapp")
                                }
                                className="accent-zinc-900 cursor-pointer w-3 h-3"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LOWER RUNTIME COMMITS */}
          <div className="h-11 border-t border-zinc-200 bg-zinc-50 px-3 flex items-center justify-between shrink-0 select-none">
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tight">
              STATE // LOCAL_BUFFER_FLUSH_READY
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-6 px-3 border border-zinc-200 bg-white hover:bg-zinc-100 rounded-none text-[10px] font-bold uppercase text-zinc-700 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-6 px-4 bg-blue-600 hover:bg-blue-700 rounded-none text-[10px] font-bold uppercase tracking-wide text-white cursor-pointer transition-all"
              >
                Save Local States
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export const FormSelector = React.memo(
  ({ label, defaultValue, options }: FormSelectorProps) => (
    <div className="bg-white p-1.5 pb-1 space-y-0.5 border-r border-b border-zinc-300">
      <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
        {label}
      </label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="h-5 w-full rounded-none border-none p-0 text-[10px] font-bold uppercase focus:ring-0 shadow-none cursor-pointer bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={4}
          className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white z-[201]"
        >
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-xs cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
);
