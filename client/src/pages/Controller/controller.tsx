import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredComponents,
  setComponents,
  setCompareComponents,
  setCorbComponents,
  toggleSelectedComponent,
} from "../../Redux/baukastenSlice";
import { Component } from "../../types/interfaces";
import Filter from "../Filter/filter";

// GraphQL query to fetch controllers
const controllersQuery = gql`
  query {
    controllers {
      data {
        attributes {
          Name
          Beschreibung
          kapazitaet
          Type
          Leistung
          kosten
          Datum
          Classe
          Hersteller
          uuid
        }
      }
    }
  }
`;

const Components = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredComponents = useSelector(selectFilteredComponents);

  const handleSelectChange = (component: Component) => {
    dispatch(toggleSelectedComponent(component));
  };

  const handleAddToCompare = () => {
    const selected = filteredComponents.filter(
      (component) => component.selected
    );
    if (selected.length > 0) {
      dispatch(setCompareComponents(selected));
      navigate("/compare");
    } else {
      alert("Please select components to compare.");
    }
  };

  const handleAddToCorb = () => {
    const selected = filteredComponents.filter(
      (component) => component.selected
    );
    if (selected.length > 0) {
      dispatch(setCorbComponents(selected));
    } else {
      alert("Please select components to compare.");
    }
  };

  const { loading, error, data } = useQuery(controllersQuery);

  useEffect(() => {
    if (data?.controllers?.data) {
      const components = data.controllers.data.map(
        (item: { attributes: Component }) => ({
          ...item.attributes,
          selected: false,
        })
      );
      dispatch(setComponents(components));
    }
  }, [data, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading component data. Please try again later.</p>;
  }

  return (
    <Container>
      <h1>Controller Data</h1>
      <Filter />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Beschreibung</TableCell>
              <TableCell>kapazitaet</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Leistung</TableCell>
              <TableCell>kosten</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Hersteller</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComponents.map((component: Component, index: number) => (
              <TableRow key={index}>
                <TableCell>{component.Name}</TableCell>
                <TableCell>{component.Beschreibung}</TableCell>
                <TableCell>{component.kapazitaet}</TableCell>
                <TableCell>{component.Type}</TableCell>
                <TableCell>{component.Leistung}</TableCell>
                <TableCell>{component.kosten}</TableCell>
                <TableCell>{component.Datum}</TableCell>
                <TableCell>{component.Classe}</TableCell>
                <TableCell>{component.Hersteller}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={component.selected}
                    onChange={() => handleSelectChange(component)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ margin: "10px" }}
        onClick={handleAddToCompare}
      >
        Compare
      </Button>
      <Button
        variant="contained"
        style={{ margin: "10px" }}
        onClick={handleAddToCorb}
      >
        Add to Corb
      </Button>
      <div>{filteredComponents.length}</div>
    </Container>
  );
};

export default Components;
