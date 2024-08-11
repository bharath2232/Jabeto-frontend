// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Step from "@mui/material/Step";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import MenuItem from "@mui/material/MenuItem";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";

// ** Third Party Imports
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import StepperCustomDot from "./StepperCustomDot";

// ** Styled Components
import StepperWrapper from "src/@core/styles/mui/stepper";
import { useTheme } from "@mui/material/styles";
import CustomRadioIcons from "src/@core/components/custom-radio/icons";
import { Checkbox, FormControlLabel } from "@mui/material";
import FileUploaderMultiple from "./FilesUpload";
import GoogleMaps from "./GooglePlaces";
import { useProperties } from "src/hooks/useProperties";
import { useFiles } from "src/hooks/useFiles";

const steps = [
  {
    title: "Account Details",
    subtitle: "Enter your Account Details",
  },
  {
    title: "Personal Info",
    subtitle: "Setup Information",
  },
  {
    title: "Adresse et prix",
    subtitle: "Quel est votre prix ?",
  },
];

const defaultAccountValues = {
  surface: 0,
  totalRooms: 0,
  bedrooms: 0,
  floorNumber: 0,
  outside: "",
  parking: "",
};

const defaultPersonalValues = {
  title: "",
  description: "",
};

const defaultSocialValues = {
  rent: 0,
  charges: 0,
};

const accountSchema = yup.object().shape({
  surface: yup.number().required(),
  totalRooms: yup.number().required(),
  bedrooms: yup.number().required(),
  floorNumber: yup.number().required(),
  outside: yup.string().required(),
  parking: yup.string().required(),
});

const personalSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

const socialSchema = yup.object().shape({
  rent: yup.number().required(),
  charges: yup.number().required(),
});

const AddPropertyForm = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const { saveProperty } = useProperties();
  const _files = useFiles();

  const [state, setState] = useState({
    password: "",
    password2: "",
    showPassword: false,
    showPassword2: false,
  });

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema),
  });

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors },
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema),
  });

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors },
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema),
  });

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ google: "", twitter: "", facebook: "", linkedIn: "" });
    accountReset({
      email: "",
      username: "",
      password: "",
      "confirm-password": "",
    });
    personalReset({
      country: "",
      language: [],
      "last-name": "",
      "first-name": "",
    });
  };
  const [finalData, setFinalData] = useState({});
  const [address, setAddress] = useState("");

  const { files } = useFiles();

  console.log("final data", finalData);

  const onSubmit = (e) => {
    const addSteps = Object.assign(finalData, e);
    setFinalData(addSteps);
    finalData.images = files;
    finalData.address = address;
    saveProperty(finalData);
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success("Form Submitted");
    }
  };

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 });
  };
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

  const initialIconSelected = data.filter((item) => item.isSelected)[
    data.filter((item) => item.isSelected).length - 1
  ].value;
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected);

  const handleRadioChange = (prop) => {
    if (typeof prop === "string") {
      setSelectedRadio(prop);
    } else {
      setSelectedRadio(prop.target.value);
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {steps[0].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[0].subtitle}
                </Typography>
              </Grid>
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="surface"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Surface habitable"
                        onChange={onChange}
                        placeholder="carterLeonard"
                        error={Boolean(accountErrors.surface)}
                        aria-describedby="stepper-linear-account-username"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">m2</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {accountErrors.surface && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-account-username"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="totalRooms"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Nombre de pièces"
                        onChange={onChange}
                        error={Boolean(accountErrors.totalRooms)}
                        placeholder="carterleonard@gmail.com"
                        aria-describedby="stepper-linear-account-email"
                      />
                    )}
                  />
                  {accountErrors.totalRooms && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-account-email"
                    >
                      {accountErrors.totalRooms.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="bedrooms"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Nombre de Chambers"
                        onChange={onChange}
                        error={Boolean(accountErrors.bedrooms)}
                        placeholder="2"
                        aria-describedby="stepper-linear-account-email"
                      />
                    )}
                  />
                  {accountErrors.bedrooms && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-account-email"
                    >
                      {accountErrors.bedrooms.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="floorNumber"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Etage"
                        onChange={onChange}
                        error={Boolean(accountErrors.floorNumber)}
                        placeholder="2"
                        aria-describedby="stepper-linear-account-email"
                      />
                    )}
                  />
                  {accountErrors.floorNumber && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-account-email"
                    >
                      {accountErrors.floorNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="validation-basic-select"
                    error={Boolean(accountErrors.outside)}
                    htmlFor="validation-basic-select"
                  >
                    Extérieure
                  </InputLabel>
                  <Controller
                    name="outside"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label="Extérieure"
                        onChange={onChange}
                        error={Boolean(accountErrors.outside)}
                        labelId="validation-basic-select"
                        aria-describedby="validation-basic-select"
                      >
                        <MenuItem value="balcony">Balcon</MenuItem>
                        <MenuItem value="tarrase">Terrasse</MenuItem>
                        <MenuItem value="gradin">Jardin</MenuItem>
                      </Select>
                    )}
                  />
                  {accountErrors.outside && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-basic-select"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="validation-basic-select"
                    error={Boolean(accountErrors.parking)}
                    htmlFor="validation-basic-select"
                  >
                    Parking
                  </InputLabel>
                  <Controller
                    name="parking"
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label="Extérieure"
                        onChange={onChange}
                        error={Boolean(accountErrors.parking)}
                        labelId="validation-basic-select"
                        aria-describedby="validation-basic-select"
                      >
                        <MenuItem value="yes">oui</MenuItem>
                        <MenuItem value="no">non</MenuItem>
                      </Select>
                    )}
                  />
                  {accountErrors.parking && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-basic-select"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  disabled
                >
                  Back
                </Button>
                <Button size="large" type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {steps[1].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="title"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Titre"
                        onChange={onChange}
                        placeholder="Leonard"
                        error={Boolean(personalErrors.title)}
                        aria-describedby="stepper-linear-personal-first-name"
                      />
                    )}
                  />
                  {personalErrors.title && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-personal-first-name"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="description"
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        rows={4}
                        multiline
                        {...field}
                        label="Description"
                        error={Boolean(personalErrors.description)}
                        aria-describedby="validation-basic-textarea"
                      />
                    )}
                  />
                  {personalErrors.textarea && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="validation-basic-textarea"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FileUploaderMultiple />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button size="large" type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {steps[2].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[2].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <GoogleMaps setAddress={(e) => setAddress(e)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="rent"
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Loyer mensuel (sans charges)"
                        onChange={onChange}
                        error={Boolean(socialErrors.rent)}
                        placeholder="900€"
                        aria-describedby="stepper-linear-social-facebook"
                      />
                    )}
                  />
                  {socialErrors.rent && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-social-facebook"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="charges"
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="charges"
                        onChange={onChange}
                        error={Boolean(socialErrors.charges)}
                        aria-describedby="stepper-linear-social-google"
                        placeholder="50€"
                      />
                    )}
                  />
                  {socialErrors.charges && (
                    <FormHelperText
                      sx={{ color: "error.main" }}
                      id="stepper-linear-social-google"
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button size="large" type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button size="large" variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return getStepContent(activeStep);
    }
  };

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              if (index === activeStep) {
                labelProps.error = false;
                if (
                  (accountErrors.email ||
                    accountErrors.username ||
                    accountErrors.password ||
                    accountErrors["confirm-password"]) &&
                  activeStep === 0
                ) {
                  labelProps.error = true;
                } else if (
                  (personalErrors.country ||
                    personalErrors.language ||
                    personalErrors["last-name"] ||
                    personalErrors["first-name"]) &&
                  activeStep === 1
                ) {
                  labelProps.error = true;
                } else if (
                  (socialErrors.google ||
                    socialErrors.twitter ||
                    socialErrors.facebook ||
                    socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true;
                } else {
                  labelProps.error = false;
                }
              }

              return (
                <Step key={index}>
                  <StepLabel
                    {...labelProps}
                    StepIconComponent={StepperCustomDot}
                  >
                    <div className="step-label">
                      <Typography className="step-number">{`0${
                        index + 1
                      }`}</Typography>
                      <div>
                        <Typography className="step-title">
                          {step.title}
                        </Typography>
                        <Typography className="step-subtitle">
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: "0 !important" }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default AddPropertyForm;
