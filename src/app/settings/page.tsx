"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, User, Info } from "lucide-react";
import {
  useAuthStore,
  useThemeStore,
  THEMES,
  getRandomQuote,
} from "@/lib/store";
import NotificationSettings from "@/components/notification-settings";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { currentTheme, motivationalQuote, setTheme, setMotivationalQuote } =
    useThemeStore();

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleThemeChange = (themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
      setTheme(theme);
    }
  };

  const handleQuoteChange = () => {
    const newQuote = getRandomQuote();
    setMotivationalQuote(newQuote);
  };

  return (
    <main className="min-h-screen   p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="default"
              size="sm"
              onClick={handleBack}
              className="btn-game h-10 w-10 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <User className="w-6 h-6 text-foreground" />
                <h1 className="text-3xl font-bold text-foreground">설정</h1>
              </div>
              <p className="text-muted-foreground pl-9">
                앱 환경을 개인화하고 알림을 관리하세요
              </p>
            </div>
          </div>
        </div>

        {/* 설정 섹션들 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 프로필 설정 */}
          <Card className="p-6 card-3d">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">프로필</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  이름
                </label>
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-foreground">{user?.name || "사용자"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  이메일
                </label>
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  로그인 방식
                </label>
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-foreground capitalize">
                    {user?.provider || "Google"} 계정
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 알림 설정 */}
          <Card className="p-6 card-3d">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                알림 설정
              </h3>
            </div>

            <NotificationSettings />
          </Card>
        </div>

        {/* 앱 정보 */}
        <Card className="p-6 card-3d">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">앱 정보</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">
                v1.0.0
              </div>
              <div className="text-sm text-muted-foreground">버전</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">
                2025
              </div>
              <div className="text-sm text-muted-foreground">출시년도</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">🌱</div>
              <div className="text-sm text-muted-foreground">성장 중</div>
            </div>
          </div>
        </Card>

        {/* 감사 메시지 */}
        <Card className="p-8 hero-card-3d">
          <div className="text-center">
            <div className="text-4xl mb-4">🙏</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              감사합니다
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              감정 캐릭터 다이어리를 사용해주셔서 감사합니다.
              <br />
              당신의 감정 여행이 더욱 의미있기를 응원합니다.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
