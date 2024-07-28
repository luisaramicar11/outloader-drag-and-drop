import { IDataRow,  DataTable, ColumnName} from "../models/file.model"

/* class that process information from file */
export class FileController {
    public fileContent: string;
    public data: DataTable = [];
    public columnName: ColumnName = [];
    constructor(fileContent: string) {
        this.fileContent = fileContent;
    }
    public processFile(): void {
        const lines: string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim()!=="");
        if(lines.length > 0){
            this.columnName = lines[0].split(",");
            this.data = lines.slice(1).map(line=>{
                const value: string[] = line.split(',');
                const row: IDataRow = {};
                this.columnName.forEach((colName, index)=>{
                    row[colName] = value[index] || "";
                })
                return row;
            })
        }
    }
    public getColumnNames(): ColumnName{
        return this.columnName;
    }
    public getData(): DataTable{
        return this.data;
    }
}

   