import React from "react";
import project from "../../../../assets/images/projectDetails.png";
import topDots from "../../../../assets/images/details-top.png";

export default function RESmart() {
  return (
    <section className="relative bg-[var(--primary-color)] text-[var(--background-color)] py-20 overflow-hidden font-[Cairo] animate-fadeIn">
      {/* Decorative Dots */}
      <div className="absolute top-0 right-0 w-[450px] opacity-40 pointer-events-none">
        <img src={topDots} alt="project details dots" className="w-full" />
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center gap-12 px-6 text-right">
        {/* Title */}
        <div className="title text-center md:text-right">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--background-color)] drop-shadow-[0_0_10px_var(--accent-color)]">
            منصة إدارة العقارات الذكية
          </h2>
        </div>

        {/* Project Image */}
        <div className="w-full md:w-[75%] rounded-3xl overflow-hidden border-2 border-[var(--accent-color)]/40 shadow-[0_0_20px_rgba(0,179,164,0.3)] hover:border-[var(--accent-color)] hover:shadow-[0_0_30px_rgba(0,179,164,0.5)] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
          <img
            src={project}
            alt="تفاصيل المشروع"
            className="w-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="w-full md:w-[75%] bg-[var(--accent-color)]/10 shadow-[0_0_25px_rgba(0,179,164,0.3)] rounded-3xl p-10 border border-[var(--accent-color)]/30 text-[white] leading-relaxed backdrop-blur-sm">
          <p className="text-lg mb-4">
            منصتنا العقارية الذكية صُممت لتكون أداة متكاملة تدعم كل من
            المستثمرين، شركات التطوير العقاري، والعملاء الأفراد. نقوم برقمنة
            عمليات إدارة العقارات من تسجيل العقارات وتتبع بياناتها، وحتى متابعة
            عمليات البيع والشراء والتأجير.
          </p>
          <p className="text-lg mb-4">
            كما نعتمد على تقنيات الذكاء الاصطناعي في تحليل بيانات السوق بشكل
            لحظي، واستخراج مؤشرات دقيقة حول الأسعار، الطلب، والمناطق الأكثر
            رواجًا. المنصة توفر لوحات تحكم تفاعلية سهلة الاستخدام تعرض تقارير
            تحليلية ورسوم بيانية تساعد على الفهم السريع للمعلومات.
          </p>
          <p className="text-lg">
            إلى جانب ذلك، نقدم ميزة التنبؤ بالأسعار والاتجاهات المستقبلية، مما
            يساعد المستخدمين على اتخاذ قرارات استثمارية أكثر ثقة وفعالية،
            ويمنحهم ميزة تنافسية في سوق العقارات المتغير.
          </p>
        </div>
      </div>
    </section>
  );
}
