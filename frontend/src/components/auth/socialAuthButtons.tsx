// components/auth/SocialAuthButtons.tsx
import React from "react";
import SocialButton from "../ui/buttons/socialButton";

const SocialAuthButtons: React.FC = () => {
  const handleGoogleAuth = () => {
    console.log("Google authentication");
    // Implement Google auth logic
  };

  const handleFacebookAuth = () => {
    console.log("Facebook authentication");
    // Implement Facebook auth logic
  };

  return (
    <div className="space-y-3">
      <SocialButton
        provider="google"
        text="Continue with Google"
        onClick={handleGoogleAuth}
      />
      <SocialButton
        provider="facebook"
        text="Continue with Facebook"
        onClick={handleFacebookAuth}
      />
    </div>
  );
};

export default SocialAuthButtons;
