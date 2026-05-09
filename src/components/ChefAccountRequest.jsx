import React, { use, useContext, useEffect } from "react";
import { ChefsStore } from "../store/ChefdataStore";
import { authContext } from "../store/authStore";
import { BACKEND_URL } from "../config";
export default function ChefAccountRequest() {
  const {setChefAccountRequests,chefAccountRequests} = useContext(ChefsStore);
  const { handleuserProfile } = useContext(authContext);
  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;
    fetch(`${BACKEND_URL}/getAllChefAccountRequest`, {
      credentials: "include",
      method: "GET",
       signal,
    
    })
      .then(async (res) =>{ 
        const data= await res.json();
        if (!res.ok) {
          if (res.status === 401) {
            alert(data.message);
            console.log(data);
            handleuserProfile(data.isLoggedIn);
            return null;
          }
          else if(res.status===500){
            alert(data.message);
            return null;
          }
          throw new Error("Failed to fetch chef account requests");
          
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          setChefAccountRequests(data.chefRequests);
        }
      })
      .catch((err) => {
        console.error("Error fetching chef account requests:", err);
      });
      return () => {
      controller.abort();
    };
  },[]);
  return (
    <div>
      <h1>Chef Account Requests</h1>
      {/* Content for chef account requests goes here */}
    </div>
  );
};