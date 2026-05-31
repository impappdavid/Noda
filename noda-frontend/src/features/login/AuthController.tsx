import { useState } from 'react';
import LoginPage from './components/Login';
import TwoFactorFormInline from './components/2FA';

type AuthStep = 'CREDENTIALS' | 'MFA_CHALLENGE';

const AuthController = () => {
    const [currentStep, setCurrentStep] = useState<AuthStep>('CREDENTIALS');
    const [savedCredentials, setSavedCredentials] = useState<any>(null);

    const handleInitialLogin = (authData: any) => {
        setSavedCredentials(authData);
        setCurrentStep('MFA_CHALLENGE');
    };

    const handleFinalVerification = (code: string) => {
        console.log("FINALIZING_UPLINK:", code);
    };

    return (
        // YOUR ORIGINAL PAGE WRAPPER
        <div className="min-h-screen bg-zinc-50 flex md:items-center justify-center p-2 md:p-4 font-sans selection:bg-zinc-300">
            <div className="w-full max-w-lg flex flex-col">
                
                {/* YOUR ORIGINAL HEADER BLOCK */}
                <div className="p-2 border border-zinc-300 bg-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <img src="/noda.png" alt="logo.png" className="w-5 h-5" />
                        <h1 className="text-sm font-mono font-black text-zinc-900 uppercase leading-none mt-0.5">
                            {currentStep === 'CREDENTIALS' ? "LogIn" : "2FA_Verify"}
                        </h1>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-blue-400" />
                        <div className="w-1.5 h-1.5 bg-blue-500" />
                        <div className={`w-1.5 h-1.5 bg-blue-600 ${currentStep === 'MFA_CHALLENGE' ? 'animate-pulse' : ''}`} />
                    </div>
                </div>

                {/* STEP SWITCHER SLOT */}
                {currentStep === 'CREDENTIALS' ? (
                    <LoginPage onLoginInitiated={handleInitialLogin} />
                ) : (
                    <TwoFactorFormInline 
                        credentials={savedCredentials} 
                        onVerify={handleFinalVerification}
                        onBackToLogin={() => setCurrentStep('CREDENTIALS')}
                    />
                )}

            </div>
        </div>
    );
};

export default AuthController;