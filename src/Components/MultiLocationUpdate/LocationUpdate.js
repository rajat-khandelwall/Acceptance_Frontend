import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Tooltip,
} from "@mui/material";

import companyLogo from "../../Images/Vwits Logo.jpeg";
import departmentLogo from "../../Images/Skoda Logo.png";
import volkswagen from "../../Images/Volks.jpg";
import audi from "../../Images/Audi.jpg";
import Chattanoga from "../../Images/Chattanooga.png";
import SouthAfrica from "../../Images/SouthAfrica.png";
import savwipl from "../../Images/Savwipl.jpg";

import "react-toastify/dist/ReactToastify.css";
import CostingTable from "./CostingTable";
import MemberBillingDetails from "./MemberBillingDetails";
import DeclarationCheckbox from "./DeclarationCheckbox";
import { ApiService } from "../../Services/ApiService";
import { FormDataServiceLocation } from "../../Services/FormDataServiceLocation";

const LocationUpdate = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [agreementNumbers, setAgreementNumbers] = useState([]);
  const [brand, setBrand] = useState("");
  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [isLocationDisabled, setIsLocationDisabled] = useState(true);
  const [isAgreementNo, setIsAgreementNo] = useState(true);
  const [agreementNumber, setAgreementNumber] = useState([]);
  const [justification, setJustification] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [billingError, setBillingError] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const handleBillingError = (errorMsg) => {
    setBillingError(errorMsg);
  };

  const isSubmitDisabled = () => {
    return billingError !== "";
  };

  useEffect(() => {
    fetchAgreementNumbers();
  }, [brand]);

  const fetchAgreementNumbers = async () => {
    try {
      const response = await ApiService.fetchAgreementNumbers(brand);
      setAgreementNumbers(response);
    } catch (error) {
      console.error("Error fetching agreement numbers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setBrand(value);
      if (isDateDisabled == true) setIsDateDisabled(false);
      else {
        setFormData(FormDataServiceLocation.getFormData());
        setBrand(value);
      }
    }
    if (name === "generatedDate") {
      if (isLocationDisabled == true) setIsLocationDisabled(false);
      else
        fetchFormDataFromApi(brand, value, agreementNumber, formData.location);
    }
    if (name === "location") {
      if (isAgreementNo == true) setIsAgreementNo(false);
      else
        fetchFormDataFromApi(
          brand,
          formData.generatedDate,
          agreementNumber,
          value
        );
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (formData) => {
    try {
      console.log(formData);
      await ApiService.updateBillingLocation(formData);
      navigate("/response-recorded");
      await ApiService.updateReportsLocation(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAgreementNumberChange = async (e, selectedDate) => {
    const value = e.target.value;
    const location = formData.location;
    setAgreementNumber(value);
    fetchFormDataFromApi(brand, selectedDate, value, location);
  };

  const fetchFormDataFromApi = async (
    brand,
    generatedDate,
    agreementNumber,
    location
  ) => {
    try {
      const agreementData = await ApiService.fetchAgreementLocationData(
        agreementNumber,
        generatedDate,
        location
      );
      setFormData((prevData) => ({
        ...prevData,
        ...agreementData,
      }));
      setJustification(agreementData.justification);
    } catch (error) {
      console.error("Error fetching agreement data:", error);
    }
  };

  // const handleBannerClose = () => {
  //   setShowBanner(false);
  // };

  useEffect(() => {
    setFormData(FormDataServiceLocation.getFormData());
  }, []);

  return (
    <>
      {showBanner && (
        <div style={bannerStyle}>
          <span>
            This module is just for updation of Acceptance billing of those
            projects whose team is present on Multiple locations.<br></br>For
            updation, just select{" "}
            <b>Brand, Its Generated Date, Location then Agreement number!</b>
          </span>
          {/* <button style={closeButtonStyle} onClick={handleBannerClose}>
            &times;
          </button> */}
        </div>
      )}
      <div style={{ marginTop: showBanner ? "80px" : "20px" }}></div>
      <form>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            margin: "20px auto",
            textAlign: "center",
            maxWidth: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            border: "2px solid rgb(103,1,59,255)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={companyLogo}
              alt="Company Logo"
              style={{ height: "80px", marginRight: "auto" }}
            />
            <Typography
              variant="h3"
              gutterBottom
              style={{ fontFamily: "-moz-initial" }}
            >
              Acceptance Criteria
            </Typography>

            {brand === "Volkswagen" ? (
              <img
                src={volkswagen}
                alt="Volkswagen Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            ) : brand === "Audi" ? (
              <img
                src={audi}
                alt="Audi Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            ) : brand === "VW-South Africa" ? (
              <img
                src={SouthAfrica}
                alt="South Africa Logo"
                style={{
                  height: "90px",
                  marginLeft: "auto",
                  marginTop: "20px",
                }}
              />
            ) : brand === "VW-Chattanoga" ? (
              <img
                src={Chattanoga}
                alt="Chattanoga Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            ) : brand === "SAVWIPL" ? (
              <img
                src={savwipl}
                alt="Savwipl Logo"
                style={{
                  height: "60px",
                  marginLeft: "auto",
                  padding: "25px",
                  marginRight: "-25px",
                }}
              />
            ) : (
              <img
                src={departmentLogo}
                alt="Skoda Logo"
                style={{ height: "110px", marginLeft: "auto" }}
              />
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Sub-Department"
                name="subDeprtmt"
                value={formData.subDeprtmt}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Project Name"
                name="projectName"
                fullWidth
                value={formData.projectName}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Tooltip
                title="For data fetch, Select Brand, Month then Agreement number"
                arrow
              >
                <TextField
                  select
                  label="Brand"
                  name="brand"
                  fullWidth
                  value={formData.brand}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Audi">Audi</MenuItem>
                  <MenuItem value="Skoda">Skoda</MenuItem>
                  <MenuItem value="SAVWIPL">SAVWIPL</MenuItem>
                  <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                  <MenuItem value="VW-Chattanoga">VW-Chattanoga</MenuItem>
                  <MenuItem value="VW-South Africa">VW-South Africa</MenuItem>
                </TextField>
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Generated Date"
                type="date"
                name="generatedDate"
                InputLabelProps={{ shrink: true }}
                value={formData.generatedDate}
                onChange={handleInputChange}
                disabled={isDateDisabled}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="From Date"
                type="date"
                name="fromDate"
                InputLabelProps={{ shrink: true }}
                value={formData.fromDate}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="To Date"
                type="date"
                name="toDate"
                InputLabelProps={{ shrink: true }}
                value={formData.toDate}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                label="Location"
                name="location"
                fullWidth
                value={formData.location}
                disabled={isLocationDisabled}
                onChange={handleInputChange}
              >
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Gurugram">Gurugram</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Order Number"
                name="ordrNumber"
                fullWidth
                value={formData.ordrNumber}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Responsible Person"
                name="respPersonal"
                value={formData.respPersonal}
                onChange={handleInputChange}
                disabled={isFormDisabled}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Service Provider"
                fullWidth
                name="srvcProvider"
                value={formData.srvcProvider}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Service Receiver"
                fullWidth
                name="srvcReceiver"
                value={formData.srvcReceiver}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                select
                label="Agreement No"
                name="agrmntNumber"
                value={formData.agrmntNumber}
                onChange={(e) =>
                  handleAgreementNumberChange(e, formData.generatedDate)
                }
                disabled={isAgreementNo}
                fullWidth
              >
                {agreementNumbers.map((agreementNumber) => (
                  <MenuItem key={agreementNumber} value={agreementNumber}>
                    {agreementNumber}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Project Description"
                multiline
                rows={3}
                fullWidth
                name="prjctDesc"
                value={formData.prjctDesc}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12}>
              <CostingTable
                formData={formData}
                setFormData={setFormData}
                isFormDisabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12}>
              <MemberBillingDetails
                formData={formData}
                setFormData={setFormData}
                isFormDisabled={isFormDisabled}
                justification={justification}
                levelInfo={formData.levelInfo}
                handleBillingError={handleBillingError}
              />
            </Grid>

            <Grid item xs={12}>
              <DeclarationCheckbox isFormDisabled={isFormDisabled} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of Manager"
                fullWidth
                name="mngrName"
                value={formData.mngrName}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of the Client"
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                disabled={isFormDisabled}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitDisabled()}
                onClick={() => handleFormSubmit(formData)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

const bannerStyle = {
  fontFamily: "-moz-initial",
  backgroundColor: "#ffb6c1",
  padding: "10px",
  width: "99%",
  textAlign: "center",
  // display: "flex",
  // justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "5px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0)",
  marginBottom: "-35px",
  marginTop: "10px",
  fontSize: "17px",
};

// const closeButtonStyle = {
//   background: "none",
//   border: "none",
//   fontSize: "20px",
//   cursor: "pointer",
//   marginLeft: "10px",
// };

export default LocationUpdate;
