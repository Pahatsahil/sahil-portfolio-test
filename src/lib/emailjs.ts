import emailjs from "@emailjs/browser";
import.meta.env;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// EmailJS configuration
// Replace these values with your EmailJS service credentials
// To get your credentials: https://www.emailjs.com/docs/

export const EMAILJS_CONFIG = {
  PUBLIC_KEY: publicKey,
  SERVICE_ID: serviceId,
  TEMPLATE_ID: templateId,
};

// Initialize EmailJS (uncomment after adding your public key)
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // If EmailJS is not configured, log the email (for development)
    // if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    console.log("Email would be sent:", params);
    console.log("Configure EmailJS to send actual emails");
    //   return true;
    // }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: params.name,
        from_email: params.email,
        subject: params.subject,
        message: params.message,
      },
    );

    return response.status === 200;
  } catch (error) {
    console.error("EmailJS Error:", error);
    return false;
  }
};
