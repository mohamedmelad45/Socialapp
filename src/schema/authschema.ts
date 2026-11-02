import * as z from 'zod';

export const registrationSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name Is Required")
    .min(3, "Name Should be more than 3 characters")
    .max(15, "Name Shouldn't Exceed 15 Character"),
  
  username: z.string().trim()
    .min(1, "User Name Is Required")
    .min(3, "Name Should be more than 3 characters")
    .max(15, "Name Shouldn't Exceed 15 Character"),
  
  email: z.string().email("Invalid Email"), 
  
  password: z.string()
    .min(1, "Password Is Required")
    .min(6, "Password Can't be less than 6 characters")
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\/\\\[\]~`])[A-Z].{5,9}$/, 
      "Password Must start with Capital Letter, Must Container Number and Special Character"
    ),
  
  gender: z.string().refine((value) => value === "male" || value === "female", {
    message: "Please Select a Gender"
  }),
  
  rePassword: z.string().min(1, "Re Password Is Required"),
  
  dateOfBirth: z.string().min(1, "Choose Date Of Birth")
}).refine(({ password, rePassword }) => password === rePassword, {
  message: "Passwords Doesn't Match",
  path: ["rePassword"]
});


export const loginSchema = z.object({
 
  email: z.string().email("Invalid Email"), 
  
  password: z.string()
    .min(1, "Password Is Required")
    .min(6, "Password Can't be less than 6 characters")
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\/\\\[\]~`])[A-Z].{5,9}$/, 
      "Password Must start with Capital Letter, Must Container Number and Special Character"
    ),
});