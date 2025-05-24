import Link from "next/link";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/login-form";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
      <Logo />

      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            마음의 날씨
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            당신의 감정을 기록하고
            <br />
            <span className="text-purple-600 font-medium">성장하는 여정</span>을
            시작하세요
          </p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-white/90 shadow-2xl rounded-2xl border-0 ring-1 ring-gray-200/50">
          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors duration-200"
              >
                회원가입
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p className="italic font-light leading-relaxed">
            "오늘 하루도 당신의 감정을
            <br />
            소중히 담아보세요 ✨"
          </p>
        </div>
      </div>
    </main>
  );
}
