import style from "./Dashboard.module.css";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { bookingContext } from "../store/bookingStore";
import { ChefsStore } from "../store/ChefdataStore";
import { userContext } from "../store/userStore";
const Dashboard = () => {
  const { chefs } = useContext(ChefsStore);
  const { users } = useContext(userContext);
  const noOfChef = chefs.length;
  const { bookings, cancelBooking } = useContext(bookingContext);
  const noOfBooking = bookings.length;
  const noOfUser = users.length;
  const data = bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <>
      <div style={{ margin: "5px" }}>
        <div className={style.boxes}>
          <Link to="/chefs" className={style.link}>
            <div className={style.data}>
              <img style={{width:"90px"}} src="https://serverofchefbooking.onrender.com/pic_chef.png" alt="Chef" />
              <span>{noOfChef} Chefs</span>
            </div>
          </Link>
          <Link to="/bookings" className={style.link}>
            <div className={style.data}>
              <img className={style.dataimg} src="https://serverofchefbooking.onrender.com/bookingpic.png" alt="Booking" />
              <span>{noOfBooking} Booking</span>
            </div>
          </Link>
          <Link to="/users" className={style.link}>
            <div className={style.data}>
              <img className={style.dataimg} src="https://serverofchefbooking.onrender.com/defaultpic.png" alt="User" />
              <span>{noOfUser} User</span>
            </div>
          </Link>
        </div>
        {data.length ? (
          <div className={style.tableWrapper}>
            <table className={style.table}>
              <thead>
                <tr border="">
                  <th colSpan="5">Latest Booking</th>
                </tr>
                <tr>
                  <td colSpan="5" style={{ padding: 0 }}>
                    <hr
                      style={{
                        margin: 0,
                        border: "none",
                        borderTop: "2px solid #e0e7ff",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">User name</th>
                  <th scope="col">Chef</th>
                  <th scope="col">Fees</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((booking, index) => (
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
                      {booking.status === "cancelled" && <span style={{color:"red"}}>Cancelled</span>}
                      {booking.status === "Completed" && <span style={{color:"green"}}>Completed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <center>
            <h2 style={{ color: "#3B6DCE", marginTop: "50px" }}>
              <u>NO BOOKING TILL NOW</u>
            </h2>
          </center>
        )}
      </div>
    </>
  );
};
export default Dashboard;
