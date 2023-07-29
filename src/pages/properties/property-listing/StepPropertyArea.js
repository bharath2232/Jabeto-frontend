// ** React Imports
import { useState, forwardRef } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFiles } from "src/hooks/useFiles";
// ** Third Party Imports
import DatePicker from "react-datepicker";
import FileUploaderMultiple from "./FilesUpload";

const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label={label || ""}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  );
});

const StepPropertyArea = () => {
  // ** States
  const files = useFiles();
  const [date, setDate] = useState(null);
  console.log("fileUpload", files);
  return (
    <Grid container>
      <FileUploaderMultiple />
    </Grid>
  );
};

export default StepPropertyArea;
