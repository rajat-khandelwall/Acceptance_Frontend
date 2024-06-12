import React, { useState } from "react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

const DeclarationCheckbox = ({ isFormDisabled }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked || isFormDisabled}
          disabled={isFormDisabled}
          onChange={handleCheckboxChange}
        />
      }
      label={
        <Typography variant="body2" marginTop={2}>
          We hereby declare that the information on this Acceptance Criteria is
          correct, and this invoice for this particular year will be billed for
          the given particular amount.
        </Typography>
      }
    />
  );
};

export default DeclarationCheckbox;
