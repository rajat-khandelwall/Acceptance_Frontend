import React from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";

const CostingTable = ({ formData, setFormData, isDatafetched }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nonNegativeValue = Math.max(0, parseInt(value) || 0);
    setFormData((prevData) => ({
      ...prevData,
      [name]: nonNegativeValue,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (parseInt(e.target.value) == 0) return;
    }
  };

  const calculateTotal = () => {
    const tc = Number(formData.srvcCost) + Number(formData.miscCost);
    formData.totalCost = tc;

    setFormData((prevData) => ({
      ...prevData,
      totalCost: tc,
    }));
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "5px", margin: "5px", marginBottom: "15px" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <div style={{ flex: 1, backgroundColor: "#93014A", height: "3px" }} />
        <p
          style={{
            margin: "0 10px",
            fontSize: "20px",
            fontFamily: "-moz-initial",
          }}
        >
          Cost Management
        </p>
        <div style={{ flex: 1, backgroundColor: "#93014A", height: "3px" }} />
      </div>

      <Grid container spacing={1}>
        {/* Header */}
        <Grid item xs={2.1}>
          <Typography variant="body1"></Typography>
        </Grid>
        <Grid item xs={3.3}>
          <Typography variant="body1">Total budget</Typography>
        </Grid>
        <Grid item xs={3.3}>
          <Typography variant="body1">Current Month budget</Typography>
        </Grid>
        <Grid item xs={3.3}>
          <Typography variant="body1">Remaining Budget</Typography>
        </Grid>

        {/* Service Cost */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2.1} alignSelf={"center"}>
              <Typography variant="body1">Service Cost</Typography>
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                type="number"
                name="srvcCost"
                value={formData.srvcCost}
                onChange={handleInputChange}
                onBlur={calculateTotal}
                disabled={isDatafetched}
                onKeyDown={handleKeyDown}
                fullWidth
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="srvcMonthlyCost"
                value={formData.srvcMonthlyCost}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="srvcRemainBdgt"
                value={formData.srvcRemainBdgt}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Miscellaneous */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2.1} alignSelf={"center"}>
              <Typography variant="body1">Miscellaneous Cost</Typography>
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                type="number"
                name="miscCost"
                value={formData.miscCost}
                onChange={handleInputChange}
                onBlur={calculateTotal}
                disabled={isDatafetched}
                onKeyDown={handleKeyDown}
                fullWidth
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="miscMonthlyBdgt"
                value={formData.miscMonthlyBdgt}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="miscRemainBdgt"
                value={formData.miscRemainBdgt}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Total */}
        <Grid item xs={12}>
          <Grid container spacing={1} marginBottom={1.5}>
            <Grid item xs={2.1} alignSelf={"center"}>
              <Typography variant="body1">Total Cost</Typography>
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="totalCost"
                value={formData.totalCost}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="totalMonthlyBdgt"
                value={formData.totalMonthlyBdgt}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3.3}>
              <TextField
                label="€"
                name="totalRemainBdgt"
                value={formData.totalRemainBdgt}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CostingTable;
