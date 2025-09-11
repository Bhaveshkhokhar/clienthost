const getTheBookings = async (signal) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/get-bookings", {
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
     return mapServerbookingToLocalbooking(data.allbooking);
  } catch (err) {
    throw err;
  }
};
const mapServerbookingToLocalbooking = (bookings) => {
  return bookings.map((booking) => {
    return {
      bookedAt:booking.bookedAt,
      id:booking.id,
      user:booking.user,
      chef:booking.chef,
      date:booking.date,
      time:booking.time,
      fees:booking.fees,
      status:booking.status,
    };
  });
};
export default getTheBookings;
