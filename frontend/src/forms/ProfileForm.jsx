// src/forms/ProfileForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";

const ProfileForm = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    confirmationPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    confirmationPassword: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Confirm your password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:7460/api/users/edit-info/${user._id}`, values);
      toast.success("Profile updated successfully!");
      setUser(res.data.updatedUser);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div className=" flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-1">
              First Name
            </label>
            <Field
              name="firstName"
              className="input bg-gray-300 w-full border-b-2 rounded-md"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-1">
              Last Name
            </label>
            <Field
              name="lastName"
              className="input w-full bg-gray-300 border-b-2 rounded-md"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-1">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="input w-full bg-gray-300 border-b-2 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-blue-1">
              Phone Number
            </label>
            <Field
              name="phoneNumber"
              className="input w-full bg-gray-300 border-b-2 rounded-md"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>

        <div className="mx-auto w-1/2" >
          <label className="block text-center text-sm font-medium text-blue-1">
            Confirm Password
          </label>
          <Field
            name="confirmationPassword"
            type="password"
            className="input w-full bg-gray-300 border-b-2 rounded-md"
          />
          <ErrorMessage
            name="confirmationPassword"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-1 text-white py-2 px-4 rounded hover:bg-orange-2 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
