import {DataTable, ColumnName} from "../models/file.model"

export async function convertToCsvController(data: DataTable, columnNames: ColumnName): Promise<string>{
    const csvContent: string = columnNames.join(",") + "\n" + data.map(row=>columnNames.map(colName=>row[colName]).join(",")).join("\n");
    return csvContent;  
}