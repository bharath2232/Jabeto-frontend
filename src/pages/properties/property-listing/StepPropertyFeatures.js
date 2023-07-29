// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

const furnishingArray = [
  "AC",
  "TV",
  "RO",
  "Bed",
  "WiFi",
  "Sofa",
  "Fridge",
  "Cupboard",
  "Microwave",
  "Dining Table",
  "Washing Machine",
];

const StepPropertyFeatures = () => {
  // ** State
  const [furnishingDetails, setFurnishingDetails] = useState([
    "Fridge",
    "AC",
    "TV",
    "Wifi",
  ]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFurnishingDetails(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="NOMBRE DE PIÈCES" placeholder="3" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="NOMBRE DE CHAMBRES" placeholder="12" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="SALLES DE BAIN" placeholder="4" />
      </Grid>
      c
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="select-furnishing-details">
            Furnishing Details
          </InputLabel>
          <Select
            labelId="select-furnishing-details"
            multiple
            onChange={handleChange}
            value={furnishingDetails}
            input={<OutlinedInput label="Furnishing Details" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <CustomChip key={value} label={value} skin="light" />
                ))}
              </Box>
            )}
          >
            {furnishingArray.map((furniture) => (
              <MenuItem key={furniture} value={furniture}>
                {furniture}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl>
          <FormLabel
            id="common-area-radio"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: "21px",
              letterSpacing: "0.1px",
            }}
          >
            Balcon
          </FormLabel>
          <RadioGroup
            defaultValue="yes"
            name="common-area-group"
            aria-labelledby="common-area-radio"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl>
          <FormLabel
            id="balcony-radio"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: "21px",
              letterSpacing: "0.1px",
            }}
          >
            Terrasse
          </FormLabel>
          <RadioGroup
            defaultValue="yes"
            name="balcony-group"
            aria-labelledby="balcony-radio"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl>
          <FormLabel
            id="balcony-radio"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: "21px",
              letterSpacing: "0.1px",
            }}
          >
            Ascenseur
          </FormLabel>
          <RadioGroup
            defaultValue="yes"
            name="balcony-group"
            aria-labelledby="balcony-radio"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default StepPropertyFeatures;
