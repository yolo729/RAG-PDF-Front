import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobile_no: Yup.string()
    .matches(/^[0-9]+$/, "Invalid contact number") // Only allow numeric characters
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number can be at most 15 digits")
    .required("Contact is required"),
});

export const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const LLMKeySchema = Yup.object({
  llmKey: Yup.string().required("key is required"),
});

export const LLMTempSchema = Yup.object({
  llmTemp: Yup.string().required("Temparature is required"),
});

export const SetPromptSchema = Yup.object({
  prompt: Yup.string().required("Prompt is required"),
});

export const GPTSchema = Yup.object({
  gpt: Yup.string().required("GPT is required"),
});
