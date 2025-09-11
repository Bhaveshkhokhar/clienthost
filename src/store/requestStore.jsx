import { createContext, useContext, useEffect, useState } from "react";
import getContactRequests from "../services/requestService";
import { authContext } from "./authStore";
export const requestContext = createContext({
  requests: [],
  handlechange: () => {},
});
const RequestContextProvider = ({ children }) => {
  const { handleuserProfile } = useContext(authContext);
  const [requests, setrequests] = useState([]);
  const addrequests = (req) => {
    const request = [...req];
    setrequests(request);
  };
  const handlechange = (id) => {
    fetch("https://serverofchefbooking.onrender.com/read", {
      credentials: "include",
      body: JSON.stringify({
        id,
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
          const req = requests.map((request) => {
            if (request.requestid == id) {
              return {
                ...request,
                read: true,
              };
            } else {
              return request;
            }
          });

          setrequests(req);
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
    getContactRequests(signal)
      .then((requests) => {
        addrequests(requests);
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
    <requestContext.Provider value={{ requests, handlechange }}>
      {children}
    </requestContext.Provider>
  );
};
export default RequestContextProvider;
