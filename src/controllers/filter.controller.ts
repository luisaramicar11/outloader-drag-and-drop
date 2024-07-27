import { DataTable } from "../models/file.model";

export function filterDataController(data: DataTable, searchTerm: string): DataTable{
    if(!searchTerm) return data;
    searchTerm = searchTerm.toLowerCase();
    /* Returns the information that matches with search term*/
    return data.filter(row=>Object.values(row).some(value=>value.toLowerCase().includes(searchTerm)));
}