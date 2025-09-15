import React from "react";
import contact from "../../assets/images/contact.png";
import { Link } from "react-router-dom";
import bottomDots from "../../assets/images/bottom-dots2.png";
import topDots from "../../assets/images/top-dots.png";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export default function Contact() {
  let contactSchema = yup.object().shape({
    name: yup
      .string()
      .required("الاسم مطلوب")
      .min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل")
      .max(12, "الاسم يجب ألا يتجاوز 12 حرفًا"),
    phone: yup
      .string()
      .required("رقم الهاتف مطلوب")
      .matches(/^01[0125][0-9]{8}$/),
    service: yup
      .string()
      .required("يرجى اختيار الخدمة المطلوبة")
      .min(3, "يجب كتابة خدمة لا تقل عن 3 أحرف"),
    notes: yup
      .string()
      .required("يرجى ادخال ملاحظات")
      .min(3, "يجب كتابة ملاحظة لا تقل عن 3 أحرف")
      .max(200, "يجب أن تكون الملاحظة أقل من 200 حرف"),
    email: yup
      .string()
      .required("البريد الالكترونى مطلوب ")
      .email("يرجى إدخال بريد إلكتروني صالح"),
  });

  let user = {
    name: "",
    email: "",
    phone: "",
    service: "",
    notes: "",
  };
  function submit(values) {
    console.log(values);

    // await axios.post("", values).then((res)=>{console.log(res);
    // }).catch((error)=>{console.log(error);
    // });
  }
  const contactFormik = useFormik({
    initialValues: user,
    onSubmit: submit,
    validationSchema: contactSchema,
  });
  return (
    <div>
      <div className="py-16 bg-[#F6FBFD] relative">
        <div className="max-w-7xl mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6  p-8  text-right">
              <form
                className="flex flex-col"
                onSubmit={contactFormik.handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      <i className="fa-solid mr-1 fa-star-of-life text-[5px] "></i>
                      البريد الالكترونى
                    </label>
                    <input
                      onChange={contactFormik.handleChange}
                      onBlur={contactFormik.handleBlur}
                      value={contactFormik.values.email}
                      type="email"
                      id="email"
                      name="email"
                      className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="name@example.com"
                      required
                    />
                    {contactFormik.errors.email &&
                    contactFormik.touched.email ? (
                      <div
                        className="p-4 mb-4 mt-2 rounded-full text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {" "}
                        {contactFormik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      <i className="fa-solid mr-1 fa-star-of-life text-[5px] "></i>
                      الاسم
                    </label>
                    <input
                      onChange={contactFormik.handleChange}
                      onBlur={contactFormik.handleBlur}
                      value={contactFormik.values.name}
                      type="text"
                      id="name"
                      name="name"
                      className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="اسم المشروع"
                      required
                    />{" "}
                    {contactFormik.errors.name && contactFormik.touched.name ? (
                      <div
                        className="p-4 mb-4 mt-2 rounded-full  text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {contactFormik.errors.name}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      <i className="fa-solid mr-1 fa-star-of-life text-[5px] "></i>
                      رقم الهاتف
                    </label>
                    <input
                      onChange={contactFormik.handleChange}
                      onBlur={contactFormik.handleBlur}
                      value={contactFormik.values.phone}
                      type="tel"
                      id="phone"
                      name="phone"
                      className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="ادخل رقم الهاتف"
                      required
                    />
                    {contactFormik.errors.phone &&
                    contactFormik.touched.phone ? (
                      <div
                        className="p-4 mb-4 mt-2 rounded-full text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {" "}
                        {contactFormik.errors.phone}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      <i className="fa-solid mr-1 fa-star-of-life text-[5px] "></i>
                      اختيار الخدمة
                    </label>
                    <input
                      onChange={contactFormik.handleChange}
                      onBlur={contactFormik.handleBlur}
                      value={contactFormik.values.service}
                      type="text"
                      id="service"
                      name="service"
                      className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="حدد الخدمة"
                      required
                    />
                    {contactFormik.errors.service &&
                    contactFormik.touched.service ? (
                      <div
                        className="p-4 mb-4 mt-2 rounded-full text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {" "}
                        {contactFormik.errors.service}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    <i className="fa-solid mr-1 fa-star-of-life text-[5px] "></i>
                    ملاحظتك
                  </label>
                  <textarea
                    value={contactFormik.values.notes}
                    onChange={contactFormik.handleChange}
                    onBlur={contactFormik.handleBlur}
                    name="notes"
                    id="notes"
                    rows="4"
                    className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 resize-none"
                    placeholder="ادخل ملاحظتك "
                    required
                  ></textarea>
                  {contactFormik.errors.notes && contactFormik.touched.notes ? (
                    <div
                      className="p-4 mb-4 mt-2 rounded-full text-sm text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {" "}
                      {contactFormik.errors.notes}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex items-center justify-center w-full mt-6">
                  <button
                    type="submit"
                    className="btn text-center w-full flex items-center justify-center gap-2"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-main2 rounded-full main-text">
                      <i className="fa-solid fa-arrow-left text-[#013366]"></i>
                    </span>
                    <span className="main-text">تواصل معنا</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right gap-8">
              <div>
                <span className="block text-lg font-semibold mb-2">
                  &lt;تواصل معنا&gt;
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                  تواصل معانا لاكتشاف حلول{" "}
                  <span className="block">تقنية مبتكرة لعملك</span>
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
        <div className="absolute flex  bottom-0 right-0 w-full lg:w-[45%] pointer-events-none">
          <img src={bottomDots} alt="dots" />
        </div>
        <div className="absolute top-0 left-0 w-full lg:w-[45%] pointer-events-none">
          <img src={topDots} alt="dots" />
        </div>
      </div>
    </div>
  );
}
