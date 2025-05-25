"use client";

import { useState, useEffect, useRef } from "react";

export default function Logo() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      // 마우스와 로고 중심점 사이의 거리 계산
      const deltaX = e.clientX - logoCenterX;
      const deltaY = e.clientY - logoCenterY;

      // 눈동자가 움직일 수 있는 최대 거리 제한
      const maxDistance = 2.5;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 0) {
        const normalizedX =
          (deltaX / distance) * Math.min(distance / 100, maxDistance);
        const normalizedY =
          (deltaY / distance) * Math.min(distance / 100, maxDistance);

        setEyePosition({ x: normalizedX, y: normalizedY });
      }
    };

    // 마우스가 로고 영역을 벗어나면 눈동자를 중앙으로 복귀
    const handleMouseLeave = () => {
      setEyePosition({ x: 0, y: 0 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    if (logoRef.current) {
      logoRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (logoRef.current) {
        logoRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="flex justify-center mb-8">
      <div ref={logoRef} className="relative group cursor-pointer">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
        >
          🌸 배경 원 - 파스텔 그라데이션
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="url(#backgroundGradient)"
            className="animate-pulse"
          />
          {/* 😊 감정 캐릭터 얼굴 */}
          {/* 눈 배경 (흰색) */}
          <circle
            cx="60"
            cy="60"
            r="10"
            fill="#FFFFFF"
            stroke="#E9D5FF"
            strokeWidth="1"
          />
          <circle
            cx="80"
            cy="60"
            r="10"
            fill="#FFFFFF"
            stroke="#E9D5FF"
            strokeWidth="1"
          />
          {/* 움직이는 눈동자 */}
          <circle
            cx={60 + eyePosition.x}
            cy={60 + eyePosition.y}
            r="5"
            fill="#4A3B5C"
            className="transition-all duration-150 ease-out"
          />
          <circle
            cx={80 + eyePosition.x}
            cy={60 + eyePosition.y}
            r="5"
            fill="#4A3B5C"
            className="transition-all duration-150 ease-out"
          />
          {/* 눈 하이라이트 */}
          <circle
            cx={61 + eyePosition.x}
            cy={58 + eyePosition.y}
            r="2"
            fill="#FFFFFF"
            className="transition-all duration-150 ease-out"
          />
          <circle
            cx={81 + eyePosition.x}
            cy={58 + eyePosition.y}
            r="2"
            fill="#FFFFFF"
            className="transition-all duration-150 ease-out"
          />
          {/* 입 */}
          <path
            d="M 60 80 Q 70 88 80 80"
            stroke="#4A3B5C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* 뺨 하이라이트 */}
          <circle
            cx="50"
            cy="75"
            r="6"
            fill="#FDA4AF"
            opacity="0.6"
            className="animate-bounce-gentle"
          />
          <circle
            cx="90"
            cy="75"
            r="6"
            fill="#FDA4AF"
            opacity="0.6"
            className="animate-bounce-gentle"
          />
          {/* ✨ 반짝이는 별들 */}
          <g className="animate-pulse">
            <polygon
              points="30,60 32,64 36,64 33,67 34,71 30,69 26,71 27,67 24,64 28,64"
              fill="#A855F7"
              opacity="0.8"
            />
            <polygon
              points="110,50 112,54 116,54 113,57 114,61 110,59 106,61 107,57 104,54 108,54"
              fill="#EC4899"
              opacity="0.8"
            />
            <polygon
              points="40,100 42,104 46,104 43,107 44,111 40,109 36,111 37,107 34,104 38,104"
              fill="#FDE047"
              opacity="0.8"
            />
          </g>
          {/* 🎨 그라데이션 정의 */}
          <defs>
            {/* 배경 그라데이션 */}
            <radialGradient id="backgroundGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8BBD9" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
            </radialGradient>

            {/* 캐릭터 그라데이션 */}
            <radialGradient id="characterGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8BBD9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.5" />
            </radialGradient>
          </defs>
        </svg>

        {/* 🌈 호버 효과 */}
        <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
