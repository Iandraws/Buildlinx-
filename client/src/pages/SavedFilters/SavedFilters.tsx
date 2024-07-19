import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSavedFilteredComponents,
  setFilterName,
  clearSavedFilteredComponents,
} from '../../Redux/baukastenSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SavedFilters: React.FC = () => {
  const dispatch = useDispatch();
  const savedFilteredComponents = useSelector(selectSavedFilteredComponents);
  const [filterNames, setFilterNames] = useState<any[]>([]);

  useEffect(() => {
    const names = savedFilteredComponents.map((filter, index) => filter.name || `Filter ${index + 1}`);
    setFilterNames(names);
  }, [savedFilteredComponents]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...filterNames];
    newNames[index] = name;
    setFilterNames(newNames);
    dispatch(setFilterName({ index, name }));
  };

  const handleExportFilter = (index: number) => {
    const doc = new jsPDF();
    const { name, components } = savedFilteredComponents[index];

    // Prepare table columns from components data (exclude 'uuid' and 'selected')
    const tableColumn = Object.keys(components[0]).filter(key => key !== 'uuid' && key !== 'selected');

    // Prepare table rows, excluding 'uuid' and 'selected' properties
    const tableRows = components.map(component =>
      Object.values(component).filter((_, idx) => tableColumn.includes(Object.keys(components[0])[idx]))
    );

    doc.text(`${filterNames[index]} Components`, 14, 15); // Use filterNames[index] for the updated name
    (doc as any).autoTable({
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      margin: { top: 20 }, 
    });
    doc.save(`${filterNames[index]}_components.pdf`); // Use filterNames[index] for the updated name in file save
  };

  const handleClearExportedFilters = () => {
    dispatch(clearSavedFilteredComponents());
  };

  return (
    <Container sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Saved Filters
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Button variant="contained" onClick={handleClearExportedFilters} sx={{ mr: 2 }}>
            Clear Exported Filters
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="saved filters table">
          <TableHead>
            <TableRow>
              <TableCell>Filter Name</TableCell>
              <TableCell>Items in View</TableCell>
              <TableCell>Export</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedFilteredComponents.map((filter, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={filterNames[index] || ''}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{filter.components.length}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleExportFilter(index)}
                  >
                    Export
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SavedFilters;
