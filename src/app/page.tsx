import { Card } from "@/components/ui/card";
import LoginForm from "@/components/login-form";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      {/* 게임 스타일 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#7DD3FC]/30 rounded-full animate-float"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-[#FDE047]/40 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-secondary/50 rounded-full animate-bounce-gentle"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* 🌟 로고 섹션 */}
        <div className="text-center">
          <Logo />
        </div>

        {/* 🎯 타이틀 섹션 */}
        <div className="text-center space-y-4">
          <h1 className="text-game-title">감정 캐릭터 다이어리</h1>
          <p className="text-game-subtitle">
            귀여운 감정 친구들과 함께
            <br />
            <span className="text-primary font-bold">오늘의 마음</span>을
            기록해보세요
          </p>
        </div>

        {/* 🎮 로그인 카드 */}
        <Card className="card-game">
          <LoginForm />
        </Card>

        {/* 🌸 하단 메시지 */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="p-4 rounded-2xl bg-accent/30 border border-border">
            <p className="font-medium leading-relaxed">
              오늘도 당신의 소중한 감정을
              <br />
              캐릭터 친구들과 함께 기록해요
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
