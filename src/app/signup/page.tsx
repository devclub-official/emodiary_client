import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignupForm from "@/components/signup-form";
import Logo from "@/components/logo";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      {/* 게임 스타일 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#FDE047]/30 rounded-full animate-float"></div>
        <div className="absolute top-32 left-16 w-16 h-16 bg-[#7DD3FC]/40 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-10 w-12 h-12 bg-primary/50 rounded-full animate-bounce-gentle"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* 로고 섹션 */}
        <div className="text-center">
          <Logo />
        </div>

        {/* 타이틀 섹션 */}
        <div className="text-center space-y-4">
          <h1 className="text-game-title">감정 캐릭터와 만나요</h1>
          <p className="text-game-subtitle">
            회원가입하고
            <br />
            <span className="text-primary font-bold">감정 친구들</span>과 함께
            시작해요
          </p>
        </div>

        {/* 회원가입 카드 */}
        <Card className="card-game">
          <SignupForm />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              이미 계정이 있나요?{" "}
              <Link
                href="/"
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-all duration-200"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </Card>

        {/* 하단 메시지 */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="p-4 rounded-2xl bg-accent/30 border border-border">
            <p className="font-medium leading-relaxed">
              새로운 감정 여행을 시작하고
              <br />
              캐릭터 친구들과 성장해요
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
