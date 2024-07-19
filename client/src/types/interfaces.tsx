export interface Component {
	Beschreibung: string;
	Classe: string;
	Datum: string;
	Leistung: number;
	Name: string;
	Type: string;
	kapazitaet: number;
	kosten: number;
	selected?: boolean;
	Hersteller?: string;
	Seriennummer?: string;
	uuid: string;
}


export interface CorbComponent {
	quantity: number;
	component: Component
}
export interface ComponentFilter {
	[key: string]: number | string | null | undefined;
  }
  
 export  interface FilterPayload {
	property: string;
	value: string | number | null;
  }
  
 export interface SetFilterNamePayload {
	index: number;
	name: string;
  }
  
  export interface ComponentState {
	components: Component[];
	filters: ComponentFilter;
	savedComponentFilters: ComponentFilter[]; // save input
	filterNames: string[];
	compareComponents: Component[];
	corbComponents: CorbComponent[];
	savedFilteredComponents: { name: string; components: Component[] }[]; // save result
  }