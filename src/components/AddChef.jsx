import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AddChef.module.css";
import { useState, useRef } from "react";
import { ChefsStore } from "../store/ChefdataStore";
import { authContext } from "../store/authStore";
const AddChef = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(null);
  const { handleuserProfile } = useContext(authContext);
  const { addchef } = useContext(ChefsStore);
  const [previewImg, setPreviewImg] = useState(
    `https://serverofchefbooking.onrender.com/defaultpic.jpg`
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const Number = useRef();
  const Password = useRef();
  const Available=useRef();
  const Name = useRef();
  const Price = useRef();
  const Type = useRef();
  const Speciality = useRef();
  const Bio = useRef();
  const Certifications = useRef();
  const Experience = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Number", Number.current.value);
    formData.append("Password", Password.current.value);
    formData.append("Name", Name.current.value);
    formData.append("Price", Price.current.value);
    formData.append("Available", available);
    formData.append("Type", Type.current.value);
    formData.append("Speciality", Speciality.current.value);
    formData.append("Bio", Bio.current.value);
    formData.append("Certifications", Certifications.current.value);
    formData.append("Experience", Experience.current.value);
    formData.append("image", selectedFile);
    fetch("https://serverofchefbooking.onrender.com/addChefData", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 422) {
            alert(data.message);
            if (data.field === "Name") {
              Name.current.focus();
            } else if (data.field === "Number") {
              Number.current.focus();
            } else if (data.field === "Password") {
              Password.current.focus();
            } else if (data.field === "Price") {
              Price.current.focus();
            } else if (data.field === "Available") {
              Available.current.focus();
            } else if (data.field === "Type") {
              Type.current.focus();
            } else if (data.field === "Speciality") {
              Speciality.current.focus();
            } else if (data.field === "Bio") {
              Bio.current.focus();
            } else if (data.field === "Certifications") {
              Certifications.current.focus();
            } else if (data.field === "Experience") {
              Experience.current.focus();
            } else {
              fileInputRef.current.focus();
            }
            return;
          } else if (res.status == 401) {
            handleuserProfile(false);
            return;
          } else if (res.status == 404) {
            if (data.message === "Host not found") {
              handleuserProfile(false);
            } else {
              fileInputRef.current.focus();
            }
            return;
          } else if (res.status == 500) {
            alert(data.message);
            return;
          }
          else if (res.status == 409) {
            alert(data.message);
            return;
          }
          throw new Error("adding data failed");
        }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (data.status === "success") {
          addchef({
            number: Number.current.value,
            id: data._id,
            pic: data.profileImage,
            name: Name.current.value,
            available: available,
            type: Type.current.value,
            rating: 0,
            price: Price.current.value,
            speciality: Speciality.current.value,
            bio: Bio.current.value,
            experience: Experience.current.value,
            certifications: Certifications.current.value,
          });
          alert("chef added");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error during adding data:", err);
        alert("An error occurred during uploading. Please try again.");
      });
  };
  return (
    <div className={style.formWrapper}>
      <form
        className={style.form}
        onSubmit={(e) => {
          handlesubmit(e);
        }}
      >
        <center>
          <img
            src={previewImg}
            alt=""
            className={`rounded-circle mb-3 ${style.profileImage}`}
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="form-control mb-4"
            style={{
              maxWidth: "250px",
              background: "white",
              border: "1.5px solid black",
              borderRadius: "8px",
              color: "",
              fontWeight: 500,
            }}
            onChange={handleFileChange}
            required
          />
        </center>
        <div className={style.formGroup}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" ref={Name} required />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="number">Mobile Number</label>
          <input id="number" type="text" name="number" ref={Number} required />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={Password}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">Price</label>
          <input id="price" type="text" name="price" ref={Price} required />
        </div>

        <div className={style.formGroup}>
          <label>Availability</label>
          <div>
            <input
              id="available"
              type="radio"
              name="availability"
              value="true"
              required
              checked={available === "true"}
              ref={Available}
              onChange={(e) => setAvailable(e.target.value)}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="available" style={{ marginRight: "20px" }}>
              Available
            </label>

            <input
              id="notAvailable"
              type="radio"
              name="availability"
              value="false"
              required
              checked={available === "false"}
              onChange={(e) => setAvailable(e.target.value)}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="notAvailable">Not Available</label>
          </div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            required
            className="form-select"
            ref={Type}
          >
            <option value="">-- Select Type --</option>
            <option value="One-Time Service">One-Time Service</option>
            <option value="Chef's Table">Chef's Table</option>
            <option value="Chef for Party">Chef for Party</option>
            <option value="Chef Subscription">Chef Subscription</option>
          </select>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="speciality">Speciality</label>
          <input
            id="speciality"
            type="text"
            name="speciality"
            ref={Speciality}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea rows="4" id="bio" name="bio" ref={Bio} required />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="certifications">Certifications</label>
          <input
            id="certifications"
            type="text"
            name="certifications"
            ref={Certifications}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="experience">Experience</label>
          <input
            id="experience"
            type="text"
            name="experience"
            ref={Experience}
            required
          />
        </div>

        <button type="submit" className={style.submitBtn}>
          Add Chef
        </button>
      </form>
    </div>
  );
};

export default AddChef;
