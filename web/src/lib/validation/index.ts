import {z} from "zod";

export const registerValidationSchema = z.object({
    username: z.string().min(2, {message: 'Must have at least 2 characters'}),
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(6, {message: 'Must have at least 6 characters'}),
    passwordConfirm: z.string().min(6)
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ['passwordConfirm']
});

export const loginValidationSchema = z.object({
    username: z.string().min(1, {message: 'Must have at least 1 character'}),
    password: z.string().min(6, {message: 'Must have at least 6 characters'}),
});

