"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import googleLogo from "@/public/google-logo.svg";
import naverLogo from "@/public/naver-logo.svg";
import kakaoLogo from "@/public/kakao-logo.svg";

export default function SignupForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">
        SNS 계정으로 회원가입
      </h2>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-white hover:bg-gray-50"
        onClick={() => console.log("Google signup")}
      >
        <Image src={googleLogo} alt="Google" width={20} height={20} />
        <span>Google로 회원가입</span>
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-[#03C75A] hover:bg-[#02b350] text-white"
        onClick={() => console.log("Naver signup")}
      >
        <Image src={naverLogo} alt="Naver" width={20} height={20} />
        <span>네이버로 회원가입</span>
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-[#FEE500] hover:bg-[#e6cf00] text-black"
        onClick={() => console.log("Kakao signup")}
      >
        <Image src={kakaoLogo} alt="Kakao" width={20} height={20} />
        <span>카카오로 회원가입</span>
      </Button>
    </div>
  );
}
