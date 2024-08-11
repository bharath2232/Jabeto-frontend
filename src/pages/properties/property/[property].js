// ** Third Party Imports
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useProperties } from "src/hooks/useProperties";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiTabList from "@mui/lab/TabList";
// ** Demo Components Imports
import Grid from "@mui/material/Grid";
import UserProfileHeader from "../user-profile/UserProfileHeader";
import { useEffect } from "react";

const TabList = styled(MuiTabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
  },
  "& .MuiTab-root": {
    minHeight: 38,
    minWidth: 110,
    borderRadius: 8,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));
const Property = () => {
  const router = useRouter();

  const { property } = router.query;
  const { fetchPropertyById, propertyById } = useProperties();
  useEffect(() => {
    fetchPropertyById(property);
  }, []);

  console.log("bro959", propertyById);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader propertyById={propertyById} />
      </Grid>
      <Grid item xs={12}>
        <TabContext value={value}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                onChange={handleChange}
                aria-label="customized tabs example"
              >
                <Tab value="1" label="Information" />
                <Tab value="2" label="Documents" />
                <Tab value="3" label="Payments" />
              </TabList>
              <TabPanel value="1">
                <Typography>
                  Cake apple pie chupa chups biscuit liquorice tootsie roll
                  liquorice sugar plum. Cotton candy wafer wafer jelly cake
                  caramels brownie gummies.
                </Typography>
              </TabPanel>
              <TabPanel value="2">
                <Typography>
                  Chocolate bar carrot cake candy canes sesame snaps. Cupcake
                  pie gummi bears jujubes candy canes. Chupa chups sesame snaps
                  halvah.
                </Typography>
              </TabPanel>
              <TabPanel value="3">
                <Typography>
                  Danish tiramisu jujubes cupcake chocolate bar cake cheesecake
                  chupa chups. Macaroon ice cream tootsie roll carrot cake gummi
                  bears.
                </Typography>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default Property;
