import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Component, CorbComponent,ComponentFilter,ComponentState,FilterPayload,SetFilterNamePayload } from "../types/interfaces";
import { RootState } from "./rootReducer";



const initialState: ComponentState = {
  components: [],
  filters: {},
  savedComponentFilters: [],
  filterNames: [],
  compareComponents: [],
  corbComponents: [],
  savedFilteredComponents: [],
};

const baukastenSlice = createSlice({
  name: "baukasten",
  initialState,
  reducers: {
    toggleSelectedComponent: (state, action: PayloadAction<Component>) => {
      state.components = state.components.map((component) =>
        component.Name === action.payload.Name
          ? { ...component, selected: !component.selected }
          : component
      );
    },
    setComponents: (state, action: PayloadAction<Component[]>) => {
      state.components = action.payload.map((component) => ({
        ...component,
        selected: false,
      }));
    },
    setCompareComponents: (state, action: PayloadAction<Component[]>) => {
      state.compareComponents = action.payload;
    },
    updateCorbComponent: (state, action: PayloadAction<CorbComponent>) => {
      state.corbComponents = state.corbComponents.map((corbComponent) =>
        corbComponent.component.uuid === action.payload.component.uuid
          ? action.payload
          : corbComponent
      );
    },
    setCorbComponents: (state, action: PayloadAction<Component[]>) => {
      action.payload.forEach((item) => {
        const existingItemIndex = state.corbComponents.findIndex(
          (existingItem) => existingItem.component.uuid === item.uuid
        );

        if (existingItemIndex !== -1) {
          // If item exists, update quantity
          state.corbComponents[existingItemIndex].quantity += 1; // Initialize or update quantity
        } else {
          // If item does not exist, add with quantity initialized
          state.corbComponents = [
            ...state.corbComponents,
            { component: item, quantity: 1 },
          ];
        }
      });
    },
    removeFromCorb: (state, action: PayloadAction<CorbComponent>) => {
      state.corbComponents = state.corbComponents.filter(
        (corbItem) => corbItem.component.uuid !== action.payload.component.uuid
      );
    },
    clearCorb: (state) => {
      state.corbComponents = [];
    },
    setFilterProperty: (state, action: PayloadAction<FilterPayload>) => {
      if (action.payload.value) {
        state.filters[action.payload.property] = action.payload.value;
      } else {
        delete state.filters[action.payload.property];
      }
    },
    saveFilter: (state) => {
      const savedFilterName = `Filter ${
        state.savedComponentFilters.length + 1
      }`;
      state.savedComponentFilters = [
        ...state.savedComponentFilters,
        { ...state.filters },
      ];
      state.filterNames.push(savedFilterName);
      state.savedFilteredComponents.push({
        name: savedFilterName,
        components: state.components.filter((component) => {
          const isKostenBetweenNumbers =
            state.filters.kostenMin != null && state.filters.kostenMax != null
              ? isNumberBetweenTwoNumbers(
                  component.kosten,
                  state.filters.kostenMin as number,
                  state.filters.kostenMax as number
                )
              : true;

          const isBetweenDates =
            state.filters.dateFrom && state.filters.dateTo
              ? isDateBetweenRange(
                  component.Datum,
                  state.filters.dateFrom as string,
                  state.filters.dateTo as string
                )
              : true;

          const allMatch = Object.keys(state.filters)
            .filter(
              (key) =>
                !["dateTo", "dateFrom", "kostenMin", "kostenMax"].includes(key)
            )
            .every((key) => (component as any)[key] === state.filters[key]);

          return allMatch && isBetweenDates && isKostenBetweenNumbers;
        }),
      });
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setFilterName: (state, action: PayloadAction<SetFilterNamePayload>) => {
      state.filterNames[action.payload.index] = action.payload.name;
    },
    saveFilteredComponents: (
      state,
      action: PayloadAction<{ name: string; components: Component[] }>
    ) => {
      state.savedFilteredComponents = [
        ...state.savedFilteredComponents,
        action.payload,
      ];
    },
    clearSavedFilteredComponents: (state) => {
      state.savedFilteredComponents = [];
    },
  },
});

// Export the actions and selectors
export const {
  setComponents,
  setCompareComponents,
  setCorbComponents,
  removeFromCorb,
  clearCorb,
  toggleSelectedComponent,
  setFilterProperty,
  clearFilters,
  saveFilter,
  updateCorbComponent,
  setFilterName,
  saveFilteredComponents,
  clearSavedFilteredComponents,
} = baukastenSlice.actions;

// Selectors
export const selectComponents = (state: RootState) =>
  state.baukasten.components;
export const selectFilteredComponents = (state: RootState) =>
  state.baukasten.components.filter((component) => {
    const isKostenBetweenNumbers =
      state.baukasten.filters.kostenMin != null &&
      state.baukasten.filters.kostenMax != null
        ? isNumberBetweenTwoNumbers(
            component.kosten,
            state.baukasten.filters.kostenMin as number,
            state.baukasten.filters.kostenMax as number
          )
        : true;

    const isBetweenDates =
      state.baukasten.filters.dateFrom && state.baukasten.filters.dateTo
        ? isDateBetweenRange(
            component.Datum,
            state.baukasten.filters.dateFrom as string,
            state.baukasten.filters.dateTo as string
          )
        : true;

    const allMatch = Object.keys(state.baukasten.filters)
      .filter(
        (key) => !["dateTo", "dateFrom", "kostenMin", "kostenMax"].includes(key)
      )
      .every(
        (key: string) =>
          (component as any)[key] === state.baukasten.filters[key]
      );

    return allMatch && isBetweenDates && isKostenBetweenNumbers;
  });

export const selectComponentsToCompare = (state: RootState) =>
  state.baukasten.compareComponents;
export const selectCorbComponents = (state: RootState) =>
  state.baukasten.corbComponents;

export const selectDateFrom = (state: RootState) =>
  state.baukasten.filters.dateFrom;
export const selectDateTo = (state: RootState) =>
  state.baukasten.filters.dateTo;
export const selectFilters = (state: RootState) => state.baukasten.filters;
export const selectSavedFilters = (state: RootState) =>
  state.baukasten.savedComponentFilters;
export const selectFilterNames = (state: RootState) =>
  state.baukasten.filterNames;
export const selectSavedFilteredComponents = (state: RootState) =>
  state.baukasten.savedFilteredComponents;

// Export the reducer
export default baukastenSlice.reducer;

export const isDateBetweenRange = (
  date: string,
  dateFrom: string,
  dateTo: string
): boolean => {
  return (
    new Date(date).getTime() >= new Date(dateFrom).getTime() &&
    new Date(date).getTime() <= new Date(dateTo).getTime()
  );
};

export const isNumberBetweenTwoNumbers = (
  number: number,
  min: number,
  max: number
): boolean => {
  return number >= min && number <= max;
};
