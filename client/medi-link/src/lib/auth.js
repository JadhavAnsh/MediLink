import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/log-in`,
      { email, password },
      { withCredentials: true }
    );
    return res.data; // If successful
  } catch (error) {
    // Handle error explicitly here if you want to customize messages
    throw new Error(
      error.response?.data?.message || 'Login failed. Please try again.'
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

    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Signup failed. Please try again."
    );
  }
};



