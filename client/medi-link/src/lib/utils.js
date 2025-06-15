import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const saveUserForVerification = ({ email, role }) => {
  localStorage.setItem("verify_email", email);
  localStorage.setItem("verify_role", role);
};

export const getUserForVerification = () => {
  const email = localStorage.getItem("verify_email");
  const role = localStorage.getItem("verify_role");

  if (!email || !role) throw new Error("Verification data missing");

  return { email, role };
};

export const clearUserVerificationData = () => {
  localStorage.removeItem("verify_email");
  localStorage.removeItem("verify_role");
};

