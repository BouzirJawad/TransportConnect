import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").lowercase().trim().required("Required"),
    password: yup.string().min(6).required("Required")
})