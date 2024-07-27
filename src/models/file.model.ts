export interface IDataRow {
    [key: string]: string;
}

export type DataTable = IDataRow[];

export type ColumnName = string[];