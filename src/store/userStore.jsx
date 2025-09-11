import { createContext, useContext, useEffect, useState } from "react";
import getUsers from "../services/userService";
import { authContext } from "./authStore";
export const userContext = createContext({
  users: [],
  handlechange: () => {},
});
const UserContextProvider = ({ children }) => {
  const { handleuserProfile } = useContext(authContext);
  const [users, setusers] = useState([]);
  const addusers = (user) => {
    const users = [...user];
    setusers(users);
  };
  const handlechange = (id,status) => {
    fetch("https://serverofchefbooking.onrender.com/changeuserstatus", {
      credentials: "include",
      body: JSON.stringify({
        id,
        status,
      }),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 401) {
            handleuserProfile(false);
          }
          if (res.status === 404) {
            if (data.message === "Host not found") {
              handleuserProfile(false);
            } else {
              alert(data.message);
            }
          }
          if (res.status === 500) {
            throw new Error("Internal server error");
          }
          throw new Error("Failed to fetch authentication status");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          const updateduser = users.map((user) => {
            if (user.id == id) {
              return {
                ...user,
                status,
              };
            } else {
              return user;
            }
          });

          setusers(updateduser);
        }
      })
      .catch((err) => {
         console.error("Error during fetching request:", err);
          alert("An error occurred during fetching request. Please try again.");
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getUsers(signal)
      .then((user) => {
        addusers(user);
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
    <userContext.Provider value={{ users, handlechange }}>
      {children}
    </userContext.Provider>
  );
};
export default UserContextProvider;
