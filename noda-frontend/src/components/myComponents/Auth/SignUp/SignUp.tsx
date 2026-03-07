import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, CircleAlert, CircleQuestionMark, Github, Chrome, Terminal } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignupForm() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulate System Registration Handshake
            setTimeout(() => {
                navigate('/feed')
                setLoading(false);
            }, 1500);
        } catch (error: any) {
            setError(error.message || 'An error occurred during registration');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
                <div className="bg-white dark:bg-zinc-900 w-full sm:w-96 pb-1.5 mt-3 sm:mt-0 sm:border border-zinc-300 dark:border-zinc-800/70 flex flex-col gap-2 sm:items-center shadow-lg shadow-zinc-500/10">

                    {/* HEADER */}
                    <div className="flex justify-between w-full items-center bg-zinc-800 p-1.5">
                        <div className="p-1 hover:bg-zinc-700/80 dark:hover:bg-zinc-800/60 transition-all duration-200">
                            <img src="/noda.png" alt="logo" className="w-6 h-6" />
                        </div>
                        <div className="font-semibold uppercase text-xs tracking-widest text-white">
                            Sign Up
                        </div>
                        <div className="p-1 hover:bg-zinc-700/80 w-6 h-6 dark:hover:bg-zinc-800/60 text-zinc-400 dark:text-zinc-400 transition-all duration-200 cursor-pointer">
                            <CircleQuestionMark className="w-4 h-4 " />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2 p-1.5">
                        {/* SOCIAL AUTH SECTION */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="rounded-none border-zinc-800/20 hover:bg-zinc-100 transition-all duration-200 flex gap-2 h-10 text-[10px] font-bold uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" className="w-4 h-4">
                                    <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                                    <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                                    <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                                    <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="rounded-none border-zinc-800/20 hover:bg-zinc-100 transition-all duration-200 flex gap-2 h-10 text-[10px] font-bold uppercase">
                                <Github className="h-4 w-4" />
                                GitHub
                            </Button>
                        </div>

                        {/* SEPARATOR */}
                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-300 dark:border-zinc-800/70" />
                            </div>
                            <div className="relative flex justify-center text-[8px] font-mono font-black uppercase tracking-widest">
                                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">Initialize_Direct</span>
                            </div>
                        </div>

                        {/* SIGNUP FORM */}
                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">

                            {/* USERNAME / NODE_ID */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Terminal className="h-4 w-4 text-zinc-500" />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    className="pl-10 h-10 rounded-none border-zinc-800/20 hover:border-zinc-400 dark:hover:border-zinc-800 transition-all duration-300 uppercase text-[11px]"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-4 w-4 text-zinc-500" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10 h-10 rounded-none border-zinc-800/20 hover:border-zinc-400 dark:hover:border-zinc-800 transition-all duration-300 text-[11px]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-500" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create password"
                                    className="pl-10 pr-10 h-10 rounded-none border-zinc-800/20 hover:border-zinc-400 dark:hover:border-zinc-800 transition-all duration-300 text-[11px]"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="pr-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0.5 pr-2 right-0 flex items-center justify-center hover:bg-transparent cursor-pointer text-zinc-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4 " />}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-400 p-2 h-8 text-xs border border-red-500/40 bg-red-500/20 rounded-lg flex items-center gap-1">
                                    <CircleAlert className="w-4 h-4 text-red-400" />
                                    <div>{error}</div>
                                </div>
                            )}

                            {/* TERMS */}
                            <div className="flex items-center space-x-1 my-2 px-1">
                                <Checkbox id="terms" className="border-orange-500" required />
                                <Label htmlFor="terms" className="text-[10px] text-zinc-500 cursor-pointer uppercase font-mono tracking-tighter">
                                    Accept System Protocols
                                </Label>
                            </div>

                            <Button
                                disabled={loading}
                                className="rounded-none h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 transition-all duration-200 cursor-pointer text-white font-bold uppercase tracking-[0.2em] text-[11px]"
                            >
                                {loading ? 'Initializing...' : 'Create Account'}
                            </Button>

                            {/* FOOTER LINK */}
                            <div className="flex justify-center w-full mt-2">
                                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                                    Already have an account? <a href="/login" className="text-orange-600 font-bold hover:underline">LogIn</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm;