import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  business_name: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.string().min(1, "Choose a service"),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(3000),
  preferred_contact: z.enum(["email", "whatsapp", "instagram"]),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
