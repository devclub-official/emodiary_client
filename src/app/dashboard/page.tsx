import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            마음의 날씨
          </h1>
          <p className="text-gray-600">오늘의 감정을 기록해보세요</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              오늘의 일기
            </h2>
            <p className="text-gray-600 mb-6">
              AI와 함께 오늘 하루의 감정을 기록해보세요.
            </p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              일기 작성하기
            </Button>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              감정 캘린더
            </h2>
            <p className="text-gray-600 mb-6">
              지금까지 기록한 감정들을 한눈에 확인하세요.
            </p>
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              캘린더 보기
            </Button>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              감정 분석
            </h2>
            <p className="text-gray-600 mb-6">
              최근 감정 패턴을 분석하고 인사이트를 확인하세요.
            </p>
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              분석 보기
            </Button>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">설정</h2>
            <p className="text-gray-600 mb-6">
              알림 설정 및 개인 정보를 관리하세요.
            </p>
            <Button
              variant="outline"
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              설정하기
            </Button>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p className="italic font-light">
            "매일 조금씩, 당신의 마음을 돌보세요 💝"
          </p>
        </div>
      </div>
    </main>
  );
}
