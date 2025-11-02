import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import imgSlider from "../../assets/images/img-slider.png";

export default function HomeSlider() {
  const slides = [
    {
      img: imgSlider,
      subTitle: "الذكاء الاصطناعى",
      title: "مشاريعنا العقارية الذكية",
      text: "نقدّم حلولًا تقنية متقدمة لإدارة العقارات وتحليل السوق باستخدام الذكاء الاصطناعي.",
      btn: "اعرف المزيد عنا",
    },
    {
      img: imgSlider,
      subTitle: "التحول الرقمي",
      title: "نقود المستقبل بالتقنيات الحديثة",
      text: "نساعد الشركات على تسريع التحول الرقمي من خلال أنظمة ذكية وفعّالة.",
      btn: "تعرف على خدماتنا",
    },
    {
      img: imgSlider,
      subTitle: "الابتكار التقني",
      title: "حلول تكنولوجية مبتكرة",
      text: "نصمم تطبيقات ذكية تدعم النمو المستقبلي وتقدم تجربة استخدام مميزة.",
      btn: "استكشف مشاريعنا",
    },
    {
      img: imgSlider,
      subTitle: "التحليلات الذكية",
      title: "قرارات أدق بذكاء البيانات",
      text: "نحوّل البيانات إلى قرارات ذكية عبر تقنيات تحليل متقدمة.",
      btn: "تعرف أكثر",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="p-[2px] bg-gradient-to-br from-[#EBDDF8] to-[#491C86] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-56 object-cover bg-white rounded-t-2xl"
                  />
                  <div className="p-5 text-right">
                    <span className="bg-[#EBDDF8] text-[#491C86] font-semibold rounded-full px-4 py-1 text-sm inline-block mb-2">
                      {slide.subTitle}
                    </span>
                    <h3 className="text-xl font-bold text-[#491C86] mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-[#1F1F1F] leading-relaxed mb-4">
                      {slide.text}
                    </p>
                    <button className="bg-[#491C86] hover:bg-[#6B2BAE] text-white rounded-3xl px-5 py-2 font-medium transition-colors duration-200">
                      {slide.btn}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
