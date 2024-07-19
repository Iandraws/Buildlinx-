import React, { useEffect } from 'react';
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
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredComponents,
  setComponents,
  setCompareComponents,
  setCorbComponents,
  toggleSelectedComponent,
  saveFilter,
} from "../../Redux/baukastenSlice";
import { Component } from "../../types/interfaces";
import Filter from "../Filter/filter";

// GraphQL query to fetch components
const COMPONENTS_QUERY = gql`
  query {
    pumpes {
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

  const { loading, error, data } = useQuery(COMPONENTS_QUERY);

  useEffect(() => {
    if (data?.pumpes?.data) {
      const components = data.pumpes.data.map(
        (item: { attributes: Component }) => ({
          ...item.attributes,
          selected: false,
        })
      );
      dispatch(setComponents(components));
    }
  }, [data, dispatch]);

  const handleSelectChange = (component: Component) => {
    dispatch(toggleSelectedComponent(component));
  };

  const handleAddToCart = () => {
    const selected = filteredComponents.filter(
      (component) => component.selected
    );
    if (selected.length > 0) {
      dispatch(setCorbComponents(selected));
    } else {
      alert("Please select components to add to cart.");
    }
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

  const handleSaveFilter = () => {
    dispatch(saveFilter());
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error loading component data. Please try again later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Pumps Data</h1>
      <Filter />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Power</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Class</TableCell>
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
                <TableCell>{new Date(component.Datum).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                <TableCell>{component.Classe}</TableCell>
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
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Container>
  );
};

export default Components;
