import axios from "axios";
import { clearUserVerificationData, getUserForVerification } from "./utils";

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/log-in`,
      { email, password },
      { withCredentials: true }
    );

    const token = res.data?.data?.token;
    const userId = res.data?.data?.user?._id;

    // ✅ Save to localStorage
    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }

    return res.data; // If successful

  } catch (error) {
    // Handle error explicitly here if you want to customize messages
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

export const signUp = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sign-up`,
      payload,
      { withCredentials: true }
    );

    if (res.status !== 201) {
      throw new Error(res.data.message || "Signup failed");
    }

    const token = res.data?.data?.token;
    const userId = res.data?.data?.user?._id;

    // ✅ Save to localStorage
    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }

    // Optionally trigger email verification request
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/email-verify/request?email=${payload.email}&role=${payload.role}`,
      {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Signup failed. Please try again."
    );
  }
};


export const verifyEmail = async (otp) => {
  try {
    const { email, role } = getUserForVerification();
    // const token = localStorage.getItem("token");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/email-verify/submit`,
      { email, role, otp },
      {
        withCredentials: true
      }
    );

    if (res.status !== 200) {
      throw new Error(res.data.message || "Email verification failed");
    }

    clearUserVerificationData();

    return res.data; // success response
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Email verification failed. Please try again."
    );
  }
};