const getContactRequests = async (signal) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/get-requests", {
      signal,
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        return { isLoggedIn: false };
      }
      if (response.status === 404) {
        return { isLoggedIn: false };
      }
      if (response.status === 500) {
        throw new Error("Internal server error");
      }
      throw new Error("Failed to fetch authentication status");
    }
    return mapServerRequestToLocaRequest(data.requests);
  } catch (err) {
    throw err;
  }
};
const mapServerRequestToLocaRequest = (requests) => {
  return requests.map((request) => {
    return {
      requestid: request._id,
      name: request.name,
      email: request.email,
      city: request.city,
      mobile: request.mobile,
      createdAt: request.createdAt,
      message: request.message,
      read: request.read,
    };
  });
};
export default getContactRequests;
