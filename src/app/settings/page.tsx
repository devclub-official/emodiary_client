"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, User, Palette, Info, Shuffle } from "lucide-react";
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
    <main className={`min-h-screen ${currentTheme.background} p-4`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                설정
              </h1>
              <p className="text-gray-600">
                앱 환경을 개인화하고 알림을 관리하세요
              </p>
            </div>
          </div>
        </div>

        {/* 설정 섹션들 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 프로필 설정 */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-purple-500" />
              <h3 className="text-xl font-semibold text-gray-800">프로필</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  이름
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{user?.name || "사용자"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  이메일
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  로그인 방식
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-800 capitalize">
                    {user?.provider || "Google"} 계정
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 알림 설정 */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-pink-500" />
              <h3 className="text-xl font-semibold text-gray-800">알림 설정</h3>
            </div>

            <NotificationSettings />
          </Card>
        </div>

        {/* 테마 설정 */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-800">개인화</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                배경 테마
              </label>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`h-16 p-2 rounded-lg ${
                      theme.preview
                    } border-2 transition-all hover:scale-105 ${
                      currentTheme.id === theme.id
                        ? "border-purple-400 ring-2 ring-purple-200"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    title={theme.description}
                  >
                    <div className="h-full w-full rounded-md flex flex-col justify-center items-center text-xs font-medium text-gray-700">
                      <span>{theme.name}</span>
                      {currentTheme.id === theme.id && (
                        <span className="text-purple-600 text-xs">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                현재 테마: {currentTheme.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                감성 문구
              </label>
              <div className="p-3 bg-gray-50 rounded-lg text-center mb-3">
                <p className="text-sm text-gray-600 italic">
                  "{motivationalQuote}"
                </p>
              </div>
              <Button
                onClick={handleQuoteChange}
                variant="outline"
                size="sm"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                새로운 문구
              </Button>
            </div>
          </div>
        </Card>

        {/* 앱 정보 */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">앱 정보</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                v1.0.0
              </div>
              <div className="text-sm text-gray-600">버전</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600 mb-1">2025</div>
              <div className="text-sm text-gray-600">출시년도</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">🌱</div>
              <div className="text-sm text-gray-600">성장 중</div>
            </div>
          </div>
        </Card>

        {/* 감사 메시지 */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-purple-200/50">
          <div className="text-center">
            <div className="text-4xl mb-4">🙏</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              감사합니다
            </h3>
            <p className="text-gray-600 leading-relaxed">
              마음의 날씨를 사용해주셔서 감사합니다.
              <br />
              당신의 감정 여행이 더욱 의미있기를 응원합니다.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
