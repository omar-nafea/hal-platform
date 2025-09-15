import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "flowbite-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import imgSlider from "../../assets/images/img-slider.png";

export default function HomeSlider() {
  const cardData = [
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى ",
      title: "مشاريعنا العقارية الذكية ",
      p: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي، مع أدوات للتنبؤ بالأسعار واتخاذ قرارات دقيقة ",
      btn: " اعرف المزيد عنا ",
    },
  ];

  return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        
          {cardData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="py-4 text-right px-3">
              <Card
                className="max-w-96 p-2"
                imgAlt="Meaningful alt text"
                imgSrc={item.img}
              >
                <span className="bg-[#E2F2F7] rounded-full ml-auto p-1 w-[130px] text-center">
                  {item.subTitle}
                </span>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.p}
                </p>
                <div className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between w-full ml-auto">
                  <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                    <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                  </span>
                  <span className="main-text"> {item.btn}</span>
                </div>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    
  );
}
