import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  let navigate = useNavigate();
  const [apierror, setapierror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "الاسم يجب أن يحتوي على حروف فقط")
      .min(3, "الاسم يجب ألا يقل عن 3 حروف")
      .max(20, "الاسم يجب ألا يزيد عن 20 حرف")
      .required("الاسم مطلوب"),

    email: yup
      .string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),

    password: yup
      .string()
      .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
      .max(20, "كلمة المرور يجب ألا تزيد عن 20 حرف")
      .matches(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
      .matches(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل")
      .matches(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل")
      .matches(
        /[@$!%*?&]/,
        "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل"
      )
      .required("كلمة المرور مطلوبة"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "كلمة المرور وتأكيدها غير متطابقين")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  async function handleregister(formValues) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((response) => {
        setIsLoading(false);
        navigate("/");
        console.log(response?.data?.message);
      })
      .catch((error) => {
        setIsLoading(false);
        setapierror(error?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleregister,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#011F41] via-[#013366] to-[#022C5D] p-6">
      <div
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8"
        dir="rtl"
      >
        {apierror && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
            {apierror}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-[#013366] mb-8">
          ✨ إنشاء حساب جديد
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              الاسم
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#013366]"
              }`}
              placeholder="أدخل اسمك"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#013366]"
              }`}
              placeholder="example@mail.com"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#013366]"
              }`}
              placeholder="********"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#013366]"
              }`}
              placeholder="********"
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 text-white bg-[#013366] hover:bg-[#011F41] focus:ring-4 focus:ring-[#022C5D] rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              "إنشاء الحساب"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
