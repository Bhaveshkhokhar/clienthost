import { useContext } from "react";
import ContactRequestCard from "./ContactRequestCard";
import { requestContext } from "../store/requestStore";
import styles from "./Contactrequests.module.css"
const ContactRequest = () => {
  const { requests } = useContext(requestContext);
  if(requests.length===0){
    return (
      <>
        <center>
          <h2 style={{ color: "#3B6DCE", marginTop: "50px" }}>
            <u>NO CONTACT REQUEST TILL NOW</u>
          </h2>
        </center>
      </>
    );
  }
  return (
    <div className={`${styles["contactRequestsContainer"]}`}>
      {requests.map((req) => (
        <ContactRequestCard key={req.requestid} request={req} />
      ))}
    </div>
  );
};
export default ContactRequest;