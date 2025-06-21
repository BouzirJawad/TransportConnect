import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { registerSchema } from "../schemas/RegisterSchema";
import axios from "axios";

const RegisterForm = () => {
  const [serverError, setServerError] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isDriver: false,
    isVerified: false,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        isDriver: values.isDriver === "true",
        isVerified: false,
      };
      await axios.post("http://localhost:7460/api/auth/register", payload);
      toast.success("Account created successfully", { duration: 2000 });
      switchToLogin();
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100/90 rounded-2xl p-3 shadow-xl w-full">
      {serverError && (
        <div className="text-red-500 mb-4 text-center">{serverError}</div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-blue-1 font-medium"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-blue-1 font-medium"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-blue-1 font-medium">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-blue-1 font-medium"
              >
                Phone Number
              </label>
              <Field
                type="text"
                name="phoneNumber"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label
                  htmlFor="password"
                  className="block text-blue-1 font-medium"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-blue-1 font-medium"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-1"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-blue-1 font-medium">Registering as:</label>
              <div className="flex gap-5">

              <div className="flex items-center gap-2">
                <Field
                  type="radio"
                  name="isDriver"
                  value="true"
                  className="accent-orange-1"
                  />
                <label className="text-blue-1">Driver</label>
              </div>
              <div className="flex items-center gap-2">
                <Field
                  type="radio"
                  name="isDriver"
                  value="false"
                  className="accent-orange-1"
                  />
                <label className="text-blue-1">Shipper</label>
              </div>
              <ErrorMessage
                name="isDriver"
                component="div"
                className="text-red-500 text-sm"
                />
                </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-1 hover:bg-orange-2 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
