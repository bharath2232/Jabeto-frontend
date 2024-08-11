// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import MuiStep from "@mui/material/Step";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import StepperCustomDot from "./StepperCustomDot";

// ** Step Components
import StepPropertyArea from "./StepPropertyArea";
import StepPriceDetails from "./StepPriceDetails";
import StepPropertyDetails from "./StepPropertyDetails";
import StepPersonalDetails from "./StepPersonalDetails";
import StepPropertyFeatures from "./StepPropertyFeatures";

// ** Styled Components
import StepperWrapper from "src/@core/styles/mui/stepper";
import AddPropertyForm from "./AddPropertyForm";

const steps = [
  {
    title: "Property Type",
    subtitle: "Type,Surface,Year",
    icon: "mdi:account-outline",
  },
  {
    icon: "mdi:home-outline",
    title: "Property Location",
    subtitle: "Type & location",
  },
  {
    icon: "mdi:star-outline",
    title: "Property Features",
    subtitle: "Bedrooms/Floor No",
  },
  {
    title: "Property Preview",
    subtitle: "Photos & layouts",
    icon: "mdi:map-marker-outline",
  },
  {
    title: "Price Details",
    icon: "mdi:currency-usd",
    subtitle: "Expected Price",
  },
];

const Step = styled(MuiStep)(({ theme }) => ({
  "&:not(:last-of-type)": {
    marginBottom: theme.spacing(4),
  },
  "& .MuiStepLabel-root": {
    padding: 0,
  },
}));

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  minWidth: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("lg")]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const PropertyListingWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStepOne = (e) => {
    handleNext();
  };
  const handleStepTwo = (e) => {
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepPersonalDetails sendDataToSteps={handleStepOne} />;
      case 1:
        return <StepPropertyDetails sendDataToStepTwo={handleStepTwo} />;
      case 2:
        return <StepPropertyFeatures />;
      case 3:
        return <StepPropertyArea />;
      case 4:
        return <StepPriceDetails />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1;

    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon="mdi:arrow-left" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color={stepCondition ? "success" : "primary"}
          {...(!stepCondition
            ? { endIcon: <Icon icon="mdi:arrow-right" /> }
            : {})}
          onClick={() =>
            stepCondition ? alert("Submitted..!!") : handleNext()
          }
        >
          {stepCondition ? "Submit" : "Next"}
        </Button>
      </Box>
    );
  };

  return (
    <div>
      <AddPropertyForm />
    </div>
  );
};

export default PropertyListingWizard;
