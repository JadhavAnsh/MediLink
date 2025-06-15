"use client";

import { getUser } from "@/lib/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(); // Directly the user object
        console.log("User:", userData);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err.message);
        setError("Could not load user");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <>
          <h2>Name: {user.name}</h2>
          <h4>Email: {user.email}</h4>
          <p>Gender: {user.profile?.gender}</p>
          <p>Role: {user.role}</p>
          <img
            src={user.profile?.profile_img}
            alt="Profile"
            width={150}
            height={150}
            style={{ borderRadius: "8px", marginTop: "10px" }}
          />
        </>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
}
