// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import AvatarGroup from "@mui/material/AvatarGroup";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useProperties } from "src/hooks/useProperties";
import Link from "next/link";
import { styled } from "@mui/material/styles";

// ** Third Party Imports
import axios from "axios";

// ** Custom Components Imports
import OptionsMenu from "src/@core/components/option-menu";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const projectTable = [
  {
    id: 1,
    status: 38,
    leader: "Eileen",
    name: "Website SEO",
    date: "10 may 2021",
    avatarColor: "success",
    avatarGroup: [
      "/images/avatars/1.png",
      "/images/avatars/2.png",
      "/images/avatars/3.png",
      "/images/avatars/4.png",
    ],
  },
  {
    id: 2,
    status: 45,
    leader: "Owen",
    date: "03 Jan 2021",
    name: "Social Banners",
    avatar: "/images/icons/project-icons/social-label.png",
    avatarGroup: ["/images/avatars/5.png", "/images/avatars/6.png"],
  },
  {
    id: 3,
    status: 92,
    leader: "Keith",
    date: "12 Aug 2021",
    name: "Logo Designs",
    avatar: "/images/icons/project-icons/sketch-label.png",
    avatarGroup: [
      "/images/avatars/7.png",
      "/images/avatars/8.png",
      "/images/avatars/1.png",
      "/images/avatars/2.png",
    ],
  },
  {
    id: 4,
    status: 56,
    leader: "Merline",
    date: "19 Apr 2021",
    name: "IOS App Design",
    avatar: "/images/icons/project-icons/sketch-label.png",
    avatarGroup: [
      "/images/avatars/3.png",
      "/images/avatars/4.png",
      "/images/avatars/5.png",
      "/images/avatars/6.png",
    ],
  },
  {
    id: 5,
    status: 25,
    leader: "Harmonia",
    date: "08 Apr 2021",
    name: "Figma Dashboards",
    avatar: "/images/icons/project-icons/figma-label.png",
    avatarGroup: [
      "/images/avatars/7.png",
      "/images/avatars/8.png",
      "/images/avatars/1.png",
    ],
  },
  {
    id: 6,
    status: 36,
    leader: "Allyson",
    date: "29 Sept 2021",
    name: "Crypto Admin",
    avatar: "/images/icons/project-icons/html-label.png",
    avatarGroup: [
      "/images/avatars/2.png",
      "/images/avatars/3.png",
      "/images/avatars/4.png",
      "/images/avatars/5.png",
    ],
  },
  {
    id: 7,
    status: 72,
    leader: "Georgie",
    date: "20 Mar 2021",
    name: "Create Website",
    avatar: "/images/icons/project-icons/react-label.png",
    avatarGroup: [
      "/images/avatars/6.png",
      "/images/avatars/7.png",
      "/images/avatars/8.png",
      "/images/avatars/1.png",
    ],
  },
  {
    id: 8,
    status: 89,
    leader: "Fred",
    date: "09 Feb 2021",
    name: "App Design",
    avatar: "/images/icons/project-icons/xd-label.png",
    avatarGroup: [
      "/images/avatars/2.png",
      "/images/avatars/3.png",
      "/images/avatars/4.png",
      "/images/avatars/5.png",
    ],
  },
  {
    id: 9,
    status: 77,
    leader: "Richardo",
    date: "17 June 2021",
    name: "Angular APIs",
    avatar: "/images/icons/project-icons/figma-label.png",
    avatarGroup: [
      "/images/avatars/6.png",
      "/images/avatars/7.png",
      "/images/avatars/8.png",
      "/images/avatars/1.png",
    ],
  },
  {
    id: 10,
    status: 100,
    leader: "Genevra",
    date: "06 Oct 2021",
    name: "Admin Template",
    avatar: "/images/icons/project-icons/vue-label.png",
    avatarGroup: [
      "/images/avatars/2.png",
      "/images/avatars/3.png",
      "/images/avatars/4.png",
      "/images/avatars/5.png",
    ],
  },
];
// ** renders name column

const columns = [
  {
    flex: 0.1,
    field: "name",
    minWidth: 220,
    headerName: "Name",
    renderCell: ({ row }) => {
      console.log("row", row);
      const { name, date } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <LinkStyled href={`/properties/property/${row.id}`}>
              {row.attributes.title}
            </LinkStyled>

            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.disabled", textTransform: "capitalize" }}
            >
              {date}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: "leader",
    headerName: "Leader",
    renderCell: ({ row }) => (
      <Typography sx={{ color: "text.secondary" }}>{row.leader}</Typography>
    ),
  },

  {
    flex: 0.1,
    minWidth: 150,
    field: "status",
    headerName: "Status",
    renderCell: ({ row }) => (
      <>
        <LinearProgress
          color="primary"
          value={row.status}
          variant="determinate"
          sx={{
            mr: 4,
            height: 6,
            width: "100%",
            borderRadius: 8,
            backgroundColor: "background.default",
            "& .MuiLinearProgress-bar": {
              borderRadius: 8,
            },
          }}
        />
        <Typography
          sx={{ color: "text.secondary" }}
        >{`${row.status}%`}</Typography>
      </>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "actions",
    headerName: "Actions",
    renderCell: () => (
      <OptionsMenu
        iconButtonProps={{ size: "small" }}
        options={[
          "Details",
          "Archive",
          { divider: true },
          { text: "Delete", menuItemProps: { sx: { color: "error.main" } } },
        ]}
      />
    ),
  },
];

const PropertiesTable = () => {
  // ** State
  const [data, setData] = useState(projectTable);
  const [value, setValue] = useState("");
  const { fetchProperties, properties } = useProperties();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });

  const handleFilter = (val) => {
    setValue(val);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* const changePropertiesData = () => {
    const finalProp = [];
    properties.forEach((item, index) => {
      const info = item[index].attributes;
      info.item = item.id;
      finalProp.push(info);
    });
    return finalProp;
  };*/

  return data ? (
    <Card>
      <CardHeader
        title="Projects"
        action={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Search:
            </Typography>
            <TextField
              size="small"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </Box>
        }
      />
      <DataGrid
        autoHeight
        pagination
        rows={properties}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 7, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  ) : null;
};

export default PropertiesTable;
