import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, CircleAlert, CircleQuestionMark, Github, Chrome } from "lucide-react"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

function LoginForm() {

    const [email, setEmail] = useState("")
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
            navigate('/feed')
            // Clear form
            setEmail("");
            setPassword("");
        } catch (error: any) {
            setError(error.message || 'An error occurred during signup');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="bg-white w-full sm:w-96 p-3 py-3 mt-3 sm:mt-0 sm:border border-zinc-300 dark:border-zinc-800/70 flex flex-col gap-4 sm:items-center">
                    <div className="flex justify-between w-full items-center">

                        <div className="p-1 hover:bg-zinc-300/80 dark:hover:bg-zinc-800/60 transition-all duration-200">
                            <img src="/noda.png" alt="logo" className="w-6 h-6 rounded-sm" />
                        </div>

                        <div className="font-semibold ">
                            Sign In
                        </div>

                        <div className="p-1 hover:bg-zinc-300/80 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 transition-all duration-200">
                            <a href="../" className="">
                                <CircleQuestionMark className="w-5 h-5 " />
                            </a>
                        </div>

                    </div>
                    <div className="flex flex-col w-full gap-2">
                        {/* Social Login Section */}


                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="rounded-none border-zinc-800/20 hover:bg-zinc-100 transition-all duration-200 flex gap-2 h-10">
                                <Chrome className="h-4 w-4" />
                                Google
                            </Button>
                            <Button variant="outline" className="rounded-none border-zinc-800/20 hover:bg-zinc-100 transition-all duration-200 flex gap-2 h-10">
                                <Github className="h-4 w-4" />
                                GitHub
                            </Button>
                        </div>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-300 dark:border-zinc-800/70" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-zinc-500">Or continue with</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-4 w-4 text-zinc-500" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10 h-10 rounded-none border-zinc-800/20 hover:border-zinc-400 dark:hover:border-zinc-800  transition-all duration-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-500" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 h-10 rounded-none border-zinc-800/20 hover:border-zinc-400 dark:hover:border-zinc-800 transition-all duration-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="pr-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0.5 pr-2 right-0 flex items-center justify-center hover:bg-transparent dark:hover:bg-transparent cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4 " />}
                                    </Button>
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-400 p-2 h-8 text-xs border border-red-500/40 bg-red-500/20 rounded-lg transition-all duration-300 flex items-center gap-1">
                                    <CircleAlert className="w-4 h-4 text-red-400" />
                                    <div className="">
                                        {error}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between my-2 px-1">
                                <div className="flex items-center space-x-1 ">
                                    <Checkbox id="terms" className="border-orange-500" />
                                    <Label htmlFor="terms" className="text-xs text-zinc-500  cursor-pointer">Remember me</Label>
                                </div>
                                <a href="" className="text-zinc-400 text-xs text-zinc-500 dark:text-zinc-400 hover:underline">Forgot password?</a>
                            </div>
                            <Button
                                disabled={loading}
                                className="rounded-none h-10 bg-orange-500 hover:bg-orange-600 transition-all duration-200 cursor-pointer text-white">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>



                            <div className="flex justify-center w-full mt-2">
                                <div className="text-xs text-zinc-600 dark:text-zinc-400">Don't have an account? <a href="./signup" className="text-orange-600 dark:text-blue-400 hover:underline">Sign Up</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginForm