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
import Icon from "src/@core/components/icon";
// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import { Button, Checkbox, FormGroup } from "@mui/material";

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
        <TextField fullWidth label="Pieces" placeholder="3" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Bedrooms" placeholder="12" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Bathroom" placeholder="4" />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-furnished-status">Furnished Status</InputLabel>
          <Select
            id="demo-simple-select"
            label="Furnished Status"
            labelId="select-furnished-status"
            defaultValue=""
          >
            <MenuItem value="Fully Furnished">Fully Furnished</MenuItem>
            <MenuItem value="Furnished">Furnished</MenuItem>
            <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
            <MenuItem value="UnFurnished">UnFurnished</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Elevator"
          />
          <FormControlLabel required control={<Checkbox />} label="Garden" />
          <FormControlLabel required control={<Checkbox />} label="Balcony" />
        </FormGroup>
      </Grid>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<Icon icon="mdi:arrow-left" />}
          >
            back
          </Button>
        </div>
        <div>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default StepPropertyFeatures;
