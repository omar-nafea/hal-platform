import React from "react";
import heart from "../../../../assets/images/Vector.png";
import dots from "../../../../assets/images/details-dots.png";

export default function ProjectGoal() {
  const goals = [
    "تسهيل قرارات البيع والشراء عبر تقارير ذكية ومتكاملة",
    "تقديم تنبؤات دقيقة لأسعار العقارات اعتمادًا على الذكاء الاصطناعي",
    "تحسين تجربة المستخدم في البحث وإدارة العقارات",
  ];

  const results = [
    "رفع كفاءة قرارات المستثمرين والشركات العقارية مما ساعد في زيادة العائدات",
    "زيادة دقة التنبؤ بالأسعار إلى أكثر من 90%",
    "تقليل وقت البحث عن العقار المناسب بنسبة تصل إلى 40%",
  ];

  const Card = ({ text }) => (
    <div className="bg-[var(--light-bg)] hover:bg-[var(--accent-color)] transition-all duration-300 shadow-md hover:shadow-xl border border-[var(--accent-color)] rounded-3xl p-6 max-w-sm text-[var(--text-color)] text-center">
      <p>{text}</p>
    </div>
  );

  return (
    <>
      {/* Project Goals */}
      <section className="bg-[var(--light-bg)] relative overflow-hidden">
        <div className="text-end py-16 px-6">
          <div className="title mb-12 text-center md:text-right md:mr-24">
            <h2 className="text-4xl font-bold text-[var(--primary-color)]">أهداف المشروع</h2>
          </div>

          <div className="container mx-auto flex flex-wrap justify-center md:justify-evenly gap-8">
            {goals.map((goal, i) => (
              <Card key={i} text={goal} />
            ))}
          </div>
        </div>

        {/* Heart Decorations */}
        <img
          src={heart}
          alt="heart vector"
          className="absolute top-16 left-[40%] w-[90px] opacity-70 animate-pulse"
        />
        <img
          src={heart}
          alt="heart vector"
          className="absolute top-20 right-[15%] w-[90px] opacity-70 animate-pulse"
        />
      </section>

      {/* Project Results */}
      <section className="bg-[var(--light-bg)] relative pb-20 overflow-hidden">
        <div className="text-end py-16 px-6">
          <div className="title mb-12 text-center md:text-right md:mr-24">
            <h2 className="text-4xl font-bold text-[var(--primary-color)]">نتائج المشروع</h2>
          </div>

          <div className="container mx-auto flex flex-wrap justify-center md:justify-evenly gap-8">
            {results.map((result, i) => (
              <Card key={i} text={result} />
            ))}
          </div>
        </div>

        {/* Heart Decorations */}
        <img
          src={heart}
          alt="heart vector"
          className="absolute top-16 left-[35%] w-[90px] opacity-70 animate-pulse"
        />
        <img
          src={heart}
          alt="heart vector"
          className="absolute top-20 right-[18%] w-[90px] opacity-70 animate-pulse"
        />

        {/* Dots Background */}
        <div className="absolute bottom-0 left-0 w-full">
          <img src={dots} alt="project details dots" className="w-full" />
        </div>
      </section>
    </>
  );
}
