import React from "react";
import contact from "../../assets/images/contact.png";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Contact() {
  const contactSchema = yup.object().shape({
    name: yup
      .string()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل")
      .max(12, "الاسم يجب ألا يتجاوز 12 حرفًا"),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب")
      .matches(/^01[0125][0-9]{8}$/, "يرجى إدخال رقم هاتف صحيح"),
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

  const contactFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      notes: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // axios.post("/api/contact", values).then(...);
    },
    validationSchema: contactSchema,
  });

  return (
    <div className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ==== FORM ==== */}
          <div className="lg:col-span-6 p-8 text-right">
            <form
              className="flex flex-col"
              onSubmit={contactFormik.handleSubmit}
            >
              {/* Email + Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#491C86]"
                  >
                    <i className="fa-solid mr-1 fa-star-of-life text-[5px] text-[#00B3A4]" />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={contactFormik.handleChange}
                    onBlur={contactFormik.handleBlur}
                    value={contactFormik.values.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#00B3A4] focus:border-[#491C86] block w-full p-2.5 text-right"
                  />
                  {contactFormik.errors.email && contactFormik.touched.email && (
                    <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                      {contactFormik.errors.email}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-[#491C86]"
                  >
                    <i className="fa-solid mr-1 fa-star-of-life text-[5px] text-[#00B3A4]" />
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="اسم المشروع"
                    onChange={contactFormik.handleChange}
                    onBlur={contactFormik.handleBlur}
                    value={contactFormik.values.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#00B3A4] focus:border-[#491C86] block w-full p-2.5 text-right"
                  />
                  {contactFormik.errors.name && contactFormik.touched.name && (
                    <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                      {contactFormik.errors.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-[#491C86]"
                  >
                    <i className="fa-solid mr-1 fa-star-of-life text-[5px] text-[#00B3A4]" />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="ادخل رقم الهاتف"
                    onChange={contactFormik.handleChange}
                    onBlur={contactFormik.handleBlur}
                    value={contactFormik.values.phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#00B3A4] focus:border-[#491C86] block w-full p-2.5 text-right"
                  />
                  {contactFormik.errors.phone && contactFormik.touched.phone && (
                    <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                      {contactFormik.errors.phone}
                    </div>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block mb-2 text-sm font-medium text-[#491C86]"
                  >
                    <i className="fa-solid mr-1 fa-star-of-life text-[5px] text-[#00B3A4]" />
                    اختيار الخدمة
                  </label>
                  <input
                    type="text"
                    id="service"
                    name="service"
                    placeholder="حدد الخدمة"
                    onChange={contactFormik.handleChange}
                    onBlur={contactFormik.handleBlur}
                    value={contactFormik.values.service}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#00B3A4] focus:border-[#491C86] block w-full p-2.5 text-right"
                  />
                  {contactFormik.errors.service &&
                    contactFormik.touched.service && (
                      <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                        {contactFormik.errors.service}
                      </div>
                    )}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <label
                  htmlFor="notes"
                  className="block mb-2 text-sm font-medium text-[#491C86]"
                >
                  <i className="fa-solid mr-1 fa-star-of-life text-[5px] text-[#00B3A4]" />
                  ملاحظتك
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  placeholder="ادخل ملاحظتك"
                  onChange={contactFormik.handleChange}
                  onBlur={contactFormik.handleBlur}
                  value={contactFormik.values.notes}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-[#00B3A4] focus:border-[#491C86] block w-full p-3 text-right resize-none"
                />
                {contactFormik.errors.notes && contactFormik.touched.notes && (
                  <div className="p-3 mt-2 text-sm text-red-700 bg-red-100 rounded-full">
                    {contactFormik.errors.notes}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center w-full mt-6">
                <button
                  type="submit"
                  className="bg-[#491C86] hover:bg-[#00B3A4] transition text-white font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-3 w-full"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-[#491C86]">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span>تواصل معنا</span>
                </button>
              </div>
            </form>
          </div>

          {/* ==== IMAGE SIDE ==== */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right gap-8">
            <div>
              <span className="block text-lg font-semibold text-[#00B3A4] mb-2">
                &lt;تواصل معنا&gt;
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[#491C86]">
                تواصل معانا لاكتشاف حلول{" "}
                <span className="block text-[#00B3A4]">تقنية مبتكرة لعملك</span>
              </h2>
            </div>

            <div className="img-contact w-full max-w-md">
              <img
                src={contact}
                alt="contact"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
