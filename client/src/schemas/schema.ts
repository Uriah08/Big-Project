import z from 'zod'

export const registerSchema = z.object({
    username: z.string().toLowerCase().min(6, {
      message: "Username must be at least 6 characters.",
    }).max(15,{
      message: "Username must be at most 15 characters.",
    }),
    email: z.string().toLowerCase().email().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }).max(30,{
      message: "Password must be at most 30 characters.",
    }),
  })

export const loginSchema = z.object({
    username: z.string().toLowerCase().min(6, {
      message: "Username must be at least 6 characters.",
    }).max(15,{
      message: "Username must be at most 15 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }).max(30,{
      message: "Password must be at most 30 characters.",
    }),
  })