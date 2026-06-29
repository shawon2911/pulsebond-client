"use server";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateUserData = async (data, token) => {
  try {
    const res = await fetch(`${baseURL}/dashboard/profile-update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
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

export const userDonationReq = async (email, status) => {
  let url = `${baseURL}/bloodReq?email=${email}`;
  if (status && status !== "all") {
    url += `&status=${status}`;
  }
  const res = await fetch(url);
  const result = await res.json();
  const allData = result?.data;
  return allData;
};


export const editReqInfo = async(data, id, token) => {
 const res = await fetch(`${baseURL}/dashboard/bloodReq/edit/${id}`, {
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
 });
  const responsedData = await res.json();
  return responsedData;
}


// bloodGroup: "AB+";
// createdAt: "2026-06-28T19:39:00.373Z";
// donationDate: "2026-07-03";
// donationTime: "17:39";
// fullAddress: "Chuadanga main road, kolakhali road";
// hospitalName: "Chudanga medical college";
// recipientDistrict: "24";
// recipientName: "Rahman Majumdar";
// recipientUpazila: "193";
// requestMessage: "He needs blood for his heart operation....";
// requesterEmail: "user4@gmail.com";
// requesterName: "user4";
// status: "pending";
// _id: "6a41785476612d4096f173c9";
