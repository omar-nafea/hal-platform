import { useFormik } from "formik";

import { Link } from "react-router-dom";
import * as yup from "yup";

export default function Login() {
  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: yup
      .string()
      .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
      .required("كلمة المرور مطلوبة"),
  });

  async function handleLogin(formValues) {
    console.log(formValues);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#011F41] via-[#022C5D] to-[#034078] p-6">
      <div
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-center text-[#013366] mb-8">
          🔑 تسجيل الدخول
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="example@mail.com"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700"></label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="********"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 text-white bg-[#013366] hover:bg-[#022C5D] focus:ring-4 focus:ring-blue-300 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            ليس لديك حساب؟{" "}
            <Link
              to="/register"
              className="text-[#013366] font-bold hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forgetPassword"
              className="text-[#013366] hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
