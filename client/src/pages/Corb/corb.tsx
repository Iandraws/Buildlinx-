import React from "react";
import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCorb,
  removeFromCorb,
  selectCorbComponents,
  updateCorbComponent,
} from "../../Redux/baukastenSlice";
import { CorbComponent } from "../../types/interfaces";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Corb: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const corbComponents = useSelector(selectCorbComponents);

  const handleRemove = (component: CorbComponent) => {
    dispatch(removeFromCorb(component));
  };

  const handleClearCorb = () => {
    dispatch(clearCorb());
  };

  const handleIncreaseQuantity = (component: CorbComponent) => {
    dispatch(
      updateCorbComponent({ ...component, quantity: component.quantity + 1 })
    );
  };

  const handleDecreaseQuantity = (component: CorbComponent) => {
    if (component.quantity > 1) {
      const updatedComponent = {
        ...component,
        quantity: component.quantity - 1,
      };
      dispatch(updateCorbComponent(updatedComponent));
    } else {
      dispatch(removeFromCorb(component));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Beschreibung",
      "Kapazitaet",
      "Type",
      "Leistung",
      "Kosten",
      "Datum",
      "Classe",
      "Quantity"
    ];
    const tableRows: (string | number)[][] = [];

    corbComponents.forEach((corbComponent) => {
      const { component, quantity } = corbComponent;
      const componentData: (string | number)[] = [
        component.Name,
        component.Beschreibung,
        component.kapazitaet,
        component.Type,
        component.Leistung,
        component.kosten,
        component.Datum,
        component.Classe,
        quantity
      ];
      tableRows.push(componentData);
    });

    doc.text("Component List", 14, 15);
    (doc as any).autoTable({ startY: 25, head: [tableColumn], body: tableRows });
    doc.save("component_list.pdf");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ alignSelf: "flex-start", marginBottom: "20px" }}
      >
        Back
      </Button>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {corbComponents.length > 0 ? (
        <>
          <Button variant="contained" onClick={exportToPDF} sx={{ mb: 2 }}>
            Export to PDF
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Capacity</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Power</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Class</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {corbComponents.map((corbComponent: CorbComponent, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {corbComponent.component.Name}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.Beschreibung}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.kapazitaet}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.Type}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.Leistung}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.kosten}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.Datum}
                    </TableCell>
                    <TableCell align="right">
                      {corbComponent.component.Classe}
                    </TableCell>
                    <TableCell align="right">{corbComponent.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDecreaseQuantity(corbComponent)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {corbComponent.quantity}
                      <IconButton
                        onClick={() => handleIncreaseQuantity(corbComponent)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemove(corbComponent)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Your cart is empty.
        </Typography>
      )}

      {corbComponents.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleClearCorb}
          sx={{ marginTop: "20px" }}
        >
          Clear Cart
        </Button>
      )}
    </Container>
  );
};

export default Corb;
