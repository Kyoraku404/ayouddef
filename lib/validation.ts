import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Full name cannot exceed 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(120, "Email cannot exceed 120 characters."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone or WhatsApp number.")
    .max(30, "Phone number is too long."),
  date: z
    .string()
    .min(1, "Please select your preferred tour date.")
    .refine((val) => !isNaN(Date.parse(val)), "Please provide a valid date."),
  people: z
    .coerce
    .number()
    .int("Number of guests must be a whole number.")
    .positive("Number of guests must be at least 1.")
    .max(50, "For groups larger than 50, please request a custom arrangement."),
  tour: z
    .string()
    .trim()
    .min(2, "Please select a tour experience."),
  message: z
    .string()
    .trim()
    .max(1500, "Message cannot exceed 1,500 characters.")
    .optional()
    .or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid admin email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const reservationStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});
