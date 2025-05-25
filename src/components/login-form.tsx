"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { handleOAuthLogin, type AuthProvider } from "@/lib/auth";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (provider: AuthProvider) => {
    setError(null);

    const result = await handleOAuthLogin(provider);

    if (result.success && result.user) {
      login(result.user);
      // TODO: 로그인 이력 저장 API 호출
      // await saveLoginHistory(result.user.id, result.user.provider);
      router.push("/dashboard");
      console.log("로그인 성공:", result.user);
    } else {
      setError(result.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-foreground animate-pulse" />
          <h2 className="text-xl font-bold text-foreground">
            로그인하고 시작하기
          </h2>
          <Sparkles className="w-5 h-5 text-foreground animate-pulse" />
        </div>
        <p className="text-sm text-muted-foreground">
          간편하게 로그인하고 감정 캐릭터들과 만나보세요
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-destructive-foreground bg-red-50 border-2 border-red-200 rounded-2xl animate-wiggle">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full h-14 text-base bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Image
                src="/google-logo.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="font-bold ml-3">Google로 계속하기</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-base bg-[#03C75A] hover:bg-[#02b350] text-white border-[#03C75A] hover:border-[#02b350] transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialLogin("naver")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Image src="/naver-logo.svg" alt="Naver" width={24} height={24} />
              <span className="ml-3">네이버로 계속하기</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-base bg-[#FEE500] hover:bg-[#e6cf00] text-black border-[#FEE500] hover:border-[#e6cf00] transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialLogin("kakao")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Image src="/kakao-logo.svg" alt="Kakao" width={24} height={24} />
              <span className="ml-3">카카오로 계속하기</span>
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <p>
            로그인 시{" "}
            <span className="underline cursor-pointer hover:text-foreground transition-colors">
              서비스 이용약관
            </span>
            과{" "}
            <span className="underline cursor-pointer hover:text-foreground transition-colors">
              개인정보 처리방침
            </span>
            에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
