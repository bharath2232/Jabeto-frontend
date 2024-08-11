// ** React Imports
import { useState, useEffect } from "react";
import { format, toDate } from "date-fns";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import axios from "axios";

// ** Icon Imports
import Icon from "src/@core/components/icon";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfileHeader = ({ propertyById }) => {
  // ** State

  const data = {
    fullName: "John Doe",
    location: "Vatican City",
    joiningDate: "April 2021",
    designation: "UX Designer",
    profileImg: "/images/avatars/1.png",
    designationIcon: "mdi:fountain-pen-tip",
    coverImg: "/images/pages/profile-banner.png",
  };
  const designationIcon = data?.designationIcon || "mdi:briefcase-outline";
  const imageBaseUrl = "http://localhost:1337";

  return data !== null ? (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={
          propertyById?.attributes?.images[0]?.url
            ? `${imageBaseUrl}${propertyById?.attributes?.images[0].url} `
            : data.coverImg
        }
        sx={{
          height: { xs: 150, md: 250 },
        }}
      />
      <CardContent
        sx={{
          mt: -4,
          mb: -3,
          display: "flex",
          alignItems: "flex-end",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: { xs: 0, md: 6 },
            alignItems: "flex-end",
            flexWrap: ["wrap", "nowrap"],
            justifyContent: ["center", "space-between"],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: "flex",
              flexDirection: "column",
              alignItems: ["center", "flex-start"],
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontSize: "1.375rem" }}>
              {propertyById?.attributes?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: ["center", "flex-start"],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "text.secondary" },
                }}
              >
                <Icon icon={designationIcon} />
                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                  {propertyById?.attributes?.propertyType
                    ? propertyById?.attributes?.propertyType
                    : "Apartment"}
                </Typography>
              </Box>
              <Box
                sx={{
                  mr: 4,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "text.secondary" },
                }}
              >
                <Icon icon="mdi:map-marker-outline" />
                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                  {propertyById?.attributes?.address}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "text.secondary" },
                }}
              >
                <Icon icon="mdi:calendar-blank-outline" />
                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                  {propertyById?.attributes?.publishedAt.split("T")[0]}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Icon icon="mdi:account-check-outline" fontSize={20} />}
          >
            Connected
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default UserProfileHeader;
