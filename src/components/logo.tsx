export default function Logo() {
  return (
    <div className="flex justify-center mb-8">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="drop-shadow-lg"
      >
        {/* 배경 원 */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="url(#gradient1)"
          className="animate-pulse"
        />

        {/* 하트 모양 */}
        <path
          d="M60 35 C50 25, 30 25, 30 45 C30 65, 60 85, 60 85 C60 85, 90 65, 90 45 C90 25, 70 25, 60 35 Z"
          fill="url(#gradient2)"
          className="animate-pulse"
        />

        {/* 작은 별들 */}
        <circle cx="40" cy="30" r="2" fill="#fbbf24" className="animate-ping" />
        <circle
          cx="80"
          cy="35"
          r="1.5"
          fill="#f59e0b"
          className="animate-ping delay-300"
        />
        <circle
          cx="35"
          cy="80"
          r="1.5"
          fill="#fbbf24"
          className="animate-ping delay-500"
        />
        <circle
          cx="85"
          cy="75"
          r="2"
          fill="#f59e0b"
          className="animate-ping delay-700"
        />

        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf2f8" />
            <stop offset="50%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#f3e8ff" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#be185d" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
