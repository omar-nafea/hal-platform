import React from "react";
import contact from "../../../assets/images/contact.png";
import { useFormik } from "formik";
import * as yup from "yup";

export default function HomeContact() {
  const contactSchema = yup.object().shape({
    name: yup
      .string()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل")
      .max(12, "الاسم يجب ألا يتجاوز 12 حرفًا"),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب")
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صالح"),
    service: yup
      .string()
      .required("يرجى اختيار الخدمة المطلوبة")
      .min(3, "يجب كتابة خدمة لا تقل عن 3 أحرف"),
    notes: yup
      .string()
      .required("يرجى إدخال ملاحظات")
      .min(3, "يجب كتابة ملاحظة لا تقل عن 3 أحرف")
      .max(200, "يجب أن تكون الملاحظة أقل من 200 حرف"),
    email: yup
      .string()
      .required("البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صالح"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      notes: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ✅ Form */}
          <div className="lg:col-span-6 p-8 text-right bg-[#FDFBFF] rounded-2xl border border-[#EBDDF8] shadow-sm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
              {/* Email + Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#491C86]">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    className="w-full text-right border border-[#EBDDF8] rounded-full p-3 text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-[#7E22CE] outline-none"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#491C86]">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="اسم المستخدم"
                    className="w-full text-right border border-[#EBDDF8] rounded-full p-3 text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-[#7E22CE] outline-none"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#491C86]">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="01xxxxxxxxx"
                    className="w-full text-right border border-[#EBDDF8] rounded-full p-3 text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-[#7E22CE] outline-none"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#491C86]">
                    الخدمة المطلوبة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="service"
                    name="service"
                    value={formik.values.service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="حدد الخدمة"
                    className="w-full text-right border border-[#EBDDF8] rounded-full p-3 text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-[#7E22CE] outline-none"
                  />
                  {formik.touched.service && formik.errors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#491C86]">
                  ملاحظتك <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="اكتب ملاحظتك هنا..."
                  className="w-full text-right border border-[#EBDDF8] rounded-2xl p-3 text-sm focus:ring-2 focus:ring-[#7E22CE] focus:border-[#7E22CE] outline-none resize-none"
                ></textarea>
                {formik.touched.notes && formik.errors.notes && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.notes}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#7E22CE] hover:bg-[#9D4EDD] text-white font-semibold rounded-full px-8 py-3 transition"
                >
                  <span className="w-7 h-7 flex items-center justify-center bg-white rounded-full">
                    <i className="fa-solid fa-arrow-left text-[#7E22CE]"></i>
                  </span>
                  <span>تواصل معنا</span>
                </button>
              </div>
            </form>
          </div>

          {/* ✅ Text + Image */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right gap-8">
            <div>
              <span className="block text-lg font-semibold mb-2 text-[#7E22CE]">
                &lt;تواصل معنا&gt;
              </span>
              <h2 className="text-3xl font-bold text-[#00B3A4] leading-snug">
                تواصل معنا لاكتشاف حلول{" "}
                <span className="block text-[#7E22CE]">تقنية مبتكرة لعملك</span>
              </h2>
            </div>

            <div className="w-full max-w-md">
              <img
                src={contact}
                alt="contact illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
