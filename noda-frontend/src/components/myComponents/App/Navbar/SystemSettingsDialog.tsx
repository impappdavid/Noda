import React, { useState } from "react";
import {
  Search,
  Settings,
  Globe,
  Shield,
  Laptop,
  Link2,
  EyeOff,
  Bell,
  User,
  Briefcase,
  Mail,
  KeyRound,
  Chrome,
  Smartphone,
  Globe2,
  Trash2,
  X,
  UserLock,
  Compass,
  Building2,
  Scale,
  DollarSign,
  Fingerprint,
  Webhook,
  Activity,
  History,
  CloudLightning,
  RefreshCw,
  Database,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

// Native Shadcn Drop-ins
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SettingCategory =
  | "PROFILE"
  | "PREFERENCES"
  | "SECURITY"
  | "SESSIONS"
  | "OAUTH"
  | "WORKSPACE"
  | "STEALTH"
  | "NOTIFICATIONS";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Custom Brutalist Tactical Matrix Switch
const CustomTerminalSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={cn(
      "h-6 px-2 font-mono text-[9px] font-black tracking-widest border transition-colors cursor-pointer select-none rounded-none flex items-center gap-1 shrink-0",
      checked 
        ? "bg-zinc-950 text-white border-zinc-950" 
        : "bg-zinc-50 text-zinc-400 border-zinc-300 hover:bg-zinc-100"
    )}
  >
    <span>[{checked ? "●" : " "}]</span>
    <span>{checked ? "ACTIVE" : "BYPASS"}</span>
  </button>
);

export default function SystemSettingsDialog({ open, onOpenChange }: DialogProps) {
  const [activeTab, setActiveTab] = useState<SettingCategory>("PROFILE");
  const [searchQuery, setSearchQuery] = useState("");

  const MENU_NODES = [
    { id: "PROFILE", desc: "Public Profile & Links", icon: User },
    { id: "PREFERENCES", desc: "Account Preferences", icon: Globe },
    { id: "SECURITY", desc: "Security & Login", icon: Shield },
    { id: "SESSIONS", desc: "Active Sessions & Telemetry", icon: Laptop },
    { id: "OAUTH", desc: "Third-Party Integrations", icon: Link2 },
    { id: "WORKSPACE", desc: "Workspace & Parameters", icon: Briefcase },
    { id: "STEALTH", desc: "Stealth & Obfuscation", icon: EyeOff },
    { id: "NOTIFICATIONS", desc: "Notification Dispatch Matrices", icon: Bell },
  ] as const;

  const filteredMenu = MENU_NODES.filter((node) =>
    node.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[150] bg-zinc-950/20 backdrop-blur-none" />

        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[80vh] p-0 gap-0 z-[200] rounded-none focus:outline-none flex flex-row select-none border border-zinc-400 bg-white shadow-none [&>button]:hidden">
          
          <div className="absolute top-2 right-2 z-10">
            <DialogClose className="p-1 border border-transparent hover:border-zinc-400 hover:bg-zinc-100 transition-colors cursor-pointer rounded-none">
              <X className="w-4 h-4 text-zinc-600" />
            </DialogClose>
          </div>

          {/* LEFT SIDEBAR CONTROLLER */}
          <div className="w-64 bg-zinc-50 flex flex-col justify-between border-r border-zinc-400 shrink-0">
            <div className="flex flex-col">
              <div className="px-3 py-3 bg-zinc-900 flex items-center text-white border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <Settings size={13} className="text-zinc-400" />
                  <span className="text-[11px] font-mono font-black tracking-[0.12em] uppercase text-zinc-100">
                    SYSTEM_CORE_VARIABLES
                  </span>
                </div>
              </div>

              <div className="p-2 bg-white border-b border-zinc-400 flex items-center gap-2">
                <Search size={12} className="text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="FILTER CONFIG CONTEXT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[11px] font-mono outline-none border-0 p-0 text-zinc-900 uppercase font-bold placeholder-zinc-400 focus:ring-0"
                />
              </div>

              <nav className="flex flex-col overflow-y-auto max-h-[calc(80vh-82px)] divide-y divide-zinc-200">
                {filteredMenu.map((node) => {
                  const Icon = node.icon;
                  const isSelected = activeTab === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveTab(node.id)}
                      className={cn(
                        "w-full text-left p-3 transition-colors flex flex-col gap-0.5 rounded-none text-zinc-500 cursor-pointer relative border-0",
                        isSelected ? "bg-white text-zinc-950 font-black" : "bg-zinc-50 hover:bg-zinc-100",
                      )}
                    >
                      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900" />}
                      <span className="text-[11px] font-mono tracking-tight flex items-center gap-2.5">
                        <Icon size={13} className={isSelected ? "text-zinc-950" : "text-zinc-400"} />
                        <span className="truncate uppercase">{node.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="w-full bg-zinc-100 p-2.5 text-[10px] font-mono font-bold text-center uppercase tracking-wider text-red-600 hover:bg-red-50 border-t border-zinc-400 cursor-pointer transition-colors rounded-none"
            >
              HALT_CONTEXT_STREAM_[ESC]
            </button>
          </div>

          {/* MAIN CONFIGURATION CANVAS */}
          <div className="flex-1 bg-white overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-6">
              {activeTab === "PROFILE" && <CategoryProfile />}
              {activeTab === "PREFERENCES" && <CategoryPreferences />}
              {activeTab === "SECURITY" && <CategorySecurity />}
              {activeTab === "SESSIONS" && <CategorySessions />}
              {activeTab === "OAUTH" && <CategoryOAuth />}
              {activeTab === "WORKSPACE" && <CategoryWorkspace />}
              {activeTab === "STEALTH" && <CategoryStealth />}
              {activeTab === "NOTIFICATIONS" && <CategoryNotifications />}
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-300 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => onOpenChange(false)}
                className="h-8 px-4 border border-zinc-400 text-[10px] font-mono font-bold uppercase tracking-wider bg-white text-zinc-600 hover:bg-zinc-50 rounded-none cursor-pointer transition-colors shadow-none"
              >
                Abort Changes
              </button>
              <button className="h-8 px-5 bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors rounded-none cursor-pointer border-0 shadow-none">
                Commit Modifications
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

const ModuleHeader = ({ title }: { title: string }) => (
  <div className="pb-2 border-b border-zinc-400 mb-4">
    <h2 className="text-xs font-mono font-black uppercase tracking-wider text-zinc-950">
      {title}
    </h2>
  </div>
);

/* ============================================================================
   SUB-CATEGORIES 
   ============================================================================ */

function CategoryProfile() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="SYS_PORTFOLIO_LINKS" />
      <div className="w-full h-20 bg-zinc-50 border border-zinc-300 flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-zinc-100/50 hover:border-zinc-400 transition-colors rounded-none">
        <span className="text-[9px] font-mono text-zinc-500 font-bold tracking-wider uppercase flex flex-col items-center">
          OVERWRITE SYSTEM BANNER BITSTREAM
          <span className="text-zinc-400 font-normal">[1080 x 600 RAW]</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center font-mono font-black text-white text-xs shrink-0 rounded-none border border-zinc-900">
          AR
        </div>
        <div className="space-y-1">
          <Label className="text-[9px] font-mono font-bold uppercase text-zinc-400 block">AVATAR_IMAGE_HEX</Label>
          <button className="h-6 px-2.5 border border-zinc-400 text-[9px] font-mono font-bold uppercase bg-white hover:bg-zinc-50 rounded-none cursor-pointer shadow-none">
            Update Block
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 border border-zinc-300 divide-x divide-zinc-300">
        <div className="bg-white p-2 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Identity Record</label>
          <div className="flex items-center h-5">
            <User className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input defaultValue="Alex Rivers" className="w-full text-xs font-bold font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0" />
          </div>
        </div>
        <div className="bg-white p-2 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">System Routing Alias</label>
          <div className="flex items-center h-5">
            <User className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input defaultValue="@arivers" className="w-full text-xs font-bold font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border border-zinc-300 divide-x divide-zinc-300 divide-y divide-zinc-300">
        <div className="bg-white p-2 space-y-1 col-span-2">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Primary Contact Route</label>
          <div className="flex items-center h-5">
            <Mail className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input defaultValue="alexr@gmail.com" className="w-full text-xs font-bold font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0" />
          </div>
        </div>
        <div className="bg-white p-2 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">GitHub URI</label>
          <div className="flex items-center h-5">
            <Link2 className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input defaultValue="github.com/arivers" className="w-full text-[11px] font-bold font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0 uppercase" />
          </div>
        </div>
        <div className="bg-white p-2 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Portfolio Gateway</label>
          <div className="flex items-center h-5">
            <Link2 className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input defaultValue="alexrivers.dev" className="w-full text-[11px] font-bold font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0 uppercase" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPreferences() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="PREF_LOCALIZATION" />

      <div className="border border-zinc-300 bg-white divide-y divide-zinc-300">
        <div className="p-3 flex items-center justify-between gap-8 bg-zinc-50/50">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-black text-zinc-900 block uppercase">Language Engine Mapping</span>
            <span className="text-[10px] font-mono text-zinc-400 block leading-none">Defines system-wide literal value tokenization translations.</span>
          </div>
          <div className="w-56 shrink-0">
            <Select defaultValue="en">
              <SelectTrigger className="h-7 w-full rounded-none text-xs font-bold font-mono border border-zinc-400 bg-white px-2 shadow-none focus:ring-0 focus:border-zinc-900 flex justify-between items-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={1} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
                <SelectItem value="en" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">ENGLISH (US_ASCII)</SelectItem>
                <SelectItem value="jp" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">JAPANESE (N2_SHIFT_JIS)</SelectItem>
                <SelectItem value="de" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">GERMAN (DE_UTF8)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-3 flex items-center justify-between gap-8 bg-zinc-50/50">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-black text-zinc-900 block uppercase">Chronometer Offsetting</span>
            <span className="text-[10px] font-mono text-zinc-400 block leading-none">Locks calculations to localized geospatial telemetry timestamps.</span>
          </div>
          <div className="w-56 shrink-0">
            <Select defaultValue="cet">
              <SelectTrigger className="h-7 w-full rounded-none text-xs font-bold font-mono border border-zinc-400 bg-white px-2 shadow-none focus:ring-0 focus:border-zinc-900 flex justify-between items-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={1} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
                <SelectItem value="pst" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">PST (UTC -08:00)</SelectItem>
                <SelectItem value="cet" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">CET (UTC +01:00)</SelectItem>
                <SelectItem value="gmt" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">GMT (UTC +00:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-3 flex items-center justify-between gap-8 bg-zinc-50/50">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-black text-zinc-900 block uppercase">Editor Keybindings Structure</span>
            <span className="text-[10px] font-mono text-zinc-400 block leading-none">Alters hotkey focus manipulation maps throughout dialog frames.</span>
          </div>
          <div className="w-56 shrink-0">
            <Select defaultValue="standard">
              <SelectTrigger className="h-7 w-full rounded-none text-xs font-bold font-mono border border-zinc-400 bg-white px-2 shadow-none focus:ring-0 focus:border-zinc-900 flex justify-between items-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={1} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
                <SelectItem value="standard" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">STANDARD ACCEL</SelectItem>
                <SelectItem value="vim" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">VIM MATRIX (HJKL)</SelectItem>
                <SelectItem value="emacs" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">EMACS PIPELINES</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 border border-zinc-300 space-y-2">
        <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">UI Theme Engine</label>
        <div className="grid grid-cols-3 border border-zinc-300 divide-x divide-zinc-300">
          {["☀️ LIGHT_MATRIX", "🌙 OBFUSCATED_DARK", "💻 INHERIT_SYSTEM"].map((label, idx) => (
            <button
              key={idx}
              className={cn(
                "p-2 text-center text-[10px] font-mono font-bold cursor-pointer rounded-none border-0 transition-colors",
                idx === 1 ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategorySecurity() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="SEC_CREDENTIAL_SHIELD" />

      <div className="border border-zinc-300 bg-white">
        <div className="p-2 bg-zinc-50 border-b border-zinc-300 flex items-center justify-between">
          <span className="text-[9px] font-mono font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wider">
            <KeyRound size={12} className="text-zinc-500" /> PASSKEY ROTATION PROTOCOL
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-zinc-300">
          <div className="p-2 space-y-1">
            <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Active Sign Key</label>
            <input type="password" placeholder="••••••••••••" className="w-full h-5 text-xs font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0" />
          </div>
          <div className="p-2 space-y-1">
            <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Target Payload Key</label>
            <input type="password" placeholder="••••••••••••" className="w-full h-5 text-xs font-mono text-zinc-800 outline-none bg-transparent p-0 border-0 focus:ring-0" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border border-zinc-300 divide-x divide-zinc-300 bg-white">
        <div className="p-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-[11px] font-mono font-bold uppercase text-zinc-900">Cryptographic 2FA</h4>
            <p className="text-[9px] text-zinc-400 font-mono leading-none">Require payload authorization block handshakes.</p>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>
        <div className="p-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-[11px] font-mono font-bold uppercase text-zinc-900">Hardware Keys Only</h4>
            <p className="text-[9px] text-zinc-400 font-mono leading-none">Reject backup SMS entry verification requests.</p>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

function CategorySessions() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="SEC_ACTIVE_REGISTRY" />

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-zinc-400 bg-white p-3 flex flex-col justify-between h-28 relative">
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-zinc-950" />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-900">
              <Chrome size={13} className="shrink-0" />
              <span className="text-[11px] font-mono font-black truncate">CHROME / MACOS</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 block leading-tight">IP: 185.24.233.10<br />BUDAPEST, HU</span>
          </div>
          <div className="text-[9px] font-mono bg-zinc-900 text-white px-1.5 py-0.5 font-bold uppercase tracking-wider self-start">
            CORE_NODE
          </div>
        </div>

        <div className="border border-zinc-300 bg-zinc-50/50 p-3 flex flex-col justify-between h-28">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-700">
              <Smartphone size={13} className="shrink-0" />
              <span className="text-[11px] font-mono font-bold truncate">SAFARI / IPHONE</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 block leading-tight">IP: 74.125.19.103<br />SAN FRANCISCO, US</span>
          </div>
          <button className="text-[9px] font-mono border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100 px-1.5 py-0.5 font-bold uppercase tracking-wider text-red-600 transition-colors self-start rounded-none cursor-pointer">
            TERMINATE
          </button>
        </div>

        <div className="border border-zinc-300 bg-zinc-50/50 p-3 flex flex-col justify-between h-28">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-700">
              <Laptop size={13} className="shrink-0" />
              <span className="text-[11px] font-mono font-bold truncate">FIREFOX / WIN11</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 block leading-tight">IP: 46.137.91.201<br />BERLIN, DE</span>
          </div>
          <button className="text-[9px] font-mono border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100 px-1.5 py-0.5 font-bold uppercase tracking-wider text-red-600 transition-colors self-start rounded-none cursor-pointer">
            TERMINATE
          </button>
        </div>
      </div>

      <div className="border border-zinc-400 bg-zinc-950 p-3 text-zinc-400 font-mono text-[9px] relative h-36 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-zinc-800 rounded-none opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-zinc-800 rounded-none opacity-30" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-800" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-zinc-800" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-zinc-950 px-2 py-1 border border-zinc-700 z-10">
          <div className="text-white font-black">LOC_LOCK: BUDAPEST_HU</div>
          <div className="text-zinc-500 text-[8px]">47.4979° N, 19.0402° E // ZOOM: 12.4x</div>
        </div>

        <div className="absolute bottom-2 left-2 text-zinc-500 uppercase tracking-widest text-[8px] flex items-center gap-1">
          <Compass size={10} /> TELEMETRY INTERCEPT ENGINE STATUS: STATIC_RESOLVED
        </div>
      </div>
    </div>
  );
}

function CategoryOAuth() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="AUTH_EXTERNAL_SSO" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "Google", domain: "google.com/auth", desc: "Syncs master calendar clusters and verification loops.", connected: true, color: "bg-red-500" },
          { name: "GitHub", domain: "github.com/oauth", desc: "Validates code verification hashes against profile.", connected: true, color: "bg-zinc-900" },
          { name: "LinkedIn", domain: "linkedin.com/api", desc: "Imports historical credential experience registers.", connected: false, color: "bg-blue-600" }
        ].map((item, idx) => (
          <div key={idx} className="border border-zinc-300 bg-white p-3 flex flex-col justify-between h-40">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={cn("w-6 h-6 flex items-center justify-center text-white text-xs font-black font-mono rounded-none", item.color)}>
                  {item.name[0]}
                </div>
                <span className={cn("text-[8px] font-mono font-bold uppercase tracking-wider px-1 border", 
                  item.connected ? "border-zinc-950 bg-zinc-50 text-zinc-950" : "border-zinc-200 text-zinc-300"
                )}>
                  {item.connected ? "SECURED" : "NULL"}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-mono font-black uppercase text-zinc-900">{item.name}</h4>
                <p className="text-[9px] font-mono text-zinc-400 truncate lowercase">{item.domain}</p>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 leading-tight line-clamp-2">
                {item.desc}
              </p>
            </div>
            
            <button className={cn("w-full h-6 font-mono text-[9px] font-bold uppercase tracking-wider border rounded-none cursor-pointer transition-colors shadow-none",
              item.connected ? "border-zinc-300 text-zinc-400 bg-white hover:bg-zinc-50" : "bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800"
            )}>
              {item.connected ? "EJECT LINK" : "INITIALIZE"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryWorkspace() {
  const [isRemote, setIsRemote] = useState(true);

  return (
    <div className="space-y-4">
      <ModuleHeader title="WORK_MATCH_CRITERIA" />

      {/* Fixed Value Selectors Option Matrices Instead of Inputs */}
      <div className="grid grid-cols-2 gap-3">
        
        <div className="border border-zinc-300 bg-white p-2.5 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
            <Building2 size={11} /> Base Domain Allocation
          </label>
          <Select defaultValue="internal">
            <SelectTrigger className="h-6 w-full rounded-none text-xs font-bold font-mono border-0 bg-transparent p-0 shadow-none focus:ring-0 flex justify-between items-center text-zinc-800 uppercase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
              <SelectItem value="internal" className="text-xs rounded-none font-mono cursor-pointer uppercase">NODALABS.INTERNAL.DOMAIN</SelectItem>
              <SelectItem value="sandbox" className="text-xs rounded-none font-mono cursor-pointer uppercase">STAGING.SANDBOX.NET</SelectItem>
              <SelectItem value="isolated" className="text-xs rounded-none font-mono cursor-pointer uppercase">DMZ.ISOLATED_CLUSTER.ORG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-zinc-300 bg-white p-2.5 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
            <Scale size={11} /> Legal Jurisdiction Mask
          </label>
          <Select defaultValue="eu">
            <SelectTrigger className="h-6 w-full rounded-none text-xs font-bold font-mono border-0 bg-transparent p-0 shadow-none focus:ring-0 flex justify-between items-center text-zinc-800 uppercase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
              <SelectItem value="eu" className="text-xs rounded-none font-mono cursor-pointer uppercase">EU_CONTRACT_LAW_2026</SelectItem>
              <SelectItem value="us" className="text-xs rounded-none font-mono cursor-pointer uppercase">US_DELAWARE_CORP_REG</SelectItem>
              <SelectItem value="ch" className="text-xs rounded-none font-mono cursor-pointer uppercase">CH_SWISS_PRIVACY_STATUTE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-zinc-300 bg-white p-2.5 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
            <DollarSign size={11} /> Operational Overhead Margin
          </label>
          <Select defaultValue="12">
            <SelectTrigger className="h-6 w-full rounded-none text-xs font-bold font-mono border-0 bg-transparent p-0 shadow-none focus:ring-0 flex justify-between items-center text-zinc-800 uppercase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
              <SelectItem value="5" className="text-xs rounded-none font-mono cursor-pointer uppercase">MAX_5_PERCENT_MARGIN</SelectItem>
              <SelectItem value="12" className="text-xs rounded-none font-mono cursor-pointer uppercase">MAX_12_PERCENT_MARGIN</SelectItem>
              <SelectItem value="25" className="text-xs rounded-none font-mono cursor-pointer uppercase">MAX_25_PERCENT_MARGIN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-zinc-300 bg-white p-2.5 space-y-1">
          <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
            <History size={11} /> Contract Minimum Runway
          </label>
          <Select defaultValue="18">
            <SelectTrigger className="h-6 w-full rounded-none text-xs font-bold font-mono border-0 bg-transparent p-0 shadow-none focus:ring-0 flex justify-between items-center text-zinc-800 uppercase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
              <SelectItem value="6" className="text-xs rounded-none font-mono cursor-pointer uppercase">6_MONTHS_MINIMUM</SelectItem>
              <SelectItem value="18" className="text-xs rounded-none font-mono cursor-pointer uppercase">18_MONTHS_MINIMUM</SelectItem>
              <SelectItem value="36" className="text-xs rounded-none font-mono cursor-pointer uppercase">36_MONTHS_LONG_RANGE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-zinc-300 bg-white">
        <div className="p-2 bg-zinc-50 border-b border-zinc-300">
          <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-wider block">
            Remuneration & Geography Matrices
          </span>
        </div>

        <div className="divide-y divide-zinc-200">
          <div className="p-3 space-y-2">
            <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-500 uppercase">
              <span>Target Base Compensation Matrix</span>
              <span className="text-zinc-950 font-black">$145,000 USD / YR</span>
            </div>
            <div className="pt-1 px-0.5">
              <Slider
                defaultValue={[145000]}
                min={80000}
                max={300000}
                step={5000}
                className="[&_[data-slot=track]]:bg-zinc-100 [&_[data-slot=range]]:bg-zinc-900 [&_[data-slot=thumb]]:border-zinc-900 [&_[data-slot=thumb]]:bg-zinc-900 [&_[data-slot=thumb]]:rounded-none [&_[data-slot=thumb]]:h-3 [&_[data-slot=thumb]]:w-3 shadow-none"
              />
            </div>
          </div>

          <div className="p-3 space-y-2">
            <label className="text-[9px] font-mono font-black uppercase text-zinc-500 block tracking-wider">
              Deployment Matrix Arrangements
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-zinc-900 cursor-pointer">
                <Checkbox
                  checked={isRemote}
                  onCheckedChange={(checked) => setIsRemote(!!checked)}
                  className="rounded-none h-3.5 w-3.5 border-zinc-400 data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900 data-[state=checked]:text-white shadow-none"
                />
                100% Remote Isolation
              </label>
              {["Hybrid_Node", "On-Site_Static"].map((arr) => (
                <label key={arr} className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-zinc-400 cursor-pointer">
                  <Checkbox className="rounded-none h-3.5 w-3.5 border-zinc-300 data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900 shadow-none" />
                  {arr}
                </label>
              ))}
            </div>
          </div>

          {isRemote && (
            <div className="p-3 bg-zinc-50 space-y-1">
              <label className="text-[9px] font-mono font-black uppercase text-zinc-900 flex items-center gap-1">
                <Globe2 size={11} /> Local Exclusivity Target Constraints
              </label>
              <Select defaultValue="multi">
                <SelectTrigger className="h-6 w-full rounded-none text-xs font-bold font-mono border-0 bg-transparent p-0 shadow-none focus:ring-0 flex justify-between items-center text-zinc-800 uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="global" className="text-xs rounded-none font-mono cursor-pointer uppercase">UNRESTRICTED GLOBAL BOUNDARIES</SelectItem>
                  <SelectItem value="multi" className="text-xs rounded-none font-mono cursor-pointer uppercase">EUROPEAN ZONE ONLY [PL, HU, DE, CZ]</SelectItem>
                  <SelectItem value="na" className="text-xs rounded-none font-mono cursor-pointer uppercase">NORTH AMERICAN EMISSION JURISDICTIONS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryStealth() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="STEALTH_PRIVACY_MATRIX" />

      <div className="border border-zinc-300 divide-y divide-zinc-200 bg-white">
        <div className="p-3 flex justify-between items-center">
          <div className="space-y-0.5 max-w-xl pr-4">
            <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Absolute Encryption Mask</h4>
            <p className="text-[10px] font-mono text-zinc-400 leading-tight">Drop completely out of global metadata scraping engines entirely.</p>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>

        <div className="p-3 flex justify-between items-center">
          <div className="space-y-0.5 max-w-xl pr-4">
            <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Action Telemetry Masking</h4>
            <p className="text-[10px] font-mono text-zinc-400 leading-tight">Anonymize signatures when committing ledger block modifications.</p>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>
      </div>

      <div className="bg-white p-3 border border-zinc-300 space-y-1">
        <label className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-wider block">Inbound Access Filter Profile</label>
        <div className="pt-0.5">
          <Select defaultValue="friends">
            <SelectTrigger className="h-7 w-full rounded-none text-xs font-bold font-mono border border-zinc-400 bg-white px-2 shadow-none focus:ring-0 focus:border-zinc-900 flex justify-between items-center">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={1} className="rounded-none z-[300] border-zinc-400 bg-white shadow-none w-[var(--radix-select-trigger-width)]">
              <SelectItem value="all" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">ALLOW UNRESTRICTED PACKETS</SelectItem>
              <SelectItem value="friends" className="text-xs rounded-none focus:bg-zinc-900 focus:text-white font-mono cursor-pointer">RESTRICT TO RECOGNIZED TRUST NODES</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function CategoryNotifications() {
  return (
    <div className="space-y-4">
      <ModuleHeader title="NOTIF_DISPATCH_MATRIX" />

      {/* Expanded & Granular Notification Option Array */}
      <div className="border border-zinc-300 bg-white divide-y divide-zinc-200">
        
        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Shield size={14} className="text-zinc-900 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-black uppercase text-zinc-900 leading-none">Security Threshold Breach Alerts</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Immediate routing if credential variations or lock alterations are executed on unverified nodes.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Fingerprint size={14} className="text-zinc-900 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-black uppercase text-zinc-900 leading-none">Node Authentication Audits</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Receive telemetry records whenever a separate browser register initiates session handshakes.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <CloudLightning size={14} className="text-zinc-900 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-black uppercase text-zinc-900 leading-none">Instant Pipeline Failures</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Dispatch high-priority communication triggers if standard runtime build compilations collapse.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <RefreshCw size={14} className="text-zinc-400 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 leading-none">Automated Shadow Backups</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Ping upon successful execution of nightly configuration snapshot syncs to peripheral nodes.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Database size={14} className="text-zinc-900 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-black uppercase text-zinc-900 leading-none">Third-Party Data Handshakes</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Logs background profile requests initialized via active connected OAuth endpoints.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={true} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Lock size={14} className="text-zinc-400 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 leading-none">Ledger State Commit Verification</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Transmit structural cryptographic confirmations when workspace parameter variables alter.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Webhook size={14} className="text-zinc-400 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 leading-none">Webhook Core Subscriptions</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Transmit programmatic payload alerts directly down custom pipeline data endpoints.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>

        <div className="p-3 flex items-center justify-between gap-6 bg-white">
          <div className="flex items-start gap-2.5">
            <Activity size={14} className="text-zinc-400 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-mono font-bold uppercase text-zinc-500 leading-none">Telemetry Matrix Heartbeats</h4>
              <p className="text-[10px] font-mono text-zinc-400 leading-tight">Send low-priority weekly digest status summaries concerning system operational runtime metrics.</p>
            </div>
          </div>
          <CustomTerminalSwitch checked={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}