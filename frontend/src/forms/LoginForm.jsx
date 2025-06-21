import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { loginSchema } from "../schemas/LoginSchema";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:7460/api/auth/login", values);
        const newToken = res.data.token;

        if (newToken) {
          toast.success("Login successful !", { duration: 2000 });
          login(newToken);
          navigate("/");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Login failed", { duration: 2000 });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 bg-gray-100/90 p-3 rounded-2xl">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-blue-1 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-2"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-blue-1 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-2"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-sm text-red-500 mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-1 text-white font-semibold py-2 rounded-lg hover:bg-orange-500 transition duration-200"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
