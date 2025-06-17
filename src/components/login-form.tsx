"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { handleOAuthLogin, type AuthProvider } from "@/lib/auth";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleSocialLogin = async (formData: FormData) => {
    const provider = formData.get("provider") as AuthProvider;
    const url = await handleOAuthLogin(provider);

    if (typeof url === "string") {
      router.push(url);
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

      <form action={handleSocialLogin} className="space-y-4">
        <Button
          variant="default"
          className="w-full h-14 text-base bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 transition-all duration-300 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          type="submit"
          name="provider"
          value="google"
        >
          <Image src="/google-logo.svg" alt="Google" width={24} height={24} />
          <span className="font-bold ml-3">Google로 계속하기</span>
        </Button>
      </form>

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
