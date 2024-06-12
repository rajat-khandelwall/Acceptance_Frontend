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

const Location = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [srvc_rem, set_srvc_rem] = useState(0);
  const [misc_rem, set_misc_rem] = useState(0);
  const [manualEntry, setManualEntry] = useState(false);
  const [isDatafetched, setIsDatafetched] = useState(false);
  const [agreementNumber, setAgreementNumber] = useState([]);
  const [agreementNumbers, setAgreementNumbers] = useState([]);
  const [billingError, setBillingError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const handleBillingError = (errorMsg) => {
    setBillingError(errorMsg);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const isSubmitDisabled = () => {
    return billingError !== "" || (!isChecked && submitClicked);
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
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (formData) => {
    let formDataTemp = {
      costDetails: {
        srvcCost: formData.srvcCost,
        srvcMonthlyCost: formData.srvcMonthlyCost,
        srvcRemainBdgt: formData.srvcRemainBdgt,
        miscCost: formData.miscCost,
        miscPricing: formData.miscPricing,
        miscMonthlyBdgt: formData.miscMonthlyBdgt,
        miscRemainBdgt: formData.miscRemainBdgt,
        totalCost: formData.totalCost,
        totalMonthlyBdgt: formData.totalMonthlyBdgt,
        totalRemainBdgt: formData.totalRemainBdgt,
      },
    };
    formData.costDetails = formDataTemp.costDetails;
    setSubmitClicked(true);
    if (!isChecked) return;
    try {
      await ApiService.submitFormLocationData(formData);
      navigate("/response-recorded");
      await ApiService.downloadReportsLocation(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAgreementNumberChange = async (e, selectedDate) => {
    const value = e.target.value;
    const location = formData.location;
    if (value === "manual") {
      setManualEntry(true);
      setIsDatafetched(false);
      setAgreementNumber(value);
    } else {
      setIsDatafetched(true);
      setManualEntry(false);
      setAgreementNumber(value);
      try {
        const agreementData = await ApiService.fetchAgreementLocationData(
          value,
          selectedDate,
          location
        );
        setFormData((prevData) => ({
          ...prevData,
          ...agreementData,
        }));
        set_srvc_rem(agreementData.srvcRemainBdgt);
        set_misc_rem(agreementData.miscRemainBdgt);
      } catch (error) {
        console.error("Error fetching agreement data:", error);
      }
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
            This module is for only those projects whose whole team is present
            on multiple locations.<br></br>After first location, for Second &
            third location or for next months you can fill out from this module
            just select <b>Brand then Agreement number!</b>
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
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Sub-Department"
                name="subDeprtmt"
                value={formData.subDeprtmt}
                onChange={handleInputChange}
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
              />
            </Grid>

            <Grid item xs={12} md={3}>
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
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Generated Date"
                type="date"
                name="generatedDate"
                InputLabelProps={{ shrink: true }}
                value={formData.generatedDate}
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Responsible Person"
                name="respPersonal"
                value={formData.respPersonal}
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Service Receiver"
                fullWidth
                name="srvcReceiver"
                value={formData.srvcReceiver}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              {manualEntry ? (
                <TextField
                  label="Agreement No"
                  name="agrmntNumber"
                  value={formData.agrmntNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                <TextField
                  select
                  label="Agreement No"
                  name="agrmntNumber"
                  value={formData.agrmntNumber}
                  onChange={(e) =>
                    handleAgreementNumberChange(e, formData.generatedDate)
                  }
                  fullWidth
                >
                  {agreementNumbers.map((agreementNumber) => (
                    <MenuItem key={agreementNumber} value={agreementNumber}>
                      {agreementNumber}
                    </MenuItem>
                  ))}
                  <MenuItem value="manual">Enter Manually</MenuItem>
                </TextField>
              )}
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
              />
            </Grid>

            <Grid item xs={12}>
              <CostingTable
                formData={formData}
                setFormData={setFormData}
                isDatafetched={isDatafetched}
              />
            </Grid>

            <Grid item xs={12}>
              <MemberBillingDetails
                formData={formData}
                setFormData={setFormData}
                isDatafetched={isDatafetched}
                srvc_rem={srvc_rem}
                misc_rem={misc_rem}
                handleBillingError={handleBillingError}
              />
            </Grid>

            <Grid item xs={12}>
              <DeclarationCheckbox
                handleCheckboxChange={handleCheckboxChange}
              />
              {!isChecked && submitClicked && (
                <Typography
                  variant="body2"
                  style={{
                    color: "red",
                    marginBottom: "10px",
                    marginTop: "5px",
                  }}
                >
                  Please accept Acceptance Protocol Terms & Conditions
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of Manager"
                fullWidth
                name="mngrName"
                value={formData.mngrName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name of the Client"
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
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

export default Location;
