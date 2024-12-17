import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";
import blackLogo from "../assets/images/logo_black.svg";
import PhoneIcon from "../assets/icons/footer/phone";
import EnvelopIcon from "../assets/icons/footer/envelop";
import LocationIcon from "../assets/icons/footer/location";
import InstagramIcon from "../assets/images/icons/instagram";
// black logos for smaller screens
import PhoneIconBlack from "../assets/icons/footer/phoneBlack";
import EnvelopIconBlack from "../assets/icons/footer/envelopBlack";
import LocationIconBlack from "../assets/icons/footer/locationBlack";

const ContactUs = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PhoneIconComponent = isSmallScreen ? PhoneIconBlack : PhoneIcon;
  const EnvelopIconComponent = isSmallScreen ? EnvelopIconBlack : EnvelopIcon;
  const LocationIconComponent = isSmallScreen
    ? LocationIconBlack
    : LocationIcon;

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("function: submit new inquiry")
    
      const inquiryData = {
        firstName,
        lastName,
        email,
        phone,
        description,
      };
    
      const api = "http://localhost:5001/api/inquiry/newInquiry";
      console.log("API URL:", api)
      
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inquiryData),
        });
    
        if (response.ok) {
          console.log("respose was ok")
          const result = await response.json();
          console.log("Inquiry submitted successfully:", result);
          window.alert("Inquiry submitted successfully!");
        } else {
          console.error("Error submitting inquiry:", response.statusText);
          window.alert("There was an error submitting your inquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting inquiry:", error);
        window.alert("Something went wrong. Please try again later.");
      }
    
      // Clear all fields
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setDescription("");
    };
    

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer contactUsContainer">
        <div className="session ContactUsDiv">
          <h2 className="pageTitle"> /Contact </h2>
          <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
            Contact Us
          </h1>
          <p style={{ textAlign: "center", marginTop: "0px" }}>
            Any question or remarks? Just write us a message!
          </p>

          <div className="contactUsPage">
            {/* first div (left) */}
            <div className="contactInfo">
              <div>
                <h3>Contact Information</h3>
              </div>

              <div>
                <ul className="contactList">
                  <li>
                    <span>
                      <PhoneIconComponent className="icon" />
                    </span>
                    <span>+1 908-527-9734</span>
                  </li>
                  <li>
                    <span>
                      <EnvelopIconComponent className="icon" />
                    </span>
                    <span>acjautorepair@gmail.com</span>
                  </li>
                  <li>
                    <span>
                      <LocationIconComponent className="icon" />
                    </span>
                    <span>570 Maple Ave, Elizabeth, NJ 07202</span>
                  </li>
                </ul>
              </div>

              {/* social media */}
              <div>
                <ul>
                  <li>
                    <a>
                      <InstagramIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="contactMapSection">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.0638410507795!2d-74.2140532!3d40.650523099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24d4a42597c55%3A0xecff621093733150!2s570%20Maple%20Ave%2C%20Elizabeth%2C%20NJ%2007202!5e0!3m2!1sen!2sus!4v1733440849063!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
