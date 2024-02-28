// import { Sort } from 'interfaces';
import React from 'react';

const JQTabPanelInitialState = {
    selectedRecords: [],
    displayColumns: [],
    showColumnModifier: false,
    searchKey: '',
    tableFilters: {},
    search: '',
    setSearch: () => undefined,
    sort: {},
    jqActionResult: {}
};

// type TableFiltersProps = Record<string, string[] | null>;
// interface JQTabPanelType {
//     selectedRecords: string[];
//     handleOpenColumnModifier?: VoidFunction;
//     handleCloseColumnModifier?: VoidFunction;
//     showColumnModifier: boolean;
//     searchKey?: string;
//     tableFilters: TableFiltersProps;
//     setTableFilters?: (_: TableFiltersProps) => void;
//     setSelectedRecords?: (_: string[]) => void;
//     onCheckAllClick?: (_: string[]) => void;
//     onCheckboxClick?: (_: string) => void;
//     search: string;
//     setSearch: (_: string) => void;
//     sort: Sort;
//     handleSort?: any;
//     getTableDisplayColumns?: any;
//     getDisplayColumns?: any;
//     handleColumnModifierChange?: any;
//     setFilters?: any;
//     filters?: any;
// }

type JQTabPanelType = any;

interface JQStateProps {
    searchResults: JQTabPanelType;
    shortlistedWorkers: JQTabPanelType;
    interestedWorkers: JQTabPanelType;
    qualifiedWorkers: JQTabPanelType;
    interviewWorkers: JQTabPanelType;
}

interface JQContextType {
    jQState: JQStateProps;
    setJQState: (_: JQStateProps) => void;
    refetchJobQuery: VoidFunction;
}

export const initialState: JQContextType = {
    jQState: {
        searchResults: JQTabPanelInitialState,
        shortlistedWorkers: JQTabPanelInitialState,
        interestedWorkers: JQTabPanelInitialState,
        qualifiedWorkers: JQTabPanelInitialState,
        interviewWorkers: JQTabPanelInitialState
    },
    setJQState: () => undefined,
    refetchJobQuery: () => undefined
};

export const JQContext = React.createContext({} as JQContextType);
