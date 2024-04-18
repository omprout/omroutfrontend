import React, { useEffect, useState } from "react";
import "./Contact.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/slice";
import { ThreeDots } from "react-loader-spinner";

const Contact = () => {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.portfolio.data);
  const contactLoader = useSelector((state) => state.portfolio.isLoading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [textarea, setTextarea] = useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleclick = () => {
    setIsClicked(!isClicked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Messege send successfully");
    try {
      const response = await fetch("/api/email/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          text,
          textarea,
        }),
      });
      console.log(response);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setName("");
        setEmail("");
        setText("");
        setTextarea("");
        setIsClicked(false);
        setShowSuccessMessage(false);
      }, 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setName(name);
    setEmail(email);
    setText(text);
    setTextarea(textarea);
  };

  if (contactLoader === true) {
    return (
      <div className="contact2">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#ffff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  if (
    !contactData ||
    !contactData.contact ||
    contactData.contact.length === 0
  ) {
    return <div className="contact2">No data available</div>;
  }

  const { address, phone, description, emailID, website } = contactData.contact[0];

  return (
    <div className="contact">
      <div className="contactHeading">
        <span className="subHeading">CONTACT US</span>
        <h2 className="heading">Have a Project?</h2>
        <p className="contactParagraph">{description}</p>
      </div>
      {/* ################################################################# */}
      <div className="contactMe">
        <form onSubmit={handleSubmit}>
          <div className="contactField">
            <div className="nameEmail">
              <input
                type="text"
                className="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              className="subject"
              placeholder="Subject"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <textarea
              className="custom-textarea"
              name=""
              id=""
              cols="6"
              rows="5"
              placeholder="Message"
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              required
            ></textarea>
            {showSuccessMessage && (
              <Stack
                sx={{ width: "100%", marginTop: "1rem", textAlign: "center" }}
                spacing={2}
              >
                <Alert variant="filled" severity="success">
                  Message sent successfully.
                </Alert>
              </Stack>
            )}
            <input
              type="submit"
              onClick={handleclick}
              value="Send Message"
              className={isClicked ? "btn clicked" : "btn"}
            />
          </div>
        </form>
        <div className="myAddress">
          <div className="myAddresses">
            <div className="icons">
              <FaLocationDot />
            </div>
            <p>
              {" "}
              <span>Address:</span>
              {address}
            </p>
          </div>
          <div className="myAddresses">
            <div className="icons">
              <FaPhone />
            </div>
            <p>
              <span>Phone:</span>
              {phone}
            </p>
          </div>
          <div className="myAddresses">
            <div className="icons">
              <MdEmail />
            </div>
            <p>
              <span>Email:</span>
              {emailID}
            </p>
          </div>
          <div className="myAddresses">
            <div className="icons">
              <RiGlobalLine />
            </div>
            <p>
              <span>Website:</span>
              {website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};




export default Contact;
