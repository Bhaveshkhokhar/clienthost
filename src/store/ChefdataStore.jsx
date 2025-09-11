import { createContext, useEffect, useState } from "react";
import { getTheChefs } from "../services/chefService";
import { useContext } from "react";
import { authContext } from "./authStore";
export const ChefsStore = createContext({
  chefs: [],
  changeAvailability: () => {},
  addchef: () => {},
});
const ChefProvider = ({ children }) => {
  const { handleuserProfile } = useContext(authContext);
  const [chefs, setchefs] = useState([]);
  const addchef = (data) => {
    const updatechefs = [...chefs, data];
    setchefs(updatechefs);
  };
  const handelesetchefs = (chefs) => {
    let Chefs = [...chefs];
    setchefs(Chefs);
  };
  const changeAvailability = (id, flag) => {
    fetch("https://serverofchefbooking.onrender.com/hostchefchangeavailablity", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        id,
        flag: !flag,
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
          }
          if (res.status === 404) {
            if (data.message === "Host not found") {
              handleuserProfile(false);
            }
          }
          if (res.status === 500) {
            throw new Error("Internal server error");
          }
          throw new Error("Failed to update status");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          const updatedChefs = chefs.map((chef) => {
            if (chef.id == id) {
              return {
                ...chef,
                available: !flag,
              };
            } else {
              return chef;
            }
          });

          setchefs(updatedChefs);
        }
      })
      .catch((err) => {
        console.error("Error during updating chef availability:", err);
        alert(
          "An error occurred during updating chef availability. Please try again."
        );
      });
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getTheChefs(signal)
      .then((chefs) => {
        handelesetchefs(chefs);
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
    <ChefsStore.Provider value={{ chefs, changeAvailability, addchef }}>
      {children}
    </ChefsStore.Provider>
  );
};
export default ChefProvider;
