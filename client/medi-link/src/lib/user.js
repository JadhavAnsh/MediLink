import axios from "axios";

export const getUser = async () => {
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId) throw new Error("User ID not found");

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}users/${userId}`,
    {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    }
  );

  return res.data;
};
