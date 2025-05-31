"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { handleOAuthSignup, type AuthProvider } from "@/lib/auth";
import { Loader2, Heart, AlertCircle, Gift } from "lucide-react";

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
      {/* 🎯 헤더 섹션 */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-foreground animate-bounce" />
          <h2 className="text-xl font-bold text-foreground">
            회원가입하고 모험 시작
          </h2>
          <Heart className="w-5 h-5 text-foreground animate-bounce" />
        </div>
        <p className="text-sm text-muted-foreground">
          간편하게 가입하고 귀여운 감정 캐릭터들과 함께해요
        </p>
      </div>

      {/* 🚨 에러 메시지 */}
      {error && (
        <div className="p-4 text-sm text-destructive-foreground bg-red-50 border-2 border-red-200 rounded-2xl animate-wiggle">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* 🎮 소셜 회원가입 버튼들 */}
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full h-14 text-base bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialSignup("google")}
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
              <span className="font-bold ml-3">Google로 회원가입</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-base bg-[#03C75A] hover:bg-[#02b350] text-white border-[#03C75A] hover:border-[#02b350] transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialSignup("naver")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Image src="/naver-logo.svg" alt="Naver" width={24} height={24} />
              <span className="ml-3">네이버로 회원가입</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-base bg-[#FEE500] hover:bg-[#e6cf00] text-black border-[#FEE500] hover:border-[#e6cf00] transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          onClick={() => handleSocialSignup("kakao")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Image src="/kakao-logo.svg" alt="Kakao" width={24} height={24} />
              <span className="ml-3">카카오로 회원가입</span>
            </>
          )}
        </Button>
      </div>

      {/* 🌟 특별 혜택 안내 */}
      <div className="p-4 rounded-2xl bg-secondary/20 border-2 border-border">
        <div className="text-center space-y-2">
          <Gift className="w-6 h-6 text-foreground mx-auto animate-pulse" />
          <p className="text-sm font-semibold text-foreground">
            회원가입 특별 혜택
          </p>
          <p className="text-xs text-muted-foreground">
            감정 캐릭터 4마리와 함께 하는 특별한 여정이 시작돼요!
          </p>
        </div>
      </div>

      {/* 🌸 이용약관 */}
      <div className="text-center text-xs text-muted-foreground">
        <div className="p-3 rounded-xl bg-muted/50 border border-border">
          <p>
            회원가입 시{" "}
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
