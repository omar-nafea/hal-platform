import { Card } from "flowbite-react";
import React, { useState } from "react";
import imgSlider from "../../../assets/images/img-slider.png";
import draw from "../../../assets/images/draw.png";
import { Link } from "react-router-dom";

export default function ExploreOurWorks() {
  const [activeTab, setActiveTab] = useState("الكل");
  const cardData = [
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اكتشف المزيد",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اكتشف المزيد",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: "اكتشف المزيد  ",
    },
  ];

  const tabs = [
    "التعليم",
    "الخدمات اللوجيستية",
    "السياحة والضيافة",
    "الرعااكتشف المزيد لعقارات",
    "الكل",
  ];

  const content = {
    التعليم: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
    "الخدمات اللوجيستية": (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
    "السياحة والضيافة": (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
    "الرعاية الصحية": (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
    العقارات: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
    الكل: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
        {cardData.map((item, index) => (
          <Card key={index} imgAlt="img" imgSrc={item.img}>
            <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
              {item.subTitle}
            </span>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.p}
            </p>
            <Link
              to="/projectDetails"
              className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text">{item.btn}</span>
            </Link>
          </Card>
        ))}
      </div>
    ),
  };

  return (
    <section className="bg-[#F6FBFD] py-6  relative  ">
      <div className="absolute -top-50 left-20 mt-8">
        <img src={draw} alt="draw" />
      </div>
      <div className="absolute -top-20 left-30 mt-8">
        <h5 className="ml-16 text-[#013366]">استكشف اعمالنا</h5>
      </div>
      <ul className="flex flex-wrap flex-col-reverse md:flex-row items-center justify-center text-center mb-4">
        {tabs.map((tab) => (
          <li key={tab} className="mb-2 md:mr-3">
            <button
              onClick={() => setActiveTab(tab)}
              className={`inline-block w-full md:w-auto px-6 py-2 rounded-full font-bold border-2 ${
                activeTab === tab
                  ? "bg-[#013366] text-white border-[#013366]"
                  : "text-[#013366] border-[#013366] hover:bg-[#013366] hover:text-white"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
        {content[activeTab]}
      </div>
    </section>
  );
}
