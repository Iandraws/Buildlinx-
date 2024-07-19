import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Slider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  saveFilter,
  selectFilters,
  setFilterProperty,
} from "../../Redux/baukastenSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  // Local state to store input filters
  const [useStateFilters, setUseStateFilters] = useState<{
    [key: string]: any;
  }>({
    dateFrom: filters.dateFrom || "",
    dateTo: filters.dateTo || "",
    Classe: filters.Classe || "B",
    kosten: [filters.kostenMin || 0, filters.kostenMax || 10000], // Assuming default range from 0 to 10000
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setUseStateFilters({
      ...useStateFilters,
      [id]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUseStateFilters({
      ...useStateFilters,
      [name]: value,
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setUseStateFilters({
      ...useStateFilters,
      kosten: newValue,
    });
  };

  const handleApplyFilter = () => {
    // Update Redux store with local state filters
    Object.keys(useStateFilters).forEach((property) => {
      let value = useStateFilters[property];
      if (property === "kosten") {
        dispatch(setFilterProperty({ property: "kostenMin", value: value[0] }));
        dispatch(setFilterProperty({ property: "kostenMax", value: value[1] }));
      } else {
        dispatch(setFilterProperty({ property, value }));
      }
    });
  };

  const handleClearFilter = () => {
    // Clear local state and Redux store
    setUseStateFilters({
      dateFrom: "",
      dateTo: "",
      Classe: "B",
      kosten: [0, 10000], // Reset to default range
    });
    dispatch(clearFilters());
  };

  const handleSaveFilter = () => {
    dispatch(saveFilter());
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <TextField
          id="dateFrom"
          label="From"
          type="date"
          value={useStateFilters.dateFrom || ""}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="dateTo"
          label="To"
          type="date"
          value={useStateFilters.dateTo || ""}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            name="Classe"
            value={useStateFilters.Classe?.toString() || ""}
            onChange={handleSelectChange}
            style={{ minWidth: 120 }}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom>Kosten</Typography>
        <Slider
          value={useStateFilters.kosten}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          marks={[
            { value: 0, label: "0" },
            { value: 10000, label: "10000" },
          ]}
        />
      </Grid>
      {/* Add more filter fields as needed */}
      <Grid item>
        <Button variant="contained" onClick={handleApplyFilter}>
          Apply Filter
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          onClick={handleSaveFilter}
        >
          Save Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
