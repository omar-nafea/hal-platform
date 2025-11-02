import React from "react";

export default function ProjectDetailsHeader() {
  return (
    <header className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#491C86] to-[#00B3A4] overflow-hidden">
      {/* Decorative overlay shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-[300px] h-[300px] bg-white/30 rounded-full blur-3xl absolute top-10 left-10"></div>
        <div className="w-[400px] h-[400px] bg-white/30 rounded-full blur-3xl absolute bottom-10 right-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-white font-extrabold text-4xl md:text-7xl drop-shadow-2xl">
          تفاصيل المشروع
        </h1>
        <p className="text-white/90 mt-4 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
          اكتشف تفاصيل مشروعنا الرائد وكيف نعيد تعريف مستقبل الأعمال الذكية.
        </p>
      </div>
    </header>
  );
}
