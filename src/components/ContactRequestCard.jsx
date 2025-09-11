import { useContext } from "react";
import styles from "./ContactRequestCard.module.css";
import { requestContext } from "../store/requestStore";

const ContactRequestCard = ({ request }) => {
  const { handlechange } = useContext(requestContext);
  const {
    name,
    email,
    city,
    mobile,
    message,
    createdAt,
    read,
    requestid,
  } = request;

  const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <div className={`${styles.card} ${read ? styles.success : styles.warning}`}>
      <div className={styles.cardBody}>
        <p className={styles.text}><strong>Name:</strong> {name}</p>
        <p className={styles.text}><strong>Email:</strong> {email}</p>
        <p className={styles.text}><strong>City:</strong> {city}</p>
        <p className={styles.text}><strong>Mobile:</strong> {mobile}</p>
        <p className={styles.text}><strong>Message:</strong> {message}</p>
        <p className={styles.date}>
          <small>Submitted on: {formattedDate}</small>
        </p>
        <button
          className={`${styles.badge} ${read ? styles.bgSuccess : styles.bgWarning} ${styles.button}`}
          onClick={() => handlechange(requestid)}
          type="button"
        >
          {read ? "Marked as read" : "Mark as Read"}
        </button>
      </div>
    </div>
  );
};

export default ContactRequestCard;