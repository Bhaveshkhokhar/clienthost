import { useContext } from "react";
import style from "./Booking.module.css";
import { ImCancelCircle } from "react-icons/im";
import { bookingContext } from "../store/bookingStore";
const Booking = () => {
  const { bookings, cancelBooking } = useContext(bookingContext);
  const data = bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (bookings.length === 0) {
    return (
      <>
        <center>
          <h2 style={{ color: "#3B6DCE", marginTop: "50px" }}>
            <u>NO BOOKING TILL NOW</u>
          </h2>
        </center>
      </>
    );
  }
  return (
    <>
      <div style={{ margin: "5px" }}>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User name</th>
                <th scope="col">Chef</th>
                <th scope="col">Fees</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking, index) => (
                <tr key={index}>
                  <th scope="row">{booking.date}</th>
                  <td>
                    <img
                      width="30px"
                      height="30px"
                      style={{ borderRadius: "30px", marginRight: "2px" }}
                      src={`https://serverofchefbooking.onrender.com${booking.user.profileImage}`}
                      alt="User"
                    ></img>
                    <span>{booking.user.name}</span>
                  </td>
                  <td>
                    <img
                      width="30px"
                      height="30px"
                      style={{ borderRadius: "30px", marginRight: "2px" }}
                      src={`https://serverofchefbooking.onrender.com${booking.chef.profileImage}`}
                      alt="Chef"
                    ></img>
                    <span>{booking.chef.name}</span>
                  </td>
                  <td>₹{booking.fees}</td>
                  <td>
                    {booking.status === "pending" && (
                      <button
                        style={{
                          border: "none",
                          background: "white",
                          color: "red",
                        }}
                        onClick={() => {
                          cancelBooking(booking.id,booking.date,booking.time,booking.chef._id,booking.bookedAt);
                        }}
                      >
                        <ImCancelCircle />
                      </button>
                    )}
                    {booking.status === "cancelled" && (
                      <span style={{ color: "red" }}>Cancelled</span>
                    )}
                    {booking.status === "Completed" && (
                      <span style={{ color: "green" }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Booking;
