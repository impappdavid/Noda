import { useState } from 'react';
import LoginPage from './Login';
import TwoFactorFormInline from './2FA';

type AuthStep = 'CREDENTIALS' | 'MFA_CHALLENGE';

const AuthController = () => {
    const [currentStep, setCurrentStep] = useState<AuthStep>('CREDENTIALS');
    const [savedCredentials, setSavedCredentials] = useState<any>(null);

    const handleInitialLogin = (authData: any) => {
        console.log("CREDENTIALS_VALIDATED_PROCEEDING_TO_MFA", authData);
        setSavedCredentials(authData);
        setCurrentStep('MFA_CHALLENGE');
    };

    const handleFinalVerification = (code: string) => {
        console.log("FINALIZING_SECURE_WORKSPACE_UPLINK:", code);
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex md:items-center justify-center p-2 md:p-4 font-sans selection:bg-zinc-300">
            <div className="w-full max-w-lg flex flex-col bg-white">
                
                {/* GLOBAL UNIFIED COMPACT FEATURE HEADER */}
                <div className="p-2 border border-zinc-300 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <img src="/noda.png" alt="logo" className="w-4 h-4" />
                        <h1 className="text-sm font-mono font-black text-zinc-900 uppercase leading-none mt-0.5">
                            {currentStep === 'CREDENTIALS' ? "Auth // Signin" : "Auth // Secondary_Gate"}
                        </h1>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-blue-400" />
                        <div className="w-1.5 h-1.5 bg-blue-500" />
                        <div className={currentStep === 'MFA_CHALLENGE' ? "w-1.5 h-1.5 bg-blue-600 animate-pulse" : "w-1.5 h-1.5 bg-blue-600"} />
                    </div>
                </div>

                {/* INLINE MODULE ROUTING MATRIX */}
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