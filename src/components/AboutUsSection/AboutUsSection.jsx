import React from "react";
import { motion } from "framer-motion";
import HomeAbout from "../Hero/HomeAbout/HomeAbout";
import HomeProjects from "../Hero/HomeProjects/HomeProjects";
import HomeContact from "../Hero/HomeContact/HomeContact";

export default function AboutUsSection() {
  const cards = [
    {
      title: "الذكاء الاصطناعي",
      text: "نطوّر أنظمة ذكاء اصطناعي متكاملة مصممة خصيصًا لتلبية احتياجات شركتك وتحسين تجربة عملائك.",
    },
    {
      title: "التحول الرقمي",
      text: "نساعدك في أتمتة العمليات وتبسيط إدارة الأعمال لزيادة الإنتاجية وتحقيق نتائج أسرع.",
    },
    {
      title: "تحليل البيانات",
      text: "نحوّل بياناتك إلى رؤى استراتيجية تمكّنك من اتخاذ قرارات دقيقة مدعومة بالذكاء الاصطناعي.",
    },
    {
      title: "تطوير البرمجيات",
      text: "نبتكر حلولًا برمجية مرنة وسريعة تساعدك على مواكبة التطور في عالم التقنية.",
    },
  ];

  return (
    <>
      <section className="bg-white text-[#491C86] text-center py-32 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="block text-lg font-semibold text-[#6B2BAE] mb-2">
            &lt; من نحن &gt;
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
            التكنولوجيا في خدمتك… لنقل عملك إلى مستوى جديد
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="container mx-auto grid grid-cols-12 gap-8 mt-16">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="col-span-12 sm:col-span-6 lg:col-span-3 px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#F9F8FF] border border-[#EDE7F6] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{card.text}</p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-between bg-[#491C86] text-white rounded-full px-4 py-2 w-fit mx-auto hover:bg-[#6B2BAE] transition-all duration-300 cursor-pointer"
                >
                  <span className="ml-3 font-medium text-sm">اكتشف المزيد</span>
                  <span className="w-8 h-8 flex items-center justify-center bg-[#00B3A4] rounded-full text-white shadow-md">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Follow-up sections */}
      <HomeAbout />
      <HomeProjects />
      <HomeContact />
    </>
  );
}
