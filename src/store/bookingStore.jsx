import { createContext, useContext, useEffect, useState } from "react";
import getTheBookings from "../services/bookingService";
import { authContext } from "./authStore";
export const bookingContext = createContext({
  bookings: [],
  cancelBooking: () => {},
});
const BookingContextProvider = ({ children }) => {
  const { handleuserProfile } = useContext(authContext);
  const [bookings, setBooking] = useState([]);
  const addBooking = (data) => {
    const bookingdata = [...data];
    setBooking(bookingdata);
  };
  const cancelBooking = (id,date,time,chefid,bookedAt) => {
    fetch("https://serverofchefbooking.onrender.com/hostbookingcancel", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        id,
        date,
        time,
        chefid,
        bookedAt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          alert(data.message);
          if (res.status === 401) {
            handleuserProfile(false);
            return;
          }
          if (res.status === 404) {
            if (data.message === "Host not found") {
              handleuserProfile(false);
            } else {
              const book = bookings.filter((booking) => {
                 return booking.id !== id
              });
              setBooking(book);
            }
            return;
          }
          if(res.status===400){
            const book = bookings.map((booking) => {
                 if(booking.id== id){
                  return {
                    ...booking,
                    status:data.status,
                  }
                 }else{
                  return booking
                 }
                
              });
              setBooking(book);
              return;
          }
          if (res.status === 500) {
            return;
          }
          throw new Error("Failed to update status");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          const book = bookings.map((booking) => {
            if (booking.id == id) {
              return {
                ...booking,
                status: "cancelled",
              };
            } else {
              return booking;
            }
          });

          setBooking(book);
        }
      })
      .catch((err) => {
        console.error("Error during updating status of Booking:", err);
        alert("An error occurred during updating status. Please try again.");
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getTheBookings(signal)
      .then((bookings) => {
        addBooking(bookings);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Auth check failed:", err.message);
          handleuserProfile(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <bookingContext.Provider value={{ bookings, cancelBooking }}>
      {children}
    </bookingContext.Provider>
  );
};
export default BookingContextProvider;
