import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, CircleAlert} from "lucide-react"
import { cn } from "@/lib/utils"

// --- TYPES ---
interface LoginPageProps {
    onLoginInitiated?: (data: any) => void;
}

const LoginPage = ({ onLoginInitiated }: LoginPageProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

         if (password.length < 6) {
            setError("Too short password.");
            setLoading(false); // Added to stop loading state on error
            return; 
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            if (onLoginInitiated) {
                onLoginInitiated({ email, password });
            } else {
                navigate('/app');
            }
        } catch (err: any) {
            setError(err.message || 'AUTH_FAILURE: Protocol violation.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex md:items-center justify-center p-2 md:p-4 font-sans selection:bg-zinc-300">
            <div className="w-full max-w-lg flex flex-col ">
                {/* Header */}
                <div className="p-2 border border-zinc-300 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <img src="/noda.png" alt="logo.png" className="w-5 h-5" />
                        <h1 className="text-sm font-mono font-black text-zinc-900 uppercase leading-none mt-0.5">
                            LogIn
                        </h1>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-blue-400" />
                        <div className="w-1.5 h-1.5 bg-blue-500" />
                        <div className="w-1.5 h-1.5 bg-blue-600" />
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border-x border-b border-zinc-300"
                >
                    {error && (
                        <div className="md:col-span-2 bg-red-500/20 border-b border-zinc-300 p-2 flex items-center gap-2">
                            <CircleAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            <span className="text-[10px] font-mono font-semibold text-red-600 uppercase tracking-wider leading-none">
                                {error}
                            </span>
                        </div>
                    )}

                    {/* Google SSO */}
                    <button type="button" className="bg-white p-2 space-y-1 border-r border-zinc-300 hover:bg-zinc-200/80 transition-colors outline-none text-left group cursor-pointer">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none transition-colors cursor-pointer">
                            Provider 01
                        </label>
                        <div className="relative flex items-center gap-1.5 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
                                <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                                <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                                <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                            </svg>
                            <span className="w-full text-[11px] font-medium text-zinc-900">Continue with Google</span>
                        </div>
                    </button>

                    {/* GitHub SSO */}
                    <button type="button" className="bg-white p-2 space-y-1 hover:bg-zinc-200/80 transition-colors outline-none text-left group cursor-pointer">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none group-hover:text-zinc-900 transition-colors">
                            Provider 02
                        </label>
                        <div className="relative flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#27272a" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span className="w-full text-[11px] font-medium text-zinc-900">Continue with Github</span>
                        </div>
                    </button>

                    <div className="p-2 text-[10px] border-y border-zinc-300 text-zinc-500 flex items-center justify-center w-full col-span-2">OR</div>

                    {/* Email Input */}
                    <div className="bg-white p-2 space-y-1 border-r border-b border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                            Email
                        </label>
                        <div className="relative flex items-center h-6">
                            <Mail className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test01@gmail.com"
                                required
                                className="w-full text-[11px] outline-none bg-transparent placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="bg-white p-2 space-y-1 border-b border-zinc-300 focus-within:bg-zinc-50 transition-colors">
                        <div className="flex justify-between items-center">
                            <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                                Passkey
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
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>

                    {/* Session Config */}
                    <div className="bg-white p-2 col-span-2 flex items-center ">
                        <div className="flex items-center gap-2 w-full h-full">
                            <Checkbox id="terms" className="rounded-none border-zinc-400 w-3.5 h-3.5 shadow-none data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900" />
                            <label htmlFor="terms" className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest cursor-pointer select-none hover:text-zinc-900 transition-colors mt-0.5">
                                Remember Me
                            </label>
                        </div>
                    </div>

                    {/* Execution Button */}
                    <div className="bg-white col-span-2">
                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className={cn(
                                "w-full h-full p-3 text-white transition-colors font-mono text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer",
                                loading ? "bg-zinc-400 text-zinc-500" : "bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed"
                            )}
                        >
                            {loading ? "Connecting..." : "Login"}
                        </button>
                    </div>

                    {/* Navigation Footer */}
                    <div className="col-span-2 flex items-center justify-between">
                        <div className="flex ">
                            <Link to={`/privacyPolicy`} className="text-[8px] p-2 border-r hover:text-blue-600 hover:underline cursor-pointer border-zinc-300 font-mono font-black text-zinc-500 uppercase">
                                Privacy Policy
                            </Link>
                            <Link to={`/termsOfService`} className="text-[8px] p-2 border-r hover:text-blue-600 hover:underline cursor-pointer border-zinc-300 font-mono font-black text-zinc-500 uppercase">
                                Terms of Service
                            </Link>
                        </div>
                        <Link to={`/signup`} className="text-[8px] p-2 border-l hover:text-blue-600 hover:underline cursor-pointer border-zinc-300 font-mono font-black text-zinc-500 uppercase">
                            Create New Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;