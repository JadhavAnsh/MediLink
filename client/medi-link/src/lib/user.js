import axios from "axios";

let userId = null;
let name = null;
let email = null;
let role = null;
let profileImage = null;
let age = null;
let gender = null;
let specialization = null;

export const getUser = async () => {
  if (typeof window === "undefined") return null;

  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!storedUserId) throw new Error("User ID not found");

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}users/${storedUserId}`,
    {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    }
  );

  const user = res.data;

  // Assign to module-scoped variables
  userId = user._id;
  name = user.name;
  email = user.email;
  role = user.role;
  profileImage = user.profile?.profile_img || null;
  age = user.profile?.age || null;
  gender = user.profile?.gender || null;
  specialization = user.profile?.specialization || null;

  return user;
};

export const updateUser = async (updateData) => {
  if (typeof window === "undefined") return null;

  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!storedUserId) throw new Error("User ID not found");

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}users/${storedUserId}`,
    updateData,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return res.data;
};

// Export getters
export const getUserId = () => userId;
export const getUserName = () => name;
export const getUserEmail = () => email;
export const getUserRole = () => role;
export const getUserProfileImage = () => profileImage;
export const getUserAge = () => age;
export const getUserGender = () => gender;
export const getUserSpecialization = () => specialization;
