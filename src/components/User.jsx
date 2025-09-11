import { useContext } from "react";
import style from "./Users.module.css";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { userContext } from "../store/userStore";
const Users = () => {
  const { users, handlechange } = useContext(userContext);
  return (
    <>
      <div style={{ margin: "5px" }}>
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th scope="col">User name</th>
                <th scope="col">email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Gender</th>
                <th scope="col">Profile Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img
                      width="30px"
                      height="30px"
                      style={{ borderRadius: "30px", marginRight: "2px" }}
                      src={`https://serverofchefbooking.onrender.com${user.image}`}
                      alt="user"
                    ></img>
                    <span>{user.name}</span>
                  </th>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "white",
                        color: user.status?"green":"red",
                      }}
                      onClick={() => {
                        handlechange(user.id, !user.status);
                      }}
                    >
                      {user.status?<FaLockOpen />:<FaLock />}
                    </button>
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
export default Users;
