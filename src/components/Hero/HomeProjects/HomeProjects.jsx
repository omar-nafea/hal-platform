import React from "react";
import HomeSlider from "../../HomeSlider/HomeSlider";

export default function HomeProjects() {
  return (
    <section className="bg-white py-20">
      <div className="projects container mx-auto">
        {/* Header Section */}
        <div className="p-10">
          <div className="flex flex-col gap-6 items-center justify-center md:justify-around md:flex-row-reverse mx-auto">
            {/* Text Section */}
            <div className="content-works text-right md:max-w-[32rem]">
              <span className="block text-lg font-semibold mb-2 text-[#6B2BAE] text-center md:text-end">
                &lt; محفظة مشاريعنا &gt;
              </span>
              <h2 className="text-3xl font-bold text-center md:text-end text-[#491C86] leading-snug">
                اكتشف مشاريعنا باستخدام أحدث تقنيات الذكاء الاصطناعي
              </h2>
            </div>

            {/* Button */}
            <div className="bg-[#491C86] hover:bg-[#6B2BAE] transition-all duration-300 rounded-3xl px-5 py-3 flex items-center justify-between md:w-[180px] shadow-md">
              <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                <i className="fa-solid fa-arrow-left text-[#491C86]"></i>
              </span>
              <span className="text-white font-medium">اعرف المزيد عنا</span>
            </div>
          </div>
        </div>

        {/* Projects Slider */}
        <HomeSlider />
      </div>
    </section>
  );
}
