import React from "react";
import heart from "../../../../assets/images/Vector.png";
import dots from "../../../../assets/images/details-dots.png";
export default function ProjectGoal() {
  return (
    <>
      <section className="bg-[#F6FBFD] relative">
        <div className="  text-end py-10  px-6 ">
          <div className="title mb-10 text-center md:text-right md:mr-26">
            <h2 className=" text-4xl font-bold  ">اهداف المشروع </h2>
          </div>
          {/* cols */}
          <div className="container mx-auto grid  md:flex md:justify-evenly text-center  grid-cols-12 ">
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  تسهيل قرارات البيع والشراء عبر تقارير ذكية ومتكاملة
                </p>
              </div>
            </div>
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  تقديم تنبؤات دقيقة لأسعار العقارات اعتمادًا على الذكاء
                  الاصطناعي{" "}
                </p>
              </div>
            </div>
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  تحسين تجربة المستخدم في البحث وإدارة العقارات
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-30 left-[470px] w-[120px]">
          <img src={heart} alt="heart vector" className="w-full" />
        </div>
        <div className="absolute top-30 left-[930px] w-[120px]">
          <img src={heart} alt="heart vector" className="w-full" />
        </div>
      </section>
      <section className="bg-[#F6FBFD] relative pb-10 ">
        <div className="  text-end py-10  px-6 ">
          <div className="title mb-10 text-center md:text-right md:mr-26">
            <h2 className=" text-4xl font-bold  ">نتائج المشروع </h2>
          </div>
          {/* cols */}
          <div className="container mx-auto grid  md:flex md:justify-evenly text-center  grid-cols-12 ">
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  رفع كفاءة قرارات المستثمرين والشركات العقارية مما ساعد في
                  زيادة العائدات{" "}
                </p>
              </div>
            </div>
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  زيادة دقة التنبؤ بالأسعار إلى أكثر من 90%{" "}
                </p>
              </div>
            </div>
            <div className="  col-span-12 max-w-sm md:w-auto lg:col-span-3   px-6  mb-5">
              <div className=" bg-[#E2F2F7] shadow-lg rounded-3xl p-6 ">
                <p className="text-gray-600">
                  تقليل وقت البحث عن العقار المناسب بنسبة تصل إلى 40%{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-30 left-[480px] w-[120px]">
          <img src={heart} alt="heart vector" className="w-full" />
        </div>
        <div className="absolute top-30 left-[920px] w-[120px]">
          <img src={heart} alt="heart vector" className="w-full" />
        </div>
        <div className="dots absolute bottom-0 w-dvh">
          <img src={dots} alt="project details dots" className="w-full" />
        </div>
      </section>
    </>
  );
}
