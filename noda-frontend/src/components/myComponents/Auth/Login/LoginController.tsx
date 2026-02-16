import  { useState } from 'react';
import LoginPage from './Login'; // Your existing component
import TwoFactorDialog from './2FA';

const AuthController = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInitialLogin = (authData: any) => {
        console.log("LOGIN_SIGNAL_RECEIVED", authData);
        // This is the trigger
        setIsDialogOpen(true);
    };

    const handleFinalVerification = (code: string) => {
        console.log("FINALIZING_UPLINK:", code);
        setIsDialogOpen(false); // Close on success
    };

    return (
        <>
            <LoginPage onLoginInitiated={handleInitialLogin} />

            <TwoFactorDialog 
                isOpen={isDialogOpen} 
                onVerify={handleFinalVerification} 
            />
        </>
    );
};

export default AuthController