"use client";

import { OTPInput } from "@/components/otp-input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleOTPComplete = (otp: string) => {
    console.log("OTP entered:", otp);
    // Simulate authentication
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Aida</h1>
            <p className="text-muted-foreground">
              Intelligence in Motion. Now in Your Hands.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 flex flex-col items-center">
              <label className="text-sm font-medium">Enter OTP</label>
              <OTPInput length={4} onComplete={handleOTPComplete} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image Placeholder */}
      <div className="hidden lg:flex items-center justify-center bg-muted">
        <p className="text-2xl text-muted-foreground">Image Placeholder</p>
      </div>
    </div>
  );
}
