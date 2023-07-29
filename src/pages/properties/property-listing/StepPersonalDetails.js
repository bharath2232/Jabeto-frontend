// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import CustomRadioIcons from "src/@core/components/custom-radio/icons";
import GoogleMaps from "./GooglePlaces";
import { Box, Button } from "@mui/material";

const data = [
  {
    value: "Habitation",
    isSelected: true,
    title: "Habitation",
    content:
      "List property as Builder, list your project and get highest reach.",
  },
  {
    value: "Parking",
    title: "Parking",
    content:
      "Submit property as an Individual. Lease, Rent or Sell at the best price.",
  },
  {
    value: "Bureaux",
    title: "Bureaux & commerces",
    content:
      "Earn highest commission by listing your clients properties at the best price.",
  },
];

const StepPersonalDetails = ({ sendDataToSteps }) => {
  const initialIconSelected = data.filter((item) => item.isSelected)[
    data.filter((item) => item.isSelected).length - 1
  ].value;
  const [propertyType, setPropertyType] = useState("Habitation");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      propertyType: "",
      title: "",
      description: "",
      year: "",
    },
  });

  // ** States

  const [showValues, setShowValues] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected);

  console.log("SELECTED", selectedRadio);
  const onSubmit = (data) => {
    data.propertyType = selectedRadio;
    sendDataToSteps(data);
  };

  // ** Hook
  const theme = useTheme();

  const icons = [
    {
      icon: "mdi:office-building-outline",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "mdi:parking",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "mdi:briefcase-outline",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
  ];

  const handleTogglePasswordView = () => {
    setShowValues(!showValues);
  };

  const handleRadioChange = (prop) => {
    if (typeof prop === "string") {
      setSelectedRadio(prop);
    } else {
      setSelectedRadio(prop.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        {data.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={data[index]}
            name="custom-radios"
            icon={icons[index].icon}
            selected={selectedRadio}
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleRadioChange}
            iconProps={icons[index].iconProps}
          />
        ))}

        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label="Title / Label"
                  placeholder="unique title/lable"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.title.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name="year"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label="Year of construction"
                  placeholder="2022"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.year)}
                />
              )}
            />
            {errors.year && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.year.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label="Description"
                placeholder="2022"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.description)}
                fullWidth
                multiline
                minRows={2}
              />
            )}
          />
          {errors.description && (
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.description.message}
            </FormHelperText>
          )}

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
      </Grid>
    </form>
  );
};

export default StepPersonalDetails;
