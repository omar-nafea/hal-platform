import React from "react";

import HomeSlider from "../HomeSlider/HomeSlider";
import HomeContact from "../Hero/HomeContact/HomeContact";
import HomeAbout from "../Hero/HomeAbout/HomeAbout";
import HomeProjects from "../Hero/HomeProjects/HomeProjects";
export default function AboutUsSection() {
  return (
    <>
      <section>
        <div className="bg-main  text-center py-40  px-6 ">
          <div className="mb-10 text-center">
            <span className="main-text block text-lg font-semibold">
              &lt; من نحن &gt;
            </span>
            <h2 className="main-text text-3xl font-bold mt-4">
              التكنولوجيا في خدمتك… لنقل عملك إلى مستوى جديد
            </h2>
          </div>
          {/* cols */}
          <div className="container mx-auto grid  grid-cols-12 ">
            <div className="  col-span-12 lg:col-span-3 gap-6  px-6  mb-5">
              <div className=" bg-main2 shadow-lg rounded-3xl p-6 ">
                <h3 className="text-xl font-bold mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-600">
                  نطوّر أنظمة ذكاء اصطناعي متكاملة مصممة خصيصًا لتلبية احتياجات
                  شركتك وتحسين تجربة عملائك.
                </p>
                <div className="bg-main rounded-3xl px-3 py-2 mr-24 flex items-center justify-between w-full ">
                  <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                    <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                  </span>
                  <span className=" main-text"> اكتشف المزيد</span>
                </div>
              </div>
            </div>
            <div className="  col-span-12 lg:col-span-3 gap-6  px-6  mb-5">
              <div className=" bg-main2 shadow-lg rounded-3xl p-6 ">
                <h3 className="text-xl font-bold mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-600">
                  نطوّر أنظمة ذكاء اصطناعي متكاملة مصممة خصيصًا لتلبية احتياجات
                  شركتك وتحسين تجربة عملائك.
                </p>
                <div className="bg-main rounded-3xl px-3 py-2 mr-24 flex items-center justify-between w-full ">
                  <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                    <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                  </span>
                  <span className=" main-text"> اكتشف المزيد</span>
                </div>
              </div>
            </div>
            <div className="  col-span-12 lg:col-span-3 gap-6  px-6  mb-5">
              <div className=" bg-main2 shadow-lg rounded-3xl p-6 ">
                <h3 className="text-xl font-bold mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-600">
                  نطوّر أنظمة ذكاء اصطناعي متكاملة مصممة خصيصًا لتلبية احتياجات
                  شركتك وتحسين تجربة عملائك.
                </p>
                <div className="bg-main rounded-3xl px-3 py-2 mr-24 flex items-center justify-between w-full ">
                  <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                    <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                  </span>
                  <span className=" main-text"> اكتشف المزيد</span>
                </div>
              </div>
            </div>
            <div className="  col-span-12 lg:col-span-3 gap-6  px-6  mb-5">
              <div className=" bg-main2 shadow-lg rounded-3xl p-6 ">
                <h3 className="text-xl font-bold mb-2">الذكاء الاصطناعي</h3>
                <p className="text-gray-600">
                  نطوّر أنظمة ذكاء اصطناعي متكاملة مصممة خصيصًا لتلبية احتياجات
                  شركتك وتحسين تجربة عملائك.
                </p>
                <div className="bg-main rounded-3xl px-3 py-2 mr-24 flex items-center justify-between w-full ">
                  <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                    <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                  </span>
                  <span className=" main-text"> اكتشف المزيد</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeAbout />

      <HomeProjects />

      <HomeContact />
    </>
  );
}
