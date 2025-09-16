import React from "react";
import project from "../../../../assets/images/projectDetails.png";
export default function RESmart() {
  return (
    <section>
      <div className="container mx-auto bg-[#F6FBFD]">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="title">
            <h2 className="text-3xl font-bold">منصة إدارة العقارات الذكية</h2>
          </div>

          {/* الصورة */}
          <div className="w-[75%]">
            <img src={project} alt="projectDetails" className="w-full" />
          </div>

          {/* البرجراف */}
          <div className="w-[75%]">
            <p className="text-right leading-relaxed tracking-wide ">
              منصتنا العقارية الذكية صُممت لتكون أداة متكاملة تدعم كل من
              المستثمرين، شركات التطوير العقاري، والعملاء الأفراد. نقوم برقمنة
              عمليات إدارة العقارات من تسجيل العقارات وتتبع بياناتها، وحتى
              متابعة عمليات البيع والشراء والتأجير. كما نعتمد على تقنيات الذكاء
              الاصطناعي في تحليل بيانات السوق بشكل لحظي، واستخراج مؤشرات دقيقة
              حول الأسعار، الطلب، والمناطق الأكثر رواجًا.
              <br />
              المنصة توفر لوحات تحكم تفاعلية سهلة الاستخدام تعرض تقارير تحليلية
              ورسوم بيانية تساعد على الفهم السريع للمعلومات. إلى جانب ذلك، نقدم
              ميزة التنبؤ بالأسعار والاتجاهات المستقبلية، مما يساعد المستخدمين
              على اتخاذ قرارات استثمارية أكثر ثقة وفعالية، ويمنحهم ميزة تنافسية
              في سوق العقارات المتغير.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
