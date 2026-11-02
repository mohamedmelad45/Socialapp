import { Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { HiKey } from "react-icons/hi2";

export default function Settings() {
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "At least 8 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      toast.success("Password updated successfully!");
      resetForm();
    },
  });

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HiKey className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Change Password</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Current password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter current password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
            />
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <p className="text-[10px] text-red-500 mt-1 font-medium">{formik.errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              At least 8 characters with uppercase, lowercase, number, and special character.
            </p>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-[10px] text-red-500 mt-1 font-medium">{formik.errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Re-enter new password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none transition"
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
              <p className="text-[10px] text-red-500 mt-1 font-medium">{formik.errors.confirmNewPassword}</p>
            )}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition text-sm cursor-pointer"
            >
              Update password
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}