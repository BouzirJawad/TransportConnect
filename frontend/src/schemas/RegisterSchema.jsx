import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
    firstName: yup.string().min(3).max(20).required("First name is required"),
    lastName: yup.string().min(3).max(20).required("Last name is required"),
    email: yup.string().email("Please enter a valid email").lowercase().trim().required("Email is required"),
    phoneNumber: yup.string().min(10).max(10).trim().required("Phone number is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    isDriver: yup.boolean(),
  });