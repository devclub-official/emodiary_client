"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { handleOAuthSignup, type AuthProvider } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import googleLogo from "@/public/google-logo.svg";
import naverLogo from "@/public/naver-logo.svg";
import kakaoLogo from "@/public/kakao-logo.svg";

export default function SignupForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSocialSignup = async (provider: AuthProvider) => {
    setError(null);

    const result = await handleOAuthSignup(provider);

    if (result.success && result.user) {
      login(result.user);
      // TODO: 회원가입 이력 저장 API 호출
      // await saveSignupHistory(result.user.id, result.user.provider);
      router.push("/dashboard");
      console.log("회원가입 성공:", result.user);
    } else {
      setError(result.error || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          SNS 계정으로 회원가입
        </h2>
        <p className="text-sm text-gray-600">
          간편하게 가입하고 감정 일기 여정을 시작하세요
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-3 h-12 bg-white hover:bg-gray-50 border-gray-200 transition-all duration-200 hover:shadow-md"
          onClick={() => handleSocialSignup("google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image src={googleLogo} alt="Google" width={20} height={20} />
          )}
          <span className="font-medium text-gray-700">Google로 회원가입</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-3 h-12 bg-[#03C75A] hover:bg-[#02b350] text-white border-[#03C75A] transition-all duration-200 hover:shadow-md"
          onClick={() => handleSocialSignup("naver")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image src={naverLogo} alt="Naver" width={20} height={20} />
          )}
          <span className="font-medium">네이버로 회원가입</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-3 h-12 bg-[#FEE500] hover:bg-[#e6cf00] text-black border-[#FEE500] transition-all duration-200 hover:shadow-md"
          onClick={() => handleSocialSignup("kakao")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Image src={kakaoLogo} alt="Kakao" width={20} height={20} />
          )}
          <span className="font-medium">카카오로 회원가입</span>
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>
          회원가입 시{" "}
          <span className="underline cursor-pointer hover:text-gray-700">
            서비스 이용약관
          </span>
          과{" "}
          <span className="underline cursor-pointer hover:text-gray-700">
            개인정보 처리방침
          </span>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
