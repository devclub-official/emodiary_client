import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-purple-100 p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/images/cloud-character.png"
              alt="구름 캐릭터"
              width={150}
              height={150}
              className="animate-bounce-slow"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">마음의 날씨</h1>
          <p className="text-gray-600">회원가입하고 감정 일기를 시작하세요</p>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl rounded-xl">
          <SignupForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/"
                className="text-blue-600 hover:underline font-medium"
              >
                로그인
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p className="italic">
            "당신의 감정을 기록하고 성장하는 여정을 시작하세요"
          </p>
        </div>
      </div>
    </main>
  );
}
