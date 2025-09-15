import React from "react";
import HomeSlider from "../../HomeSlider/HomeSlider";

export default function HomeProjects() {
  return (
    <section className="bg-[#E2F2F7]">
      <div className="projects container mx-auto">
        <div className="p-10 ">
          <div className="flex flex-col gap-5 items-center justify-center md:justify-around md:flex-row-reverse mx-auto ">
            <div className="content-works text-right md:max-w-[32rem]">
              <span className="block text-lg font-semibold mb-2 text-center md:text-end">
                &lt;محفظة مشاريعنا&gt;
              </span>
              <h2 className="text-3xl font-bold text-center md:text-end">
                اكتشف مشاريعنا باستخدام أحدث تقنيات الذكاء الاصطناعي
              </h2>
            </div>
            <div className="bg-main rounded-3xl px-3 py-2 flex items-center justify-between md:w-[159px]">
              <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                <i className="fa-solid fa-arrow-left text-[#013366]"></i>
              </span>
              <span className="main-text"> اعرف المزيد عنا </span>
            </div>
          </div>
        </div>
        <HomeSlider />
      </div>
    </section>
  );
}
