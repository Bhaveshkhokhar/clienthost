import { useContext } from "react";
import styles from "./Chefcard.module.css";
import { Link } from "react-router-dom";
import { ChefsStore } from "../store/ChefdataStore";
const Chefcard = ({ chef }) => {
  const{changeAvailability}=useContext(ChefsStore);
  const filledStars = Math.floor(chef.rating);
  const hasHalfStar =chef.rating - filledStars >= 0.25 && chef.rating - filledStars < 0.75;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  return (
    <>
        <div
          className="card"
          style={{
            width: "230px",
            height: "430px",
            background: "#e0e7ff",
            margin: "20px",
          }}
        >
          <img
            style={{maxWidth:"100%",maxHeight:"170px"}}
            src={`https://serverofchefbooking.onrender.com${chef.pic}`}
            className="card-img-top"
            alt={chef.name}
          />
          <div className="card-body" style={{ textAlign: "left" }}>
            <h6 className="card-title">{chef.name}</h6>
            <div className="card-text">
              <p style={{ margin: "2px" }}>Mobile: {chef.number}</p>
              <p style={{ margin: "2px" }}>Speciality: {chef.speciality}</p>
              <p style={{ margin: "2px" }}>Service: {chef.type}</p>
              <p style={{ margin: "2px" }}>
                {"★".repeat(filledStars)}
                {hasHalfStar && "⯪"}
                {/* or use ⯪, or 🌓 for half-filled simulation */}
                {"☆".repeat(emptyStars)}
                <span className="text-muted small"> {chef.rating}</span>
              </p>
              <li className={`${chef.available ? styles["green"] : styles["red"]}`}>
                {chef.available ? "Available" : "Not Available"}
              </li>
              
              <button className={`btn ${styles["button"]}`} onClick={()=>{changeAvailability(chef.id,chef.available)}}>
                Change Availability
              </button>
            </div>
          </div>
        </div>
    </>
  );
};
export default Chefcard;
