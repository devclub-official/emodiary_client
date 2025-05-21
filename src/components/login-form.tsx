"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/public/google-logo.svg";
import naverLogo from "@/public/naver-logo.svg";
import kakaoLogo from "@/public/kakao-logo.svg";

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">
        SNS 계정으로 로그인
      </h2>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-white hover:bg-gray-50"
        onClick={() => console.log("Google login")}
      >
        <Image src={googleLogo} alt="Google" width={20} height={20} />
        <span>Google로 계속하기</span>
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-[#03C75A] hover:bg-[#02b350] text-white"
        onClick={() => console.log("Naver login")}
      >
        <Image src={naverLogo} alt="Naver" width={20} height={20} />
        <span>네이버로 계속하기</span>
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-[#FEE500] hover:bg-[#e6cf00] text-black"
        onClick={() => console.log("Kakao login")}
      >
        <Image src={kakaoLogo} alt="Kakao" width={20} height={20} />
        <span>카카오로 계속하기</span>
      </Button>
    </div>
  );
}
