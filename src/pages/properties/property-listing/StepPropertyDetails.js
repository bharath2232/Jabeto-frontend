// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import CustomRadioIcons from "src/@core/components/custom-radio/icons";
import GoogleMaps from "./GooglePlaces";
import { Button } from "@mui/material";

const data = [
  {
    value: "maison",
    isSelected: true,
    title: "Maison",
    content: (
      <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
        Post your property for sale.
        <br />
        Unlimited free listing.
      </Typography>
    ),
  },
  {
    value: "appartment",
    title: "Appartement",

    content: (
      <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
        Post your property for rent.
        <br />
        Unlimited free listing.
      </Typography>
    ),
  },
  {
    value: "studio",
    title: "Studio",

    content: (
      <Typography variant="body2" sx={{ my: "auto", textAlign: "center" }}>
        Post your property for rent.
        <br />
        Unlimited free listing.
      </Typography>
    ),
  },
];

const StepPropertyDetails = ({ sendDataToStepTwo }) => {
  const initialIconSelected = data.filter((item) => item.isSelected)[
    data.filter((item) => item.isSelected).length - 1
  ].value;

  // ** State
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected);
  const [address, setAddress] = useState("");
  const [batminet, setBatminet] = useState("");
  const [floor, setFloor] = useState("");
  // ** Hook
  const theme = useTheme();

  const icons = [
    {
      icon: "mdi:home-outline",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "mdi:wallet-outline",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "mdi:wallet-outline",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
  ];

  const handleRadioChange = (prop) => {
    if (typeof prop === "string") {
      setSelectedRadio(prop);
    } else {
      setSelectedRadio(prop.target.value);
    }
  };

  const onSubmitNext = () => {
    const data = {
      houseType: selectedRadio,
      address: address,
      batminet: batminet,
      floor: floor,
    };
    sendDataToStepTwo(data);
  };

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <CustomRadioIcons
          key={index}
          data={data[index]}
          icon={icons[index].icon}
          selected={selectedRadio}
          name="custom-radios-property"
          gridProps={{ sm: 4, xs: 12 }}
          disabled
          handleChange={handleRadioChange}
          iconProps={icons[index].iconProps}
        />
      ))}

      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <GoogleMaps setAddress={setAddress} />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="BÂTIMENT"
          onChange={(e) => setBatminet(e.target.value)}
          value={batminet}
          placeholder="California"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="ÉTAGE"
          onChange={(e) => setFloor(e.target.value)}
          value={floor}
          placeholder="2"
        />
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
          <Button
            disabled={address == "" ? true : false}
            type="submit"
            variant="contained"
            onClick={(e) => onSubmitNext()}
          >
            Next
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default StepPropertyDetails;
