// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import PropertiesTable from "./propertiesTable";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Properties = () => {
  const router = useRouter();
  return (
    <Grid container spacing={6}>
      <div className="titlePage">
        <div>
          {" "}
          <h1 style={{ color: "#A27B5C" }}>Properties</h1>
        </div>
        <div style={{ marginTop: 30 }}>
          <Button
            variant="contained"
            onClick={() => router.replace("/properties/property-listing")}
          >
            Add Property
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <PropertiesTable />
      </TableContainer>
    </Grid>
  );
};

export default Properties;
