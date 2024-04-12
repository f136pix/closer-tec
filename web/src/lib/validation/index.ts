import {z} from "zod";

export const registerValidationSchema = z.object({
    name: z.string().min(2, {message: 'Must have at least 2 characters'}),
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(8, {message: 'Must have at least 8 characters'}),
    passwordConfirm: z.string().min(8)
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ['passwordConfirm']
});

