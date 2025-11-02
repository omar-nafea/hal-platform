import { Card } from "flowbite-react";
import React, { useState } from "react";
import imgSlider from "../../../assets/images/img-slider.png";
import draw from "../../../assets/images/draw.png";
import { Link } from "react-router-dom";

export default function ExploreOurWorks() {
  const [activeTab, setActiveTab] = useState("الكل");

  const tabs = [
    "التعليم",
    "الخدمات اللوجيستية",
    "السياحة والضيافة",
    "الرعاية الصحية",
    "العقارات",
    "الكل",
  ];

  const cardData = [
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى",
      title: "مشاريعنا العقارية الذكية",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة.",
      btn: "اكتشف المزيد",
    },
    {
      img: imgSlider,
      subTitle: "التعليم الذكي",
      title: "نظام تعليمي تفاعلي",
      p: "نطور منصات تعليمية تعتمد على الذكاء الاصطناعي لتخصيص المحتوى وتحسين تجربة التعلم.",
      btn: "اكتشف المزيد",
    },
    {
      img: imgSlider,
      subTitle: "الرعاية الصحية",
      title: "حلول طبية رقمية",
      p: "نعمل على تطوير أنظمة طبية ذكية لتحليل البيانات وتحسين الخدمات الصحية بدقة عالية.",
      btn: "اكتشف المزيد",
    },
  ];

  return (
    <section className="bg-[var(--background-color)] py-16 relative overflow-hidden font-[Cairo]">
      {/* Decorative Draw */}
      <div className="absolute top-10 left-10 opacity-20">
        <img src={draw} alt="draw" className="w-[120px]" />
      </div>

      {/* Section Title */}
      <div className="text-center mb-12">
        <h5 className="text-[var(--primary-color)] text-3xl font-bold mb-2">
          استكشف أعمالنا
        </h5>
        <p className="text-[var(--text-color)] text-base">
          تعرف على أبرز مشاريعنا في مختلف المجالات
        </p>
      </div>

      {/* Tabs */}
      <ul className="flex flex-wrap justify-center gap-3 mb-10">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold border-2 transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[var(--primary-color)] text-[var(--background-color)] border-[var(--primary-color)]"
                  : "text-[var(--primary-color)] border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--background-color)]"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
{/* Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
  {cardData.map((item, index) => (
    <Card
      key={index}
      imgAlt={item.title}
      imgSrc={item.img}
      className="rounded-2xl border-[2px] p-[2px] shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.03] border-gradient-to-br from-[var(--accent-color)] to-[var(--primary-color)]"
    >
      <div className="bg-[var(--background-color)] rounded-2xl overflow-hidden p-5 text-right">
        <span className="bg-[var(--accent-color)] text-[var(--background-color)] font-semibold rounded-full px-4 py-1 text-sm inline-block mb-2">
          {item.subTitle}
        </span>
        <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{item.title}</h3>
        <p className="text-[var(--text-color)] leading-relaxed mb-4">{item.p}</p>
        <Link
          to="/projectDetails"
          className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-[var(--background-color)] rounded-3xl px-5 py-2 font-medium transition-colors duration-200 inline-flex items-center justify-between w-full"
        >
          <span>{item.btn}</span>
          <span className="w-8 h-8 flex items-center justify-center bg-[var(--accent-color)] rounded-full">
            <i className="fa-solid fa-arrow-left text-[var(--background-color)]"></i>
          </span>
        </Link>
      </div>
    </Card>
  ))}
</div>
      
      
    </section>
  );
}
