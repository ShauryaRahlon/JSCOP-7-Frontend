import React, { useRef, useState } from "react";
import "./RegisterForm.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import qr from "../../assets/qrimage/qr.jpeg";
import Loadingspinner from "./Loadingspinner";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enroll: "",
    batch: "",
    branch: "",
    college: "",
    enrollmentType: "",
  });
  const [loading, setLoading] = useState(false);
  const [clg, setclg] = useState("");
  const formRef = useRef(null);
  const [changeField, setChangeField] = useState(1);
  const [image, setImage] = useState([]);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    enroll: "",
    batch: "",
    branch: "",
    college: "",
    screenshot: "",
    enrollmentType: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // if (name == "clg" && value == "others") {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: "",
    //   }));
    //   setclg("others");
    //   setChangeField(0);

    //   return;
    // }
    if (name == "clg" && (value == "JIIT-62" || value == "JIIT-128")) {
      setclg(value);
      setFormData((prevData) => ({
        ...prevData,
        college: value,
      }));
      return;
      // setclg("others");
      setChangeField(0);
      // setChangeField(0);
      // return;
    } else if (name == "clg" && value == "others") {
      setclg("others");
      setFormData((prevData) => ({
        ...prevData,
        college: "",
      }));
      return;
    }
    console.log("name: ", name, "value: ", value);
    // if (name != "clg") {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // }
  };

  const checkEmailExists = async (email) => {
    try {
      //write code for checking email existance
    } catch (error) {
      console.error("Error checking email existence: ", error);
      // Log the specific error for better debugging
      //   toast.error("Error checking email existence. See console for details", {
      //     position: toast.POSITION.TOP_CENTER,
      //     className: "custom-toast-error",
      //   });
      return false; // Assume email doesn't exist in case of an error
    }
  };

  const handleImage = (f) => {
    const file = f.target.files[0];
    setFileToBase(file);
    if (file.size > 1000000) {
      alert("File size is too large, please upload a file less than 1MB");
    }
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    // console.log("formdata is : ", formData);
    // Perform form validation
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.college.trim()) {
      errors.college = "College name is required";
    }
    // if (!formData.batch.trim()) {
    //   errors.batch = "Batch is required";
    // }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (image.length == 0) {
      errors.screenshot = "Screenshot of payment is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }
    if (
      !formData.enroll.trim() &&
      (formData.college === "JIIT-62" || formData.college === "JIIT-128")
    ) {
      errors.enroll = "Enrollment number is required";
    }
    if (
      !formData.enrollmentType.trim() &&
      (formData.college === "JIIT-62" || formData.college === "JIIT-128")
    ) {
      errors.enrollmentType = "Enrollment Type is required";
    }
    if (
      !formData.branch.trim() &&
      (formData.college === "JIIT-62" || formData.college === "JIIT-128")
    ) {
      errors.branch = "Branch is required";
    }
    if (
      //!/^(A[1-7]|B[1-9]|B1[0-4]|C[1-9]|b[1-9]|b1[0-4]|a[1-7]|c[1-9]|F[1-9]|f[1-9]|E[1-9]|e[1-9])$/.test(formData.batch) &&
      !formData.batch.trim() &&
      (formData.college === "JIIT-62" || formData.college === "JIIT-128")
    ) {
      errors.batch = "Batch is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", formData);
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        // toast.error(`User Already Registered`, {
        //   position: toast.POSITION.TOP_CENTER,
        //   className: "custom-toast-error",
        // });
        return;
      }

      // const formDataObj = {
      //   data: formData,
      // };
      const Img = {
        image: image,
      };
      const Final = {
        ...formData,
        ...Img,
      };
      console.log(Final);

      setLoading(true);

      try {
        // let response = await fetch(
        //   "https://temp-jscop-backend-74c1d15b652d.herokuapp.com/api/register-new",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json;charset=utf-8",
        //     },
        //     body: JSON.stringify(Final),
        //   }
        // );

        // let result = await response.json();
        let result = await axios.post(
          `https://backend.jiitopticachapter.com/api/register-new`,
          Final
        );
        console.log(" result is ", result);
        setFormData(formData);
        if (result.status == 201) {
          console.log("done!!!");

          toast.success("Registration Completed");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        if (error?.response?.data?.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("Something went wrong. Please try again");
        }
        // console.error("Error during register:", error);
        // toast.error("An error occured during registration");
      } finally {
        setLoading(false); // Set loading state back to false after registration attempt
        console.log("loading : ", loading);
      }

      //reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        enroll: "",
        batch: "",
        branch: "",
        college: "",
        clgname: "",
        enrollmentType: "",
      });
      setclg("");
      setImage([]);
    }
  };
  return (
    <>
      <ToastContainer />
      <Loadingspinner show={loading} />
      <div className="registerr-header">Register Now</div>
      <div className="RegistrationPage">
        <div className="RegistrationPageSection">
          <div className="regisGuidelineSection">
            <div className="GuidelineContainer">
              <div className="RegistrationPageHeader">
                <div className="RegistrationPageHeaderSectionHeader_text">
                  <div className="RegistrationPageHeaderSectionHeader_text_text-content">
                    Guidelines For JSCOP 6.0
                  </div>
                  <div className="RegistrationPageHeaderUnderline"></div>
                </div>
              </div>
              <div className="regisGuidelines">
                {/* <p>Rules for JSCOP 6.0 are as follow :</p>
                <br /> */}

                <div
                  style={{ textAlign: "center" }}
                  className="regis-sub-heading"
                >
                  General Instructions
                </div>

                <ol style={{ listStyleType: "decimal" }}>
                  <li style={{ textAlign: "justify" }}>
                    The registration charges asked during the registration is
                    for the lunch and refreshments which will be provided on the
                    day of the event.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    There are limited registrations only for the lunch and
                    refreshments, forms may close anytime.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    Individual event registration are free of cost and can be
                    done from Event section at the home page.
                  </li>

                  {/* </ol> */}
                  <br />

                  <div
                    style={{ textAlign: "center" }}
                    className="regis-sub-heading"
                  >
                    Registration Process Details
                  </div>

                  {/* <ol style={{ listStyleType: "decimal" }}> */}
                  <li style={{ textAlign: "justify" }}>
                    Fill the form correctly, make the payment of Rs 70/- only by
                    scanning the QR given below of the account holder named
                    Mridul Saraswat.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    Fill the details accurately, make the payment and than
                    attach a screenshot of the payment with visible time, date
                    and the name of the sender in it. In case, if these details
                    are not present your registration will not be accepted.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    After the form is submitted, within 24 hours you will get a
                    confirmation mail of the payment recieved and an a QR
                    attached with it.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    The QR is the Lunch coupon which will be required at the
                    mess.
                  </li>
                  <li style={{ textAlign: "justify" }}>
                    Timeline and events can be viewed at the home page.
                  </li>
                  {/* <li style={{ textAlign: "justify" }}>
                    In case of any technical glitch or not receiving the
                    confirmation mail. You can contact - Mridul Saraswat :
                    8923969236
                  </li> */}
                  <li style={{ textAlign: "justify" }}>
                    In case you have any query or do not receive any
                    confirmation within next 24 hours you can contact us on
                    whatsapp : 8923969236 or through mail :
                    opticastudentchapterjiit@gmail.com
                  </li>
                </ol>
                <br />
                <div
                  style={{ textAlign: "center" }}
                  className="regis-sub-heading"
                >
                  QR CODE
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={qr}
                    style={{ height: "200px", paddingBottom: "16px" }}
                    alt="qr code"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="regis">
            <div className="RegistrationPageHeader">
              <div className="RegistrationPageHeaderSectionHeader_text">
                <div className="RegistrationPageHeaderSectionHeader_text_text-content">
                  Registration Form
                </div>
                <div className="RegistrationPageHeaderUnderline"></div>
              </div>
            </div>

            <form
              ref={formRef}
              //   initial={{ opacity: 0 }}
              //   whileInView={{ opacity: 1 }}
              //   transition={{ duration: 1.5, delay: 0.3 }}
              //   viewport={{ once: true }}
              className="registration-form"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label htmlFor="name">
                  Name <span className="registernecessary"> * </span>:
                </label>
                <input
                  className="reginput"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleInputChange}
                />
                <p className="error">{formErrors.name}</p>
              </div>

              <div>
                <label htmlFor="email">
                  Email <span className="registernecessary"> * </span>:
                </label>
                <input
                  className="reginput"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <p className="error">{formErrors.email}</p>
              </div>

              <div>
                <label htmlFor="phone">
                  Phone <span className="registernecessary"> * </span>:
                </label>
                <input
                  className="reginput"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <p className="error">{formErrors.phone}</p>
              </div>

              {/* <div>
                <label htmlFor="age">Age:</label>
                <input
                  className="reginput"
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <p className="error">{formErrors.age}</p>
              </div>
              <div>
                <label htmlFor="gender">Gender:</label>
                <select
                  className="reginput"
                  id="gender"
                  name="gender"
                  placeholder="Select Gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                  <option value="Perfer Not To Say">Prefer Not to Say</option>
                </select>
                <p className="error">{formErrors.gender}</p>
              </div> */}

              <div>
                <label htmlFor="college">
                  College <span className="registernecessary"> * </span> :
                </label>

                <select
                  className="reginput"
                  id="clg"
                  name="clg"
                  value={clg}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    color: "#ffffff",
                    background: "rgba(33, 13, 51, 0.7)",
                    border: "1px solid rgba(141, 92, 255, 0.3)",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: "'Exo 2', sans-serif",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    appearance: "none", /* Removes default browser styling */
                    WebkitAppearance: "none", /* For Safari */
                    MozAppearance: "none" /* For Firefox */
                  }}
                >
                  <option value="" disabled style={{ background: "rgba(33, 13, 51, 0.9)", color: "white", margin: "10px" }}>
                    Select College
                  </option>
                  <option value={`JIIT-62`} style={{ background: "rgba(33, 13, 51, 0.9)", color: "white" }}>JIIT-62</option>
                  <option value={`JIIT-128`} style={{ background: "rgba(33, 13, 51, 0.9)", color: "white" }}>JIIT-128</option>
                  <option value={`others`} style={{ background: "rgba(33, 13, 51, 0.9)", color: "white" }}>others</option>
                </select>

                {/* Custom dropdown arrow */}
                <div style={{
                  position: "relative",
                  top: "-47px", /* Adjust based on your select height */
                  right: "10px",
                  float: "right",
                  pointerEvents: "none",
                  fontSize: "16px",
                  color: "white"
                }}>
                  ▼
                </div>

                {clg === `others` ? (
                  <div style={{ display: "flex", marginTop: "-10px" }}>
                    <input
                      className="reginput"
                      type="text"
                      id="college"
                      name="college"
                      placeholder="Enter your college name"
                      value={formData.college}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  ""
                )}
                <p className="error">{formErrors.college}</p>
              </div>
              {/* <label htmlFor="phone">
                Enrollment Type <span className="registernecessary"> * </span>:
              </label> */}
              {formData.college === "JIIT-62" ||
                formData.college === "JIIT-128" ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      {" "}
                      <label
                        style={{ display: "flex", alignItems: "center" }}
                        htmlFor="dayscholar"
                      >
                        <input
                          type="radio"
                          id="dayscholar"
                          name="enrollmentType"
                          value="dayScholar"
                          // checked={formData.enrollmentType === "day_scholar"}
                          onChange={handleInputChange}
                        />
                        &nbsp; Day Scholar &nbsp;
                      </label>
                    </div>
                    &nbsp; &nbsp;
                    <div>
                      {" "}
                      <label
                        style={{ display: "flex", alignItems: "center" }}
                        htmlFor="hosteller"
                      >
                        <input
                          type="radio"
                          id="hosteller"
                          name="enrollmentType"
                          value="hosteller"
                          // checked={formData.enrollmentType === "day_scholar"}
                          onChange={handleInputChange}
                        />
                        &nbsp; Hosteller &nbsp;
                      </label>
                    </div>
                  </div>
                  <p className="error">{formErrors.enrollmentType}</p>

                  <div>
                    <label htmlFor="enroll">
                      Enrollment Number
                      <span className="registernecessary"> * </span>:
                    </label>
                    <input
                      className="reginput"
                      type="text"
                      id="enroll"
                      name="enroll"
                      placeholder="Enter your Enrollment number"
                      value={formData.enroll}
                      onChange={handleInputChange}
                    />
                    <p className="error">{formErrors.enroll}</p>
                  </div>

                  <div>
                    <label htmlFor="batch">
                      Batch <span className="registernecessary">* </span> :
                    </label>
                    <input
                      className="reginput"
                      type="text"
                      id="batch"
                      name="batch"
                      placeholder="Enter your batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                    />
                    {/* <select
                  className="reginput"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  style={{ width: "120px" }}
                >
                  <option value="" disabled>
                    Select Batch
                  </option>
                  
                  {[...Array(14)].map((_, index) => (
                    <option key={`batch-${index + 1}`} value={`B${index + 1}`}>
                      B{index + 1}
                    </option>
                  ))}
                </select> */}
                    <p className="error">{formErrors.batch}</p>
                  </div>

                  <div>
                    <label htmlFor="branch">
                      Branch <span className="registernecessary"> * </span>:
                    </label>
                    <input
                      className="reginput"
                      type="text"
                      id="branch"
                      name="branch"
                      placeholder="Enter your branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                    />
                    <p className="error">{formErrors.branch}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div>
                <label htmlFor="screenshot">
                  Upload Screenshot of Payment
                  <span className="registernecessary">* </span>:
                </label>

                <div style={{
                  position: "relative",
                  marginBottom: "15px"
                }}>
                  {/* Hidden actual file input */}
                  <input
                    className="reginput2"
                    type="file"
                    id="screenshot"
                    name="screenshot"
                    value={formData.screenshot}
                    onChange={handleImage}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      zIndex: 2
                    }}
                  />

                  {/* Custom styled button */}
                  <div style={{
                    background: "rgba(33, 13, 51, 0.7)",
                    color: "#ffffff",
                    border: "1px solid rgba(141, 92, 255, 0.3)",
                    borderRadius: "6px",
                    padding: "12px 15px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "'Exo 2', sans-serif",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease"
                  }}>
                    <div style={{
                      marginRight: "10px",
                      fontSize: "16px"
                    }}>
                      📎
                    </div>
                    <div>
                      {formData.screenshot ? formData.screenshot.split('\\').pop() : "Choose file..."}
                    </div>
                  </div>
                </div>

                <p className="error">{formErrors.screenshot}</p>
              </div>

              {/* <div className="form-group">
                <label>Days you will be attending the fest:</label>
                <div className="checkbox-group">
                  <label className="dayylab">
                    <div className="dareg">
                      <li className="reglist">Day 1</li>
                    </div>
                    <input
                      className="dayregi"
                      type="checkbox"
                      name="checkboxes"
                      value="option1"
                      checked={formData.checkboxes.option1}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="checkbox-group">
                  <label className="dayylab">
                    <div className="dareg">
                      <li className="reglist">Day 2</li>
                    </div>
                    <input
                      className="dayregi"
                      type="checkbox"
                      name="checkboxes"
                      value="option2"
                      checked={formData.checkboxes.option2}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="checkbox-group">
                  <label className="dayylab">
                    <div className="dareg">
                      <li className="reglist">Day 3</li>
                    </div>
                    <input
                      className="dayregi"
                      type="checkbox"
                      name="checkboxes"
                      value="option3"
                      checked={formData.checkboxes.option3}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <p className="error">{formErrors.checkboxes}</p>
              </div> */}

              <div className="heyreg">
                <button className="regbtn" onClick={handleFormSubmit}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
