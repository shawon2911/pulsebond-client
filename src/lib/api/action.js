"use server";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateUserData = async (data, token) => {
  try {
    const res = await fetch(`${baseURL}/dashboard/profile-update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responsedData = await res.json();
    return responsedData;
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Server connection failed" };
  }
};

export const reqForBlood = async (data, token) => {
  try {
    const res = await fetch(`${baseURL}/dashboard/blood-req`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responsedData = await res.json();
    return responsedData;
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Server connection failed" };
  }
};
